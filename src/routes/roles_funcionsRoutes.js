const express = require('express');
const router = express.Router();
const roleFunctionController = require('../controllers/roles_funcionsController');

// Definir rutas
router.get('/role_functions', roleFunctionController.getRoleFunctions);
router.post('/role_functions', roleFunctionController.createRoleFunction);
router.get('/role_functions/:rol_func_id', roleFunctionController.getRoleFunctionById);
router.put('/role_functions/:rol_func_id', roleFunctionController.updateRoleFunction);
router.delete('/role_functions/:rol_func_id', roleFunctionController.deleteRoleFunction);

module.exports = router;
