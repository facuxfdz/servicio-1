let propuestaIdCounter = 0;

export const generarId = () : number => {
    return propuestaIdCounter++;
}