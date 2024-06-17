// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Definir rutas
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.get('/users/:usr_id', userController.getUserById);
router.delete('/users/:usr_id', userController.deleteUserById);
router.put('/users/:usr_id', userController.updateUserById);

module.exports = router;
