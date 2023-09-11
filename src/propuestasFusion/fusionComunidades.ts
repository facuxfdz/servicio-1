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
const propuestasRegistradas = new Map<string, PropuestaFusionRecord>(); //propuestaId, { PropuestaFusionRecord } 

export function generarPropuestaFusion(comunidades: Comunidad[], criterios: CriterioFusion[]): PropuestaFusion[] {
    const propuestasDeFusion: PropuestaFusion[] = [];
    const comunidadesYaFusionadas = new Set<Comunidad>(); // Para evitar fusionar la misma comunidad más de una vez

    for (const comunidad1 of comunidades) {
        if (!comunidadesYaFusionadas.has(comunidad1)) {
            const comunidadesCompatibles: Comunidad[] = [comunidad1]; //[a,b,c,d,e] => [[a,b],[a,c],[a,d],[a,e]] pero ahora sin listas de listas!
            for (const comunidad2 of comunidades) {
                if (comunidad1 !== comunidad2 && criterios.every(criterio => criterio.sonCompatibles(comunidad1, comunidad2))) {
                    comunidadesCompatibles.push(comunidad2);
                    comunidadesYaFusionadas.add(comunidad2); //se meten en lugar de sacarse para que no se repitan
                }
            }

            //si no es un elemento unico
            if (comunidadesCompatibles.length > 1) { 
                const propuesta: PropuestaFusion = { //se crea la propuesta
                    id: generarId(),
                    comunidadesAFusionar: comunidadesCompatibles,
                };
                const propuestaId = obtenerIdentificadorUnico(comunidadesCompatibles);
                // Verificar si ya existe una propuesta similar en el registro
                if (!existePropuestaSimilar6Meses(propuestaId)) {
                    // Agregar la nueva propuesta al registro
                    const fechaGeneracion = new Date();
                    propuestasRegistradas.set(propuestaId, { propuesta, fechaGeneracion }); 
                    // Agregar la propuesta al resultado
                    propuestasDeFusion.push(propuesta);
                    save(propuesta); //la guardo en el historico

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
    return idsComunidades;  //Ejemplo //1,4,7 => 1-4-7
}  


function existePropuestaSimilar6Meses(identificadorUnico: string): boolean {
    // Verificar si existe una propuesta con el mismo identificador único
    const propuestaRegistrada = propuestasRegistradas.get(identificadorUnico); 
    //Si existe 
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
