import express from 'express';
import Joi from 'joi';
import Comunidad, { validateComunidad } from './types/Comunidad';
import { sugerirFusionComunidad } from './fusionComunidades';

const app = express();


// Express middlewares
app.use(express.json());
// End of express middlewares

// Routes
app.get('/servicio-1', validateComunidad,(req, res) => {
    const comunidades : Comunidad[] = req.body.comunidades;
    //console.log(comunidades)
    res.json(req.body);
    sugerirFusionComunidad(comunidades);
});

// End of routes

// Start server
app.listen(3000, () => { // TODO: Parametrize port an connection data via .env file (DOES NOT PUSH THE PERSONAL CONFIGURATION TO THE REPO)
    console.log('\x1b[32mServer running on port 3000\x1b[0m');
});

// End of start server