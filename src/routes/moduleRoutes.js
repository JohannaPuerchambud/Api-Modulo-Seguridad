const express = require('express');
const moduleController = require('../controllers/moduleController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Operaciones relacionadas con módulos del sistema
 */

/**
 * @swagger
 * /api/modules:
 *   get:
 *     summary: Obtiene todos los módulos
 *     tags: [Modules]
 *     responses:
 *       '200':
 *         description: Lista de módulos obtenida exitosamente
 */
router.get('/modules', moduleController.getModules);

/**
 * @swagger
 * /api/modules/{id}:
 *   get:
 *     summary: Obtiene un módulo por su ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del módulo a obtener
 *     responses:
 *       '200':
 *         description: Módulo obtenido exitosamente
 *       '404':
 *         description: Módulo no encontrado
 */
router.get('/modules/:id', moduleController.getModuleById);

/**
 * @swagger
 * /api/modules:
 *   post:
 *     summary: Crea un nuevo módulo
 *     tags: [Modules]
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
 *               name: Gestión de usuarios
 *     responses:
 *       '201':
 *         description: Módulo creado exitosamente
 *       '400':
 *         description: Error en la solicitud
 */
router.post('/modules', moduleController.createModule);

/**
 * @swagger
 * /api/modules/{id}:
 *   put:
 *     summary: Actualiza un módulo por su ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del módulo a actualizar
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
 *               name: Gestión de roles
 *     responses:
 *       '200':
 *         description: Módulo actualizado exitosamente
 *       '400':
 *         description: Error en la solicitud
 *       '404':
 *         description: Módulo no encontrado
 */
router.put('/modules/:id', moduleController.updateModule);

/**
 * @swagger
 * /api/modules/{id}:
 *   delete:
 *     summary: Elimina un módulo por su ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del módulo a eliminar
 *     responses:
 *       '204':
 *         description: Módulo eliminado exitosamente
 *       '404':
 *         description: Módulo no encontrado
 */
router.delete('/modules/:id', moduleController.deleteModule);

module.exports = router;
