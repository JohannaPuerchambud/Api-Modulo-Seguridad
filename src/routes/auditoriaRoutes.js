// routes/auditoriaRoutes.js

const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoriaController');

router.get('/auditoria', auditoriaController.getAuditoria);
router.post('/auditoria', auditoriaController.createAuditoria);
router.get('/auditoria/:aud_id', auditoriaController.getAuditoriaById);
router.delete('/auditoria/:aud_id', auditoriaController.deleteAuditoria);
router.put('/auditoria/:aud_id', auditoriaController.updateAuditoria);


module.exports = router;
