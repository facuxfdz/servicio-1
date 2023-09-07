import Comunidad, { Establecimiento, Servicio } from "./types/Comunidad";

export function sugerirFusionComunidad (comunidades: Comunidad[]){

    const comunidadesCompatibles: Comunidad[] = [];
    const comunidadesPropuestas: Comunidad[] = [];

    
    for(let i = 0; i < comunidades.length -1; i++){
        var comunidadAux = comunidades[i+1];
        
        if(cumpleTodasLasCondiciones(comunidades[i], comunidadAux)){

            //Agrupamos las comunidades para la propuesta
            comunidadesCompatibles.push(comunidades[i]);
            comunidadesCompatibles.push(comunidadAux);
            
            //Como ya van a ser parte de una propuesta, las meto en una lista que voy a usar para filtrar la general.
            comunidadesPropuestas.push(comunidades[i]);
            comunidadesPropuestas.push(comunidadAux);

        }
        
       // print();

        console.log("Nada es compatible.");
    

    }

}

function cumpleTodasLasCondiciones(comunidad1: Comunidad, comunidad2: Comunidad){
    return coincidenEstablecimientos(comunidad1, comunidad2) && coincidenServicios(comunidad1, comunidad2) && coincidenGradoConfianza(comunidad1, comunidad2) && coincidenUsuarios(comunidad1, comunidad2);
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


function coincidenGradoConfianza(comunidad1: Comunidad, comunidad2: Comunidad){
    return true; //TODO ENTREGAR. NOOOOOO
}

function coincidenUsuarios(comunidad1: Comunidad, comunidad2: Comunidad) {
    
     //Esto es el 5%
    const minCoincidencias = Math.floor(Math.min(comunidad1.usuarios.length, comunidad2.usuarios.length) * 0.05);

    let coincidencias = 0;

    comunidad1.usuarios.forEach( (usuario1) => {
        if (comunidad2.usuarios.includes(usuario1)){
        coincidencias++;
        }
    })
    
    return coincidencias > minCoincidencias;
}

function obtenerServicios (establecimientos: Establecimiento[]){

    return establecimientos.map( (establecimiento) => establecimiento.servicios).flat(); 
}