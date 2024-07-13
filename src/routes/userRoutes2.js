const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  login,
  login_Modules,
  getCurrentUser,
  getCurrentUser2
} = require('../controllers/userController2');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users Login
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users Login]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de usuarios obtenida exitosamente
 */
router.get('/user', authenticateToken, getUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Users Login]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a obtener
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Usuario obtenido exitosamente
 *       '404':
 *         description: Usuario no encontrado
 */
router.get('/user/:id', authenticateToken, getUserById);

/**
 * @swagger
 * /api/user_email/{email}:
 *   get:
 *     summary: Obtiene un usuario por su correo electrónico
 *     tags: [Users Login]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo electrónico del usuario a obtener
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Usuario obtenido exitosamente
 *       '404':
 *         description: Usuario no encontrado
 */
router.get('/user_email/:email', authenticateToken, getUserByEmail);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users Login]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               password: password123
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente
 *       '400':
 *         description: Error en la solicitud
 */
router.post('/user', authenticateToken, createUser);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags: [Users Login]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe_updated
 *               password: newpassword123
 *     responses:
 *       '200':
 *         description: Usuario actualizado exitosamente
 *       '400':
 *         description: Error en la solicitud
 *       '404':
 *         description: Usuario no encontrado
 */
router.put('/user/:id', authenticateToken, updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Users Login]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Usuario eliminado exitosamente
 *       '404':
 *         description: Usuario no encontrado
 */
router.delete('/user/:id', authenticateToken, deleteUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Users Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               password: password123
 *     responses:
 *       '200':
 *         description: Sesión iniciada exitosamente
 *       '401':
 *         description: Credenciales incorrectas
 */
router.post('/login', login);

/**
 * @swagger
 * /api/login_module:
 *   post:
 *     summary: Inicia sesión de usuario en módulos
 *     tags: [Users Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               password: password123
 *     responses:
 *       '200':
 *         description: Sesión iniciada exitosamente
 *       '401':
 *         description: Credenciales incorrectas
 */
router.post('/login_module', login_Modules);

/**
 * @swagger
 * /api/myuser:
 *   get:
 *     summary: Obtiene el usuario actual
 *     tags: [Users Login]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Usuario obtenido exitosamente
 *       '401':
 *         description: No autorizado
 */
router.get('/myuser', authenticateToken, getCurrentUser2);

module.exports = router;
