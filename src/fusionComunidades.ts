import Comunidad, { Establecimiento, Servicio } from "./types/Comunidad";

export function sugerirFusionComunidad (comunidades: Comunidad[]){

    const comunidadesCompatibles: Comunidad[][] = [];


    
    for(let i = 0; i < comunidades.length-1; i++){ //[a,b,c,d,e] => [a,b] [b,c] [c,d] [d,e]
        var comunidadAux; //= comunidades[i+1];
        
        for(let j = i+1; j < comunidades.length; j++){ //[a,b,c,d,e] => [a,b] [a,c] [a,d] [a,e] VA EL -1?????????????????????????'
            comunidadAux = comunidades[j];

            //verificar que i no este dentro de la lista de compatibles
            

            if(cumpleTodasLasCondiciones(comunidades[i], comunidadAux)){

                //[a,j,e,f,d] -> Iterar desde j hasta de la lista checkeando que cada elemento sea compatible con el resto.

                //agrupamos las comunidades a la propuestas
                comunidadesCompatibles.push([comunidades[i], comunidadAux]); // [[a,j],[d,e],[a,e]] => [[a,j,e],[d,e]]
                
                //TODO Hacerle un flat a la lista de comunidadesCompatibles aka [[a,j],[a,e],[a,c]] => [[a,j,e],[a,c]]
                //capaz una lista aoarte que tenga las comuniades iniciales y vas borrando de esa lista a medida que vas agregando a la lista de compatibles
            }
        }

        console.log("Se termino de analizar la comunidad " + comunidades[i].nombre);
    

    
    }

    if(comunidadesCompatibles.length == 0){
    console.log("Las comunidades no son compatibles.");
    }

    else{
        console.log("Las comunidades compatibles son: "); //TODO esto es para debug
        //muestro lo que tiene comunidades compatibles
        for(let i = 0; i < comunidadesCompatibles.length; i++){
                    console.log(JSON.stringify(comunidadesCompatibles[i]));
        }
    }



    //retornar las comunidades que estan en la lista de propuestas
    return comunidadesCompatibles;
}

function cumpleTodasLasCondiciones(comunidad1: Comunidad, comunidad2: Comunidad){
    return coincidenEstablecimientos(comunidad1, comunidad2) && coincidenServicios(comunidad1, comunidad2) && coincidenGradoConfianza(comunidad1, comunidad2) && coincidenUsuarios(comunidad1, comunidad2);
}


function coincidenEstablecimientos (comunidad1: Comunidad, comunidad2: Comunidad){

     //Esto es el 75%
    const minCoincidencias = (Math.min(comunidad1.establecimientos.length, comunidad2.establecimientos.length) * 0.75);

    let coincidencias = 0;

    comunidad1.establecimientos.forEach( (establecimiento1) => {
        if (JSON.stringify(comunidad2.establecimientos.includes(establecimiento1))){
        coincidencias++;
        }
    })

//   if (JSON.stringify(comunidad2.establecimientos.includes(establecimiento1))){

   return coincidencias > minCoincidencias;
}

function coincidenServicios (comunidad1: Comunidad, comunidad2: Comunidad){
    
    let serviciosComuna1 = obtenerServicios(comunidad1.establecimientos);

    let serviciosComuna2 = obtenerServicios(comunidad2.establecimientos)
    //Esto es el 75%
    const minCoincidencias = Math.min(serviciosComuna1.length , serviciosComuna2.length) * 0.75;

    let coincidencias = 0;
   
    serviciosComuna1.forEach( (servicio1) => {
        if (JSON.stringify(serviciosComuna2.includes(servicio1))){
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
    const minCoincidencias = (Math.min(comunidad1.usuarios.length, comunidad2.usuarios.length) * 0.05);

    let coincidencias = 0;

    comunidad1.usuarios.forEach( (usuario1) => {
        if (JSON.stringify(comunidad2.usuarios.includes(usuario1))){
        coincidencias++;
        }
    })
    
    return coincidencias > minCoincidencias;
}

function obtenerServicios (establecimientos: Establecimiento[]){

    return establecimientos.map( (establecimiento) => establecimiento.servicios).flat(); 
}