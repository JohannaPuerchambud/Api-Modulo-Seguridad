const express = require('express');
const router = express.Router();
const roleFunctionController = require('../controllers/roles_funcionsController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Definir rutas
router.get('/role_functions', roleFunctionController.getRoleFunctions);
router.post('/role_functions', roleFunctionController.createRoleFunction);
router.get('/role_functions/:rol_func_id', roleFunctionController.getRoleFunctionById);
router.put('/role_functions/:rol_func_id', roleFunctionController.updateRoleFunction);
router.delete('/role_functions/:rol_func_id', roleFunctionController.deleteRoleFunction);
router.get('/role_function/role/:rol_func_role', authenticateToken, roleFunctionController.getRoleFunctionsByRole);
module.exports = router;
