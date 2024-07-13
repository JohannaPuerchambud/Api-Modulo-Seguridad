const express = require('express');
const router = express.Router();
const roleController = require('../controllers/rolesController');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Operaciones relacionadas con roles de usuario
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene todos los roles
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: Lista de roles obtenida exitosamente
 */
router.get('/roles', roleController.getRoles);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Roles]
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
 *               name: admin
 *     responses:
 *       '201':
 *         description: Rol creado exitosamente
 *       '400':
 *         description: Error en la solicitud
 */
router.post('/roles', roleController.createRole);

/**
 * @swagger
 * /api/roles/{rol_id}:
 *   get:
 *     summary: Obtiene un rol por su ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: rol_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol a obtener
 *     responses:
 *       '200':
 *         description: Rol obtenido exitosamente
 *       '404':
 *         description: Rol no encontrado
 */
router.get('/roles/:rol_id', roleController.getRoleById);

/**
 * @swagger
 * /api/roles/{rol_id}:
 *   put:
 *     summary: Actualiza un rol por su ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: rol_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol a actualizar
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
 *               name: moderator
 *     responses:
 *       '200':
 *         description: Rol actualizado exitosamente
 *       '400':
 *         description: Error en la solicitud
 *       '404':
 *         description: Rol no encontrado
 */
router.put('/roles/:rol_id', roleController.updateRole);

/**
 * @swagger
 * /api/roles/{rol_id}:
 *   delete:
 *     summary: Elimina un rol por su ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: rol_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol a eliminar
 *     responses:
 *       '204':
 *         description: Rol eliminado exitosamente
 *       '404':
 *         description: Rol no encontrado
 */
router.delete('/roles/:rol_id', roleController.deleteRole);

module.exports = router;
