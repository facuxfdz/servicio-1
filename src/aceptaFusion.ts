import Comunidad, {Usuario, Establecimiento} from "./types/Comunidad";


export function fusionarComunidades(comunidades: Comunidad[]){ //[a,b,c] 
    //Sabemos que a, b y c son compatibles. Solo resta tomar cada uno de sus atributos y encajarlos en una comunidad nueva
    


    const comunidadFusionada: Comunidad = {
        id: comunidades[0].id, // Usamos el ID de la primera comunidad, pq despues la desactivamos
        nombre: comunidades.map((comunidad) => comunidad.nombre).join(", "), // Concatenamos los nombres, separados por coma
        establecimientos: [], // Inicialmente vacío
        usuarios: [], // Inicialmente vacío
    };


    for (const comunidad of comunidades) {
        comunidadFusionada.establecimientos = comunidadFusionada.establecimientos.concat(comunidad.establecimientos);
        comunidadFusionada.usuarios = comunidadFusionada.usuarios.concat(comunidad.usuarios);

    }
    

   comunidadFusionada.usuarios = eliminarDuplicadosUsuarios(comunidadFusionada);
   comunidadFusionada.establecimientos = eliminarDuplicadosEstablecimientos(comunidadFusionada); 
 
   return comunidadFusionada;
}



function eliminarDuplicadosUsuarios(comunidad: Comunidad): | Usuario[] {
    const usuariosUnicos: Usuario[] = [];
    const idsSet = new Set<number>();

    for (const usuario of comunidad.usuarios) {
        if (!idsSet.has(usuario.id)) {
            // Si el ID del usuario no está en el conjunto, significa que es único.
            idsSet.add(usuario.id);
            usuariosUnicos.push(usuario);
        }
    }

    return usuariosUnicos;
}

function eliminarDuplicadosEstablecimientos(comunidad: Comunidad): | Establecimiento[] {
    const establecimientosUnicos: Establecimiento[] = [];
    const idsSet = new Set<number>();
    
    for (const establecimiento of comunidad.establecimientos) {
        if (!idsSet.has(establecimiento.id)) {
            // Si el ID del establecimiento no está en el conjunto, significa que es único.
            idsSet.add(establecimiento.id);
            establecimientosUnicos.push(establecimiento);
        }
    }

    return establecimientosUnicos;
}