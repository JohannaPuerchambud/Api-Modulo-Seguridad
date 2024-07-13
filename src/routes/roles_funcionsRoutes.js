const express = require('express');
const router = express.Router();
const roleFunctionController = require('../controllers/roles_funcionsController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: RoleFunctions
 *   description: Operaciones relacionadas con la asignación de funciones a roles
 */

/**
 * @swagger
 * /api/role_functions:
 *   get:
 *     summary: Obtiene todas las asignaciones de funciones a roles
 *     tags: [RoleFunctions]
 *     responses:
 *       '200':
 *         description: Lista de asignaciones obtenida exitosamente
 */
router.get('/role_functions', roleFunctionController.getRoleFunctions);

/**
 * @swagger
 * /api/role_functions:
 *   post:
 *     summary: Crea una nueva asignación de función a rol
 *     tags: [RoleFunctions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                 type: string
 *               function_id:
 *                 type: string
 *             example:
 *               role_id: 12345
 *               function_id: 67890
 *     responses:
 *       '201':
 *         description: Asignación de función a rol creada exitosamente
 *       '400':
 *         description: Error en la solicitud
 */
router.post('/role_functions', roleFunctionController.createRoleFunction);

/**
 * @swagger
 * /api/role_functions/{rol_func_id}:
 *   get:
 *     summary: Obtiene una asignación de función a rol por su ID
 *     tags: [RoleFunctions]
 *     parameters:
 *       - in: path
 *         name: rol_func_id
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
router.get('/role_functions/:rol_func_id', roleFunctionController.getRoleFunctionById);

/**
 * @swagger
 * /api/role_functions/{rol_func_id}:
 *   put:
 *     summary: Actualiza una asignación de función a rol por su ID
 *     tags: [RoleFunctions]
 *     parameters:
 *       - in: path
 *         name: rol_func_id
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
 *               function_id:
 *                 type: string
 *             example:
 *               role_id: 54321
 *               function_id: 09876
 *     responses:
 *       '200':
 *         description: Asignación de función a rol actualizada exitosamente
 *       '400':
 *         description: Error en la solicitud
 *       '404':
 *         description: Asignación no encontrada
 */
router.put('/role_functions/:rol_func_id', roleFunctionController.updateRoleFunction);

/**
 * @swagger
 * /api/role_functions/{rol_func_id}:
 *   delete:
 *     summary: Elimina una asignación de función a rol por su ID
 *     tags: [RoleFunctions]
 *     parameters:
 *       - in: path
 *         name: rol_func_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asignación a eliminar
 *     responses:
 *       '204':
 *         description: Asignación de función a rol eliminada exitosamente
 *       '404':
 *         description: Asignación no encontrada
 */
router.delete('/role_functions/:rol_func_id', roleFunctionController.deleteRoleFunction);

/**
 * @swagger
 * /api/role_function/role/{rol_func_role}:
 *   get:
 *     summary: Obtiene todas las asignaciones de función de un rol
 *     tags: [RoleFunctions]
 *     parameters:
 *       - in: path
 *         name: rol_func_role
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol del cual obtener las asignaciones de función
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de asignaciones obtenida exitosamente
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Rol no encontrado o sin asignaciones de función
 */
router.get('/role_function/role/:rol_func_role', authenticateToken, roleFunctionController.getRoleFunctionsByRole);

module.exports = router;
