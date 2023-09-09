import CriterioFusion from "../criteriosFusion/CriterioFusion";
import Comunidad from "../types/Comunidad";
import PropuestaFusion from "../types/PropuestaFusion"
import { generarId } from "../utils/generadorIdPropuestas";
import { save } from "./propuestasStorage";

interface PropuestaFusionRecord {
    propuesta: PropuestaFusion;
    fechaGeneracion: Date;
}

// Crear un mapa para mantener un registro de las propuestas
const propuestasRegistradas = new Map<string, PropuestaFusionRecord>();

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
                const propuesta: PropuestaFusion = {
                    id: generarId(),
                    comunidadesAFusionar: comunidadesCompatibles,
                };
                const propuestaId = obtenerIdentificadorUnico(comunidadesCompatibles);
                // Verificar si ya existe una propuesta similar en el registro
                if (!existePropuestaSimilar(propuestaId)) {
                    // Agregar la nueva propuesta al registro
                    const fechaGeneracion = new Date();
                    propuestasRegistradas.set(propuestaId, { propuesta, fechaGeneracion });
                    // Agregar la propuesta al resultado
                    propuestasDeFusion.push(propuesta);
                    save(propuesta);
                }else{
                    console.log(`Ya existe una propuesta similar a la propuesta ${propuestaId}`);
                }
            }
        }
    }

    return propuestasDeFusion;
}

function obtenerIdentificadorUnico(comunidades: Comunidad[]): string {
    // Generar un identificador único basado en las comunidades involucradas
    const idsComunidades = comunidades.map(comunidad => comunidad.id).sort().join('-');
    return idsComunidades;
}

function existePropuestaSimilar(identificadorUnico: string): boolean {
    // Verificar si existe una propuesta con el mismo identificador único
    const propuestaRegistrada = propuestasRegistradas.get(identificadorUnico);
    if (propuestaRegistrada) {
        // Calcular el tiempo transcurrido desde la generación de la propuesta existente
        const fechaActual = new Date();
        const tiempoTranscurrido = fechaActual.getTime() - propuestaRegistrada.fechaGeneracion.getTime();

        // Si han pasado menos de 6 meses, la propuesta es similar y ya existe
        const seisMesesEnMilisegundos = 6 * 30 * 24 * 60 * 60 * 1000; // Aproximadamente 6 meses
        if (tiempoTranscurrido < seisMesesEnMilisegundos) {
            return true;
        }
    }

    return false;
}