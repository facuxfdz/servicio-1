import CriterioFusion from "./criteriosFusion/CriterioFusion";
import Comunidad from "./types/Comunidad";
import PropuestaFusion from "./types/PropuestaFusion"
import { generarId } from "./utils/generadorIdPropuestas";

export function generarPropuestaFusion(comunidades: Comunidad[], criterios: CriterioFusion[]): PropuestaFusion[] {
    const propuestasDeFusion: PropuestaFusion[] = [];
    const comunidadesYaFusionadas = new Set<Comunidad>(); // Para evitar fusionar la misma comunidad más de una vez

    for (const comunidad1 of comunidades) {
        if (!comunidadesYaFusionadas.has(comunidad1)) {
            const comunidadesCompatibles: Comunidad[] = [comunidad1];
            for (const comunidad2 of comunidades) {
                if (comunidad1 !== comunidad2 && criterios.every(criterio => criterio.sonCompatibles(comunidad1, comunidad2))) {
                    comunidadesCompatibles.push(comunidad2);
                    comunidadesYaFusionadas.add(comunidad2);
                }
            }

            if (comunidadesCompatibles.length > 1) {
                const idPropuesta = generarId();
                propuestasDeFusion.push({
                    id: idPropuesta,
                    comunidadesAFusionar: comunidadesCompatibles,
                });
            }
        }
    }

    return propuestasDeFusion;
}