import Comunidad from "../types/Comunidad";

interface ServicioDeGradosDeConfianza {
    obtenerGradosDeConfianza(comunidad : Comunidad) : number;
}

export default ServicioDeGradosDeConfianza;
