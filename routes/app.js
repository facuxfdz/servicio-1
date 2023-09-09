/**
 * @swagger
 * components:
 *   schemas:
 *     Comunidad:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la comunidad
 *         nombre:
 *           type: string
 *           description: Nombre de la comunidad
 *     PropuestaFusion:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la propuesta de fusión
 *         comunidadesAFusionar:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comunidad'
 *           description: Comunidades a fusionar
 */

/**
 * @swagger
 * /fusion-comunidades:
 *   get:
 *     summary: Obtener propuestas de fusión de comunidades
 *     description: Obtiene propuestas de fusión de comunidades.
 *     responses:
 *       200:
 *         description: Propuestas de fusión obtenidas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropuestaFusion'
 */

/**
 * @swagger
 * /aceptar-fusion:
 *   get:
 *     summary: Aceptar una propuesta de fusión de comunidades
 *     description: Acepta una propuesta de fusión de comunidades y crea una nueva comunidad fusionada.
 *     parameters:
 *       - in: query
 *         name: idPropuesta
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la propuesta de fusión a aceptar.
 *     responses:
 *       200:
 *         description: Propuesta de fusión aceptada correctamente. Devuelve la comunidad fusionada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comunidad'
 *       404:
 *         description: Propuesta de fusión no encontrada.
 */

/**
 * @swagger
 * /rechazar-fusion:
 *   get:
 *     summary: Rechazar una propuesta de fusión de comunidades
 *     description: Rechaza una propuesta de fusión de comunidades.
 *     parameters:
 *       - in: query
 *         name: idPropuesta
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la propuesta de fusión a rechazar.
 *     responses:
 *       204:
 *         description: Propuesta de fusión rechazada correctamente.
 *       404:
 *         description: Propuesta de fusión no encontrada.
 */
