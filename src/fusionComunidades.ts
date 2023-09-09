import Comunidad, { Establecimiento, Servicio } from "./types/Comunidad";

export function sugerirFusionComunidad (comunidades: Comunidad[]){

    const comunidadesCompatibles: Comunidad[][] = [];//[[a,b]]
    let comunidadesAuxiliar: Comunidad[][] = [];
    let comunidadesSinPropuestas: Comunidad[] = [];//[a,b]

    comunidadesSinPropuestas = comunidades; //aca hacemos la copia de comunidades

    //TODO: SE PUEDE HACER UNA TOTAL DE COMUNDIADES DONDE CADA VE QUE REALIZAMOS UNA PROPUESAT BORRAMOS LA COMUNIDAD DE LA LISTA. ERGO SI NO ESTA EN LA LISTA YA ESTA EN UNA PROPUESTA
    
    // 
    for(let i = 0; i < comunidades.length-1 ; i++){ //[a,b,c,d] => [a,b] [b,c] [c,d] 
        let comunidadAux; //= comunidades[i+1];
        
        //Aca vemos que no se repita el elemento a intentar fusionar
        if(comunidadesSinPropuestas.includes(comunidades[i])){

            for(let j = i+1; j <= comunidades.length-1; j++){ //[a,b,c,d,e] => [a,b] [a,c] [a,d] [a,e] VA EL -1?????????????????????????'
                comunidadAux = comunidades[j];
                //Van a ser ingenieros no pueden preguntar eso, ayudame loco
                //verificar que i no este dentro de la lista de compatibles

                if(cumpleTodasLasCondiciones(comunidades[i], comunidadAux)){

                    //[a,j,e,f,d] -> Iterar desde j hasta de la lista checkeando que cada elemento sea compatible con el resto.

                    //agrupamos las comunidades a la propuestas
                    comunidadesAuxiliar.push([comunidades[i], comunidadAux]); // [[a,j],[d,e],[a,e]] => [[a,j,e],[d,f]]
            
                }
            
            }
        
            if(comunidadesAuxiliar.length == 0){  //[NULL]
                console.log("No hay comunidades compatibles con " + comunidades[i].nombre);
                
            }
            else{
                console.log(comunidadesAuxiliar);
                //logica de filtrado de comunidades compatibles
                comunidadesCompatibles.push(armadoDeListaFinal(comunidadesAuxiliar)); //esto devuelve algo como [[a,b,c]]      

                //lo sacamos de la lista de comunidades ya propuestas
                comunidadesSinPropuestas = comunidadesSinPropuestas.filter((comunidad) => {return noEstaEnLaLista(comunidadesCompatibles.flat(), comunidad)}) //[a,c,d,e,f] borra [a,g,c] 
            
               // console.log(comunidadesSinPropuestas.length);
    
                //borro la lista auxiliar
                comunidadesAuxiliar = [];
    
                console.log("Se termino de analizar la comunidad " + comunidades[i].nombre); // by nico
            }

        }
    
    }

    function noEstaEnLaLista(listaComuna: Comunidad[], comunidad: Comunidad){
        return !listaComuna.includes(comunidad)
    }
    
    if(comunidadesCompatibles.length == 0){
    console.log("Las comunidades no son compatibles.");
    }

    else{
        console.log("Las comunidades compatibles son: "); //TODO esto es para debug
        //muestro lo que tiene comunidades compatibles
        for(let i = 0; i < comunidadesCompatibles.length; i++){
                    console.log(JSON.stringify(comunidadesCompatibles[i])); //laspelotas
        }
    }

    //retornar las comunidades que estan en la lista de propuestas
    return comunidadesCompatibles;
}



