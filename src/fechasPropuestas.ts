
import Comunidad from "./types/Comunidad";

const baseDeDatos = new Map<number,string>();
baseDeDatos.set(4,"2022-03-04") //YYYY-MM-DD

//Metodo de burbujeo

export const getUltimaFechaPropuesta = (comunidad : Comunidad) => {
    
  const comunidadFecha = baseDeDatos.get(comunidad.id);
  return comunidadFecha ? comunidadFecha : null
  
}


// com1-com2
// com3-com5

// com1 -> 2022-03-15
// com5 -> 2023-04-04
// Estan caras Ahorras en pesos. Si. 
