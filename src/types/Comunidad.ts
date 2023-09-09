import express from 'express';
import Joi from 'joi';
import { sugerirFusionComunidad } from '../fusionComunidades';



type Comunidad  = {
    id: number;
    nombre: string;
    establecimientos: Establecimiento[];
    usuarios: Usuario[];
    activo: boolean;
}

export type Establecimiento = {
    id: number;
    servicios: Servicio[];
}

export type Servicio = {
    id: number;
}

export type Usuario = {
    id: number;
    nombre: string; 
    email: string;
    password: string;
}

const comunidadSchema = Joi.object({
    comunidades: Joi.array().items(Joi.object({
        nombre: Joi.string().required(),
        id: Joi.number().required(),
        establecimientos: Joi.array().items(Joi.object({
            id: Joi.number().required(),
            servicios: Joi.array().items(Joi.object({
                id: Joi.number().required()
            })).required()
        })).required(),
        usuarios: Joi.array().items(Joi.object({
            id: Joi.number().required(),
            nombre: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        })).required(),
        activo: Joi.boolean().required()
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
        establecimientos: comunidad.establecimientos,
        usuarios: comunidad.usuarios,
        activo: comunidad.activo
    }));

    req.body.comunidades = comunidadesParseadas;

    next();
};
// End of custom validation middlewares


export default Comunidad

