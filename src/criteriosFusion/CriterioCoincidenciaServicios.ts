import Comunidad from "../types/Comunidad";
import CriterioFusion from "./CriterioFusion";

class CriterioCoincidenciaServicios implements CriterioFusion {
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

        const porcentajeCoincidencia = (serviciosComunes.length / totalServiciosComunidad1) * 100;

        return porcentajeCoincidencia > 75; // Cambiar el 75 por el porcentaje deseado
    }
}

export default CriterioCoincidenciaServicios;