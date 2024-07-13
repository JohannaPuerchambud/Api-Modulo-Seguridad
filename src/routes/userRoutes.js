const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Lista de usuarios obtenida exitosamente
 */
router.get('/users', userController.getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
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
router.post('/users', userController.createUser);

/**
 * @swagger
 * /api/users/{usr_id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: usr_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a obtener
 *     responses:
 *       '200':
 *         description: Usuario obtenido exitosamente
 *       '404':
 *         description: Usuario no encontrado
 */
router.get('/users/:usr_id', userController.getUserById);

/**
 * @swagger
 * /api/users/{usr_id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: usr_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       '204':
 *         description: Usuario eliminado exitosamente
 *       '404':
 *         description: Usuario no encontrado
 */
router.delete('/users/:usr_id', userController.deleteUserById);

/**
 * @swagger
 * /api/users/{usr_id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: usr_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
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
router.put('/users/:usr_id', userController.updateUserById);

module.exports = router;
