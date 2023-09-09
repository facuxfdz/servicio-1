import PropuestaFusion from "../types/PropuestaFusion";

const propuestas = [] as PropuestaFusion[];

export const save = (propuesta : PropuestaFusion) => {
    propuestas.push(propuesta);
}

export const findById = (id : number) => {
    return propuestas.find(propuesta => propuesta.id === id) || null;
}