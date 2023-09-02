import Comunidad, { Establecimiento, Servicio } from "./types/Comunidad";

function sugerirFusionComunidad (comunidades: Comunidad[]){

    const comunidadesCompatibles: Comunidad[] = [];
    
    for(let i = 0; i < comunidades.length ; i++){

        var comunidadAux = comunidades[i+1];
        
        coincidenEstablecimientos(comunidades[i], comunidadAux);
        coincidenServicios(comunidades[i], comunidadAux);

        comunidadesCompatibles.push(comunidades[i]);
        comunidadesCompatibles.push(comunidadAux);
        
    }

}

function coincidenEstablecimientos (comunidad1: Comunidad, comunidad2: Comunidad){

     //Esto es el 75%
    const minCoincidencias = Math.floor(Math.min(comunidad1.establecimientos.length, comunidad2.establecimientos.length) * 0.75);

    let coincidencias = 0;

    comunidad1.establecimientos.forEach( (establecimiento1) => {
        if (comunidad2.establecimientos.includes(establecimiento1)){
        coincidencias++;
        }
    })

   return coincidencias > minCoincidencias;
}

function coincidenServicios (comunidad1: Comunidad, comunidad2: Comunidad){
    
    let serviciosComuna1 = obtenerServicios(comunidad1.establecimientos);

    let serviciosComuna2 = obtenerServicios(comunidad2.establecimientos)
    //Esto es el 75%
    const minCoincidencias = Math.floor(Math.min(serviciosComuna1.length , serviciosComuna2.length) * 0.75);

    let coincidencias = 0;
   
    serviciosComuna1.forEach( (servicio1) => {
        if (serviciosComuna2.includes(servicio1)){
        coincidencias++;
        }
    })
   
    return coincidencias > minCoincidencias;
}

function obtenerServicios (establecimientos: Establecimiento[]){

    return establecimientos.map( (establecimiento) => establecimiento.servicios).flat(); 
}
