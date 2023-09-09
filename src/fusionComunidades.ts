import Comunidad from "./types/Comunidad";
import PropuestaFusion from "./types/PropuestaFusion"
import { generarId } from "./utils/generadorIdPropuestas";

export const generarPropuestaFusion = (comunidades : Comunidad[]) => {
    const propuestasDeFusion: PropuestaFusion[] = [];

    const comunidadesYaFusionadas = new Set<Comunidad>();

    for (const comunidad1 of comunidades){
        if(!comunidadesYaFusionadas.has(comunidad1)){
            const comunidadesCompatibles : Comunidad[] = [comunidad1];
            for (const comunidad2 of comunidades){
                if(comunidad1 !== comunidad2 && sonCompatibles(comunidad1, comunidad2)){
                    comunidadesCompatibles.push(comunidad2);
                    comunidadesYaFusionadas.add(comunidad2);
                }
            }

            if(comunidadesCompatibles.length > 1){
                const idPropuestaFusion = generarId();
                propuestasDeFusion.push({
                    id: idPropuestaFusion,
                    comunidadesAFusionar: comunidadesCompatibles
                });
                
            }
        }
    }
    return propuestasDeFusion;
}


function sonCompatibles(comunidad1: Comunidad, comunidad2: Comunidad): boolean {
    const totalEstablecimientos1 = comunidad1.establecimientos.length;
    const totalEstablecimientos2 = comunidad2.establecimientos.length;

    if (totalEstablecimientos1 === 0 || totalEstablecimientos2 === 0) {
        return false; // Evitar divisiones por cero
    }

    const establecimientosComunes = comunidad1.establecimientos.filter(establecimiento1 =>
        comunidad2.establecimientos.some(establecimiento2 => establecimiento1.id === establecimiento2.id)
    );

    const porcentajeCoincidencia = (establecimientosComunes.length / totalEstablecimientos1) * 100;

    return porcentajeCoincidencia > 75; // Cambiar el 75 por el porcentaje deseado
}