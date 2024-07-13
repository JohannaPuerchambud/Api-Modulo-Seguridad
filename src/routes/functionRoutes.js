const express = require('express');
const functionController = require('../controllers/functionController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Functions
 *   description: Operaciones relacionadas con funciones del sistema
 */

/**
 * @swagger
 * /api/functions:
 *   get:
 *     summary: Obtiene todas las funciones
 *     tags: [Functions]
 *     responses:
 *       '200':
 *         description: Lista de funciones obtenida exitosamente
 */
router.get('/functions', functionController.getFunctions);

/**
 * @swagger
 * /api/functions/{id}:
 *   get:
 *     summary: Obtiene una función por su ID
 *     tags: [Functions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la función a obtener
 *     responses:
 *       '200':
 *         description: Función obtenida exitosamente
 *       '404':
 *         description: Función no encontrada
 */
router.get('/functions/:id', functionController.getFunction);

/**
 * @swagger
 * /api/functions:
 *   post:
 *     summary: Crea una nueva función
 *     tags: [Functions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: gestionar_usuarios
 *     responses:
 *       '201':
 *         description: Función creada exitosamente
 *       '400':
 *         description: Error en la solicitud
 */
router.post('/functions', functionController.createFunction);

/**
 * @swagger
 * /api/functions/{id}:
 *   put:
 *     summary: Actualiza una función por su ID
 *     tags: [Functions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la función a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: gestionar_roles
 *     responses:
 *       '200':
 *         description: Función actualizada exitosamente
 *       '400':
 *         description: Error en la solicitud
 *       '404':
 *         description: Función no encontrada
 */
router.put('/functions/:id', functionController.updateFunction);

/**
 * @swagger
 * /api/functions/{id}:
 *   delete:
 *     summary: Elimina una función por su ID
 *     tags: [Functions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la función a eliminar
 *     responses:
 *       '204':
 *         description: Función eliminada exitosamente
 *       '404':
 *         description: Función no encontrada
 */
router.delete('/functions/:id', functionController.deleteFunction);

/**
 * @swagger
 * /api/function_mod/{mod_id}:
 *   get:
 *     summary: Obtiene todas las funciones de un módulo
 *     tags: [Functions]
 *     parameters:
 *       - in: path
 *         name: mod_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del módulo del cual obtener las funciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de funciones obtenida exitosamente
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Módulo no encontrado
 */
router.get('/function_mod/:mod_id', authenticateToken, functionController.getFunctionsByModule);

module.exports = router;
