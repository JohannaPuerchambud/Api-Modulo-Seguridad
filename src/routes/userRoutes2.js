const express = require('express');
const { getUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser, login,login_Modules, getCurrentUser, getCurrentUser2 } = require('../controllers/userController2');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/user', authenticateToken, getUsers);
router.get('/user/:id', authenticateToken, getUserById);
router.get('/user_email/:email', authenticateToken, getUserByEmail);
router.post('/user', authenticateToken, createUser);
router.put('/user/:id', authenticateToken, updateUser);
router.delete('/user/:id', authenticateToken, deleteUser);
router.post('/login', login);

router.post('/login_module', login_Modules);
//router.get('/user/me/:id', authenticateToken, getCurrentUser);
router.get('/myuser', authenticateToken, getCurrentUser2);

module.exports = router;
