import Comunidad from "../types/Comunidad";
import ServicioDeGradosDeConfianza from "./ServicioDeGradosDeConfianza";

// Implementación de un mock del servicio externo de Grados de Confianza con una promesa simulada
class MockServicioDeGradosDeConfianza implements ServicioDeGradosDeConfianza {
    obtenerGradosDeConfianza(comunidad: Comunidad): number {
        const DUMMY_GRADOS_DE_CONFIANZA = 0.5;
        // Simulación de una petición a un servicio externo
        return DUMMY_GRADOS_DE_CONFIANZA;
    }
}

export default MockServicioDeGradosDeConfianza;