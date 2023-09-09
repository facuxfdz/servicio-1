import express from 'express';
import Comunidad, { validateComunidad } from './types/Comunidad';
import PropuestaFusion from './types/PropuestaFusion';
import { generarPropuestaFusion } from './propuestasFusion/fusionComunidades';
import CriterioFusion from './criteriosFusion/CriterioFusion';
import { CriterioCoincidenciaEstablecimientos, CriterioCoincidenciaServicios, CriterioCoincidenciaUsuarios, CriterioMismoGradoConfianza } from './criteriosFusion/CriteriosDeFusion';
import MockServicioDeGradosDeConfianza from './servicioGradosConfianza/MockServicioDeGradosDeConfianza';
import * as dotenv from 'dotenv';
import { aceptarPropuestaDeFusion } from './propuestasFusion/aceptacionPropuesta';
import { deleteById, findById } from './propuestasFusion/propuestasStorage';
import options from './swagger/options';

const app = express();

dotenv.config();

const bodyParser = require("body-parser")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
)
// Express middlewares
app.use(express.json());
// End of express middlewares

// Routes
app.get('/fusiones-comunidades', validateComunidad, (req, res) => {
    const comunidades: Comunidad[] = req.body.comunidades;
    const implementacionServicioGradosConfianza = new MockServicioDeGradosDeConfianza();

    const criteriosFusion: CriterioFusion[] = [
        new CriterioCoincidenciaEstablecimientos(),
        new CriterioCoincidenciaServicios(),
        new CriterioMismoGradoConfianza(implementacionServicioGradosConfianza),
        new CriterioCoincidenciaUsuarios()
    ];
    const propuestasDeFusion: PropuestaFusion[] = generarPropuestaFusion(comunidades, criteriosFusion);
    if(propuestasDeFusion.length === 0){
        res.status(404).json({ mensaje: 'No se pudo obtener ninguna propuesta de fusión' });
        return;
    }
    res.json(propuestasDeFusion);
});

app.get('/aceptar-fusion', (req, res) => {
    const idPropuesta = parseInt(req.query.idPropuesta as string);

    // Manejar el caso de uso de aceptar una propuesta de fusión
    const resultado = aceptarPropuestaDeFusion(idPropuesta);

    if (resultado) {
        res.json(resultado);
    } else {
        res.status(404).json({ mensaje: 'Propuesta de fusión no encontrada' });
    }
});

app.get('/rechazar-fusion', (req, res) => {
    const idPropuesta = parseInt(req.query.idPropuesta as string);
    const propuesta = findById(idPropuesta);
    if(!propuesta){
        res.status(404).json({ mensaje: 'Propuesta de fusión no encontrada' });
        return;
    }
    deleteById(idPropuesta);
    res.json({ mensaje: 'Propuesta de fusión ' + idPropuesta + ' rechazada' });
});
// End of routes

// Start server
app.listen(3000, () => { // TODO: Parametrize port an connection data via .env file (DOES NOT PUSH THE PERSONAL CONFIGURATION TO THE REPO)
    console.log('\x1b[32mServer running on port 3000\x1b[0m');
});

// End of start server