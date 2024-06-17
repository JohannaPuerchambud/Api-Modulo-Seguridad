const express = require('express');
const router = express.Router();
const roleController = require('../controllers/rolesController');

// Definir rutas
router.get('/roles', roleController.getRoles);
router.post('/roles', roleController.createRole);
router.get('/roles/:rol_id', roleController.getRoleById);
router.put('/roles/:rol_id', roleController.updateRole);
router.delete('/roles/:rol_id', roleController.deleteRole);

module.exports = router;

