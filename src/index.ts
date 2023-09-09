import express from 'express';
import Joi from 'joi';
import Comunidad, { validateComunidad } from './types/Comunidad';
import { sugerirFusionComunidad } from './fusionComunidades';
import { fusionarComunidades } from './aceptaFusion';

const app = express();


// Express middlewares
app.use(express.json());
// End of express middlewares

// Routes
app.get('/fusion', validateComunidad,(req, res) => {
    const comunidades : Comunidad[] = req.body.comunidades;
    
    //console.log(comunidades)
    res.json(sugerirFusionComunidad(comunidades));
});

app.get('/aceptar-fusion', (req,res) => {
    // devolver la comunidad resultante de fusionar con la propuesta que mandaron
    const comunidades : Comunidad[] = req.body.comunidades;
    res.json(fusionarComunidades(comunidades));
});

app.get('/rechazar-fusion', (req,res) => {
    // registrar en mi sistema la fusion como "ya la propuse en esta fecha (fecha rechazo), para tener en cuenta despues en la proxima generacion de propuestas de fusion"
    const comunidades: Comunidad[] = req.body.comunidades;
    res.json();
});

// End of routes

// Start server
app.listen(3000, () => { // TODO: Parametrize port an connection data via .env file (DOES NOT PUSH THE PERSONAL CONFIGURATION TO THE REPO)
    console.log('\x1b[32mServer running on port 3000\x1b[0m');
});

// End of start server