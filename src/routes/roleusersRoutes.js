const express = require('express');
const router = express.Router();
const roleUserController = require('../controllers/roleUserController');


router.get('/role-users', roleUserController.getAllRoleUsers);
router.post('/role-users', roleUserController.createRoleUser);
router.get('/role-users/:id', roleUserController.getRoleUserById);
router.put('/role-users/:id', roleUserController.updateRoleUser);
router.delete('/role-users/:id', roleUserController.deleteRoleUser);

module.exports = router;
