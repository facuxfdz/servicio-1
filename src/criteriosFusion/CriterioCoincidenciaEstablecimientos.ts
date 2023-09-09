import Comunidad from "../types/Comunidad";
import CriterioFusion from "./CriterioFusion";

class CriterioCoincidenciaEstablecimientos implements CriterioFusion {
    sonCompatibles(comunidad1: Comunidad, comunidad2: Comunidad): boolean {
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
}

export default CriterioCoincidenciaEstablecimientos;