import ServicioDeGradosDeConfianza from "../servicioGradosConfianza/ServicioDeGradosDeConfianza";
import Comunidad from "../types/Comunidad";
import CriterioFusion from "./CriterioFusion";

export class CriterioCoincidenciaUsuarios implements CriterioFusion {
    sonCompatibles(comunidad1: Comunidad, comunidad2: Comunidad): boolean {
        const totalUsuariosComunidad1 = comunidad1.usuarios.length;
        const totalUsuariosComunidad2 = comunidad2.usuarios.length;

        if (totalUsuariosComunidad1 === 0 || totalUsuariosComunidad2 === 0) {
            return false; // Evitar divisiones por cero
        }

        const usuariosComunes = comunidad1.usuarios.filter(usuario1 => {
            return comunidad2.usuarios.some(usuario2 => usuario1.id === usuario2.id);
        });

        const porcentajeCoincidencia = (usuariosComunes.length / Math.min(totalUsuariosComunidad1, totalUsuariosComunidad2)) * 100;
        return porcentajeCoincidencia > parseInt(process.env.PORCENTAJE_COINCIDENCIA_USUARIOS || '5'); 
    }
}


export class CriterioCoincidenciaServicios implements CriterioFusion {
    sonCompatibles(comunidad1: Comunidad, comunidad2: Comunidad): boolean {
        const totalServiciosComunidad1 = comunidad1.establecimientos.reduce((total, establecimiento) => {
            return total + establecimiento.servicios.length;
        }, 0);

        const totalServiciosComunidad2 = comunidad2.establecimientos.reduce((total, establecimiento) => {
            return total + establecimiento.servicios.length;
        }, 0);

        if (totalServiciosComunidad1 === 0 || totalServiciosComunidad2 === 0) {
            return false; // Evitar divisiones por cero
        }

        const serviciosComunes = comunidad1.establecimientos.flatMap(establecimiento1 => {
            return establecimiento1.servicios.filter(servicio1 => {
                return comunidad2.establecimientos.some(establecimiento2 => {
                    return establecimiento2.servicios.some(servicio2 => servicio1.id === servicio2.id);
                });
            });
        });

        const porcentajeCoincidencia = (serviciosComunes.length / Math.min(totalServiciosComunidad1, totalServiciosComunidad2)) * 100;

        return porcentajeCoincidencia > parseInt(process.env.PORCENTAJE_COINCIDENCIA_SERVICIOS || '75'); 
    }
}

export class CriterioCoincidenciaEstablecimientos implements CriterioFusion {
    sonCompatibles(comunidad1: Comunidad, comunidad2: Comunidad): boolean {
        const totalEstablecimientos1 = comunidad1.establecimientos.length;
        const totalEstablecimientos2 = comunidad2.establecimientos.length;

        if (totalEstablecimientos1 === 0 || totalEstablecimientos2 === 0) {
            return false; // Evitar divisiones por cero
        }

        const establecimientosComunes = comunidad1.establecimientos.filter(establecimiento1 =>
            comunidad2.establecimientos.some(establecimiento2 => establecimiento1.id === establecimiento2.id)
        );

        const porcentajeCoincidencia = (establecimientosComunes.length / Math.min(totalEstablecimientos1, totalEstablecimientos2)) * 100;

        return porcentajeCoincidencia > parseInt(process.env.PORCENTAJE_COINCIDENCIA_ESTABLECIMIENTOS || '75'); 
    }
}

export class CriterioMismoGradoConfianza implements CriterioFusion {
    constructor(private servicioGradosConfianza: ServicioDeGradosDeConfianza) {}

    sonCompatibles(comunidad1: Comunidad, comunidad2: Comunidad): boolean {
        const gradoConfianzaComunidad1 = this.servicioGradosConfianza.obtenerGradosDeConfianza(comunidad1);
        const gradoConfianzaComunidad2 = this.servicioGradosConfianza.obtenerGradosDeConfianza(comunidad2);

        return gradoConfianzaComunidad1 === gradoConfianzaComunidad2;
    }
}


