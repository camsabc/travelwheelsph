/* Import statement for modules */
const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');

/* Provides routing for the booking functions */
router.get('/get-all-audits', auditController.getAllAudits);
router.post('/create-audit', auditController.createAudit);

module.exports = router;
