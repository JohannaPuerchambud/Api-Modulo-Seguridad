const express = require('express');
const router = express.Router();
const roleUserController = require('../controllers/roleUserController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Asegúrate de tener esta autenticación en middleware

/**
 * @swagger
 * tags:
 *   name: RoleUsers
 *   description: Operaciones relacionadas con la asignación de roles a usuarios
 */

/**
 * @swagger
 * /api/role_users:
 *   get:
 *     summary: Obtiene todas las asignaciones de roles a usuarios
 *     tags: [RoleUsers]
 *     responses:
 *       '200':
 *         description: Lista de asignaciones obtenida exitosamente
 */
router.get('/role_users', roleUserController.getAllRoleUsers);

/**
 * @swagger
 * /api/role_users:
 *   post:
 *     summary: Crea una nueva asignación de rol a usuario
 *     tags: [RoleUsers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             example:
 *               role_id: 12345
 *               user_id: 67890
 *     responses:
 *       '201':
 *         description: Asignación de rol creada exitosamente
 *       '400':
 *         description: Error en la solicitud
 */
router.post('/role_users', roleUserController.createRoleUser);

/**
 * @swagger
 * /api/role_users/{id}:
 *   get:
 *     summary: Obtiene una asignación de rol a usuario por su ID
 *     tags: [RoleUsers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asignación a obtener
 *     responses:
 *       '200':
 *         description: Asignación obtenida exitosamente
 *       '404':
 *         description: Asignación no encontrada
 */
router.get('/role_users/:id', roleUserController.getRoleUserById);

/**
 * @swagger
 * /api/role_users/{id}:
 *   put:
 *     summary: Actualiza una asignación de rol a usuario por su ID
 *     tags: [RoleUsers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asignación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             example:
 *               role_id: 54321
 *               user_id: 09876
 *     responses:
 *       '200':
 *         description: Asignación de rol actualizada exitosamente
 *       '400':
 *         description: Error en la solicitud
 *       '404':
 *         description: Asignación no encontrada
 */
router.put('/role_users/:id', roleUserController.updateRoleUser);

/**
 * @swagger
 * /api/role_users/{id}:
 *   delete:
 *     summary: Elimina una asignación de rol a usuario por su ID
 *     tags: [RoleUsers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asignación a eliminar
 *     responses:
 *       '204':
 *         description: Asignación de rol eliminada exitosamente
 *       '404':
 *         description: Asignación no encontrada
 */
router.delete('/role_users/:id', roleUserController.deleteRoleUser);

/**
 * @swagger
 * /api/role_users/user/{rol_usr_user}:
 *   get:
 *     summary: Obtiene todas las asignaciones de rol de un usuario
 *     tags: [RoleUsers]
 *     parameters:
 *       - in: path
 *         name: rol_usr_user
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario del cual obtener las asignaciones de rol
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de asignaciones obtenida exitosamente
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Usuario no encontrado o sin asignaciones de rol
 */
router.get('/role_users/user/:rol_usr_user', authenticateToken, roleUserController.getRoleUserByUser);

module.exports = router;
