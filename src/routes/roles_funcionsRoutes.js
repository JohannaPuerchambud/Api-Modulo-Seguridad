const express = require('express');
const router = express.Router();
const roleFunctionController = require('../controllers/roles_funcionsController');

// Definir rutas
router.get('/role-functions', roleFunctionController.getRoleFunctions);
router.post('/role-functions', roleFunctionController.createRoleFunction);
router.get('/role-functions/:rol_func_id', roleFunctionController.getRoleFunctionById);
router.put('/role-functions/:rol_func_id', roleFunctionController.updateRoleFunction);
router.delete('/role-functions/:rol_func_id', roleFunctionController.deleteRoleFunction);

module.exports = router;
