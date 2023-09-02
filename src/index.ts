import express from 'express';
import Joi from 'joi';
import { Comunidad } from './types/Comunidad';

const app = express();

// Custom validation middlewares
const comunidadSchema = Joi.object({
    comunidades: Joi.array().items(Joi.object({
        nombre: Joi.string().required(),
        id: Joi.number().required()
    })).required()
});

const validateComunidad = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const validationResult = comunidadSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).json(validationResult.error);
    }

    const comunidades: Comunidad[] = req.body.comunidades;

    const comunidadesParseadas: Comunidad[] = comunidades.map((comunidad) => ({
        id: parseInt(comunidad.id.toString()),
        nombre: comunidad.nombre
    }));

    req.body.comunidades = comunidadesParseadas;

    next();
};
//
app.use(express.json());

app.get('/servicio-1', validateComunidad,(req, res) => {
    const comunidades : Comunidad[] = req.body.comunidades;
    console.log(comunidades)
    res.json(req.body);
});


app.listen(3000, () => {
    console.log('\x1b[32mServer running on port 3000\x1b[0m');
});


