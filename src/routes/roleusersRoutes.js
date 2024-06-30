const express = require('express');
const router = express.Router();
const roleUserController = require('../controllers/roleUserController');


router.get('/role_users', roleUserController.getAllRoleUsers);
router.post('/role_users', roleUserController.createRoleUser);
router.get('/role_users/:id', roleUserController.getRoleUserById);
router.put('/role_users/:id', roleUserController.updateRoleUser);
router.delete('/role_users/:id', roleUserController.deleteRoleUser);

module.exports = router;
