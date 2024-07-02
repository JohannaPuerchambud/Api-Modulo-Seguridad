const express = require('express');
const router = express.Router();
const roleUserController = require('../controllers/roleUserController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Asegúrate de tener esta autenticación en middleware



router.get('/role_users', roleUserController.getAllRoleUsers);
router.post('/role_users', roleUserController.createRoleUser);
router.get('/role_users/:id', roleUserController.getRoleUserById);
router.put('/role_users/:id', roleUserController.updateRoleUser);
router.delete('/role_users/:id', roleUserController.deleteRoleUser);
router.get('/role_users/user/:rol_usr_user', authenticateToken, roleUserController.getRoleUserByUser);

module.exports = router;
