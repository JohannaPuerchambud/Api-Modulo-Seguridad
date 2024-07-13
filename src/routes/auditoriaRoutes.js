const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoriaController');

/**
 * @swagger
 * tags:
 *   name: Auditoria
 *   description: Operaciones relacionadas con la auditoría
 */

/**
 * @swagger
 * /api/auditoria:
 *   get:
 *     summary: Obtiene todas las auditorías
 *     tags: [Auditoria]
 *     responses:
 *       '200':
 *         description: Lista de auditorías obtenida exitosamente
 */
router.get('/auditoria', auditoriaController.getAuditoria);

/**
 * @swagger
 * /api/auditoria:
 *   post:
 *     summary: Crea una nueva auditoría
 *     tags: [Auditoria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: string
 *             example:
 *               field1: value1
 *               field2: value2
 *     responses:
 *       '201':
 *         description: Auditoría creada exitosamente
 *       '400':
 *         description: Error en la solicitud
 */
router.post('/auditoria', auditoriaController.createAuditoria);

/**
 * @swagger
 * /api/auditoria/{aud_id}:
 *   get:
 *     summary: Obtiene una auditoría por su ID
 *     tags: [Auditoria]
 *     parameters:
 *       - in: path
 *         name: aud_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la auditoría a obtener
 *     responses:
 *       '200':
 *         description: Auditoría obtenida exitosamente
 *       '404':
 *         description: Auditoría no encontrada
 */
router.get('/auditoria/:aud_id', auditoriaController.getAuditoriaById);

/**
 * @swagger
 * /api/auditoria/{aud_id}:
 *   put:
 *     summary: Actualiza una auditoría por su ID
 *     tags: [Auditoria]
 *     parameters:
 *       - in: path
 *         name: aud_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la auditoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: string
 *             example:
 *               field1: updated_value1
 *               field2: updated_value2
 *     responses:
 *       '200':
 *         description: Auditoría actualizada exitosamente
 *       '400':
 *         description: Error en la solicitud
 *       '404':
 *         description: Auditoría no encontrada
 */
router.put('/auditoria/:aud_id', auditoriaController.updateAuditoria);

/**
 * @swagger
 * /api/auditoria/{aud_id}:
 *   delete:
 *     summary: Elimina una auditoría por su ID
 *     tags: [Auditoria]
 *     parameters:
 *       - in: path
 *         name: aud_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la auditoría a eliminar
 *     responses:
 *       '204':
 *         description: Auditoría eliminada exitosamente
 *       '404':
 *         description: Auditoría no encontrada
 */
router.delete('/auditoria/:aud_id', auditoriaController.deleteAuditoria);

module.exports = router;
