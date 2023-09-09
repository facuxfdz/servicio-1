import express from 'express';
import Joi from 'joi';

type Comunidad  = {
    id: number;
    nombre: string;
    establecimientos: Establecimiento[];
    usuarios: Usuario[]
}

export type Establecimiento = {
    id: number;
    servicios: Servicio[];
}

export type Usuario = {
    id: number;
    nombre: string;
}

export type Servicio = {
    id: number;
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
            nombre: Joi.string()
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
            .map((establecimiento) => ({
                id: parseInt(establecimiento.id.toString()),
                servicios: establecimiento.servicios
                    .map((servicio) => ({
                        id: parseInt(servicio.id.toString())
                    }))
            })),
        usuarios: comunidad.usuarios
            .map((usuario) => ({
                id: parseInt(usuario.id.toString()),
                nombre: usuario.nombre
            }))
    }));

    req.body.comunidades = comunidadesParseadas;

    next();
};
// End of custom validation middlewares

export default Comunidad