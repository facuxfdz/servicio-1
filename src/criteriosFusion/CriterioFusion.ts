import Comunidad from "../types/Comunidad";

interface CriterioFusion {
    sonCompatibles(comunidad1: Comunidad, comunidad2: Comunidad): boolean;
}

export default CriterioFusion;