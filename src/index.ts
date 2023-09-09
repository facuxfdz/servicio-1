import express from 'express';
import Comunidad, { validateComunidad } from './types/Comunidad';
import PropuestaFusion from './types/PropuestaFusion';
import { generarPropuestaFusion } from './fusionComunidades';
import CriterioFusion from './criteriosFusion/CriterioFusion';
import { CriterioCoincidenciaEstablecimientos, CriterioCoincidenciaServicios } from './criteriosFusion/CriteriosDeFusion';

const app = express();


// Express middlewares
app.use(express.json());
// End of express middlewares

// Routes
app.get('/fusiones-comunidades', validateComunidad,(req, res) => {
    const comunidades : Comunidad[] = req.body.comunidades;
    const criteriosFusion : CriterioFusion[] = [new CriterioCoincidenciaEstablecimientos(),new CriterioCoincidenciaServicios()];
    const propuestasDeFusion: PropuestaFusion[] = generarPropuestaFusion(comunidades,criteriosFusion);
    res.json(propuestasDeFusion);
});

// End of routes

// Start server
app.listen(3000, () => { // TODO: Parametrize port an connection data via .env file (DOES NOT PUSH THE PERSONAL CONFIGURATION TO THE REPO)
    console.log('\x1b[32mServer running on port 3000\x1b[0m');
});

// End of start server