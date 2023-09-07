// type Comunidad = {
//     establecimientos: string[]; // Reemplaza esto con el tipo real de establecimientos
//     usuarios: string[]; // Reemplaza esto con el tipo real de usuarios
// };

// type CoincidenciaConfig = {
//     propiedad: keyof Comunidad;
//     porcentaje: number;
// };

// function coincidenGenerico(comunidad1: Comunidad, comunidad2: Comunidad, config: CoincidenciaConfig) {
//     const { propiedad, porcentaje } = config;

//     const minCoincidencias = Math.floor(Math.min(comunidad1[propiedad].length, comunidad2[propiedad].length) * porcentaje);

//     let coincidencias = 0;

//     comunidad1[propiedad].forEach((item1) => {
//         if (comunidad2[propiedad].includes(item1)) {
//             coincidencias++;
//         }
//     });

//     return coincidencias > minCoincidencias;
// }


// const configEstablecimientos: CoincidenciaConfig = {
//     propiedad: "establecimientos",
//     porcentaje: 0.75,
// };


// const configUsuarios: CoincidenciaConfig = {
//     propiedad: "usuarios",
//     porcentaje: 0.05,
// };

// const coincidenEstablecimientos = coincidenGenerico(comunidad1, comunidad2, configEstablecimientos);
// const coincidenUsuarios = coincidenGenerico(comunidad1, comunidad2, configUsuarios);
