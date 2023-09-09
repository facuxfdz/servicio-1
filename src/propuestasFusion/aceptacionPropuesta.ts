import Comunidad, { Establecimiento, Usuario } from "../types/Comunidad";
import PropuestaFusion from "../types/PropuestaFusion";
import { generarId } from "../utils/generadorIdPropuestas";
import { deleteById, findById } from "./propuestasStorage";

export function aceptarPropuestaDeFusion(idPropuesta: number) {
    // Encontrar la propuesta de fusión por su ID
    const propuestaAceptada : PropuestaFusion | null = findById(idPropuesta);

    if (propuestaAceptada) {
        // Obtener las comunidades a fusionar de la propuesta
        const comunidadesAFusionar = propuestaAceptada.comunidadesAFusionar;

        // Crear una nueva comunidad fusionada
        const nuevaComunidad: Comunidad = {
            id: generarId(), // Genera un nuevo ID para la comunidad fusionada
            nombre: `Comunidad ${comunidadesAFusionar.map(comunidad => comunidad.id).join('-')}`, // Nombre basado en IDs concatenados
            establecimientos: fusionarEstablecimientos(comunidadesAFusionar),
            usuarios: fusionarUsuarios(comunidadesAFusionar),
        };
        
        // Borro la propuesta de mi storage
        deleteById(idPropuesta);
        // Devolver la nueva comunidad fusionada
        return nuevaComunidad;
    }else{
        console.log(`No existe una propuesta con el id ${idPropuesta}`);
    }

    return null;
}

function fusionarEstablecimientos(comunidadesAFusionar: Comunidad[]): Establecimiento[] {
    const establecimientosFusionados : Establecimiento [] = [];

    comunidadesAFusionar.forEach(comunidad => {
        comunidad.establecimientos.forEach(establecimiento => {
            const existe = establecimientosFusionados.some(establecimientoFusionado => establecimientoFusionado.id === establecimiento.id);
            if (!existe) {
                establecimientosFusionados.push(establecimiento);
            }
        });
    });

    return Array.from(establecimientosFusionados);
}


function fusionarUsuarios(comunidadesAFusionar: Comunidad[]): Usuario[] {
    const usuariosFusionados : Usuario [] = [];

    comunidadesAFusionar.forEach(comunidad => {
        comunidad.usuarios.forEach(usuario => {
            const existe = usuariosFusionados.some(usuarioFusionado => usuarioFusionado.id === usuario.id);
            if (!existe) {
                usuariosFusionados.push(usuario);
            }
        });
    });

    return Array.from(usuariosFusionados);
}
