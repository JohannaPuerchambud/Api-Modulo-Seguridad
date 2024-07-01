// src/routes/functionRoutes.js
const express = require('express');
const functionController = require('../controllers/functionController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/functions', functionController.getFunctions);
router.get('/functions/:id', functionController.getFunction);
router.post('/functions', functionController.createFunction);
router.put('/functions/:id', functionController.updateFunction);
router.delete('/functions/:id', functionController.deleteFunction);
router.get('/function_mod/:mod_id', authenticateToken, functionController.getFunctionsByModule);


module.exports = router;
