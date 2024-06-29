const express = require('express');
const { getUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser, login, getCurrentUser } = require('../controllers/userController2');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/user', authenticateToken, getUsers);
router.get('/user/:id', authenticateToken, getUserById);
router.get('/user_email/:email', authenticateToken, getUserByEmail);
router.post('/user', authenticateToken, createUser);
router.put('/user/:id', authenticateToken, updateUser);
router.delete('/user/:id', authenticateToken, deleteUser);
router.post('/login', login);
router.get('/user/me', authenticateToken, getCurrentUser);

module.exports = router;
