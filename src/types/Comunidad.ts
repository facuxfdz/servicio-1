import express from 'express';
import Joi from 'joi';



type Comunidad  = {
    id: number;
    nombre: string;
    establecimientos: Establecimiento[];
}

export type Establecimiento = {
    id: number;
    servicios: Servicio[];
}

export type Servicio = {
    id: number;
}

const comunidadSchema = Joi.object({
    comunidades: Joi.array().items(Joi.object({
        nombre: Joi.string().required(),
        id: Joi.number().required(),
        establecimientos: Joi.array().items(Joi.object({
            id: Joi.string().required(),
            servicios: Joi.array().items(Joi.object({
                id: Joi.number().required()
            })).required()
        })).required()
    })).required()
});

export const validateComunidad = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const validationResult = comunidadSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).json(validationResult.error);
    }

    const comunidades: Comunidad[] = req.body.comunidades;

    const comunidadesParseadas: Comunidad[] = comunidades.map((comunidad) => ({
        id: parseInt(comunidad.id.toString()),
        nombre: comunidad.nombre,
        establecimientos: comunidad.establecimientos
    }));

    req.body.comunidades = comunidadesParseadas;

    next();
};
// End of custom validation middlewares

export default Comunidad