//compatibilidades.flat().forEach(comunidad1 => cumpleTodasLasCondiciones(comunidad1, comunaSiguiente)); Ya lo ves, la vida es asi
function armadoDeListaFinal(compatibilidades: Comunidad[][]){ //[[a,b],[a,c]]
    let comunaSiguiente: Comunidad;
    let comunaActual: Comunidad;  //[[a],[b,c,d]]]
    let listadoFinal: Comunidad[] = [];
    let comunaInicial: Comunidad = compatibilidades[0][0]; //now you're thinking with portals! Aguante portal 2, GLaDoS se la come.

    listadoFinal.push(comunaInicial);

        for(let i = 0; i < compatibilidades.length-1 && compatibilidades.length > 1; i++){ //va -1???
                                                        ///0     1     2
                                                    ////[[a,b],[a,c],[a,e]]
            comunaActual = compatibilidades[i][1]; //[a,b]

            comunaSiguiente = compatibilidades[i+1][1]; //[a,c]

            console.log("Se analiza la comunidad " + comunaActual.nombre + " y " + comunaSiguiente.nombre);
         
            if(cumpleTodasLasCondiciones(comunaActual, comunaSiguiente)){
                listadoFinal.push(comunaActual);
                listadoFinal.push(comunaSiguiente);
                console.log("Se agrego la comunidad " + comunaActual.nombre + " y " + comunaSiguiente.nombre + " a la lista final");
            }
        }

    if(listadoFinal.length == 1 || compatibilidades.length == 1){ //bien Nico sos un crá
        console.log("Solo hay una comunidad para fusionar");
        listadoFinal.push(compatibilidades[0][1]);//este seria b
    }

    return listadoFinal;
            
}

function cumpleTodasLasCondiciones(comunidad1: Comunidad, comunidad2: Comunidad){
    return coincidenEstablecimientos(comunidad1, comunidad2) && coincidenServicios(comunidad1, comunidad2) && coincidenGradoConfianza(comunidad1, comunidad2) && coincidenUsuarios(comunidad1, comunidad2);
}

/** Para los 6 meses
 * 
 * const posiblesFusiones = [...]
 * const = fusionesPosta = [];
 * for(fusion in posiblesFusiones){
 * Date fechaUltimaPropuestaFusion = getUltimFechaPropuestaFusion(fusion);
 * Date fechaHoy = now();
 * Date diferenciaTiempo = fechaHoy - fechaUltimaPropuestaFusion;
 * if( diferenciaTiempo.isMayorA6Meses()){
 *  fusionesPosta.add(fusion);
 * }
 * }
 * 
*/

function coincidenEstablecimientos (comunidad1: Comunidad, comunidad2: Comunidad){

     //Esto es el 75%
    const minCoincidencias = (Math.min(comunidad1.establecimientos.length, comunidad2.establecimientos.length) * 0.75);

    console.log("Minimo de coincidencias establecimientos: " + minCoincidencias + " para las comunidades " + comunidad1.nombre + " y " + comunidad2.nombre);

    let coincidencias = 0;

    comunidad1.establecimientos.forEach( (establecimiento1) => {
        if (comunidad2.establecimientos.map((establecimiento2) => JSON.stringify(establecimiento2)).includes(JSON.stringify(establecimiento1))){
        coincidencias++;
        //console.log(JSON.stringify(comunidad2.establecimientos));
        console.log("Coincidencia de establecimientos: " + coincidencias);
        }
    })

//   if (JSON.stringify(comunidad2.establecimientos.includes(establecimiento1))){

   return coincidencias > minCoincidencias;
}

function coincidenServicios (comunidad1: Comunidad, comunidad2: Comunidad){
    
    let serviciosComuna1 = obtenerServicios(comunidad1.establecimientos);

    let serviciosComuna2 = obtenerServicios(comunidad2.establecimientos);
    //Esto es el 75%
    const minCoincidencias = Math.min(serviciosComuna1.length , serviciosComuna2.length) * 0.75;

    let coincidencias = 0;
   
    console.log("Minimo de coincidencias servicios: " + minCoincidencias + "para las comunidades " + comunidad1.nombre + " y " + comunidad2.nombre);

    serviciosComuna1.forEach( (servicio1) => {
        if (serviciosComuna2.map((servicio2) => JSON.stringify(servicio2)).includes(JSON.stringify(servicio1))){
        coincidencias++;
        //console.log(JSON.stringify(serviciosComuna2));
        console.log("Coincidencia de servicios: " + coincidencias);
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

    console.log("Minimo de coincidencias usuarios: " + minCoincidencias + "para las comunidades " + comunidad1.nombre + " y " + comunidad2.nombre);

    comunidad1.usuarios.forEach( (usuario1) => {
        if (comunidad2.usuarios.map((usuario2) => JSON.stringify(usuario2)).includes(JSON.stringify(usuario1))){
        coincidencias++;
       // console.log(JSON.stringify(comunidad2.usuarios));
        console.log("Coincidencia de usuarios: " + coincidencias);
        }
    })
    
    return coincidencias > minCoincidencias;
}

function obtenerServicios (establecimientos: Establecimiento[]){

    return establecimientos.map( (establecimiento) => establecimiento.servicios).flat(); 
}