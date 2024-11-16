/* Import statement for modules */
const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');

/* Provides routing for the booking functions */
router.get('/get-all-inquiries', inquiryController.getAllInquiries);
router.get('/get-all-inquiries-by-email/:email', inquiryController.getInquiryByEmail);
router.post('/create-inquiry', inquiryController.createInquiry);
router.post('/change-status', inquiryController.changeStatus);
router.post('/update-note', inquiryController.updateNote);


module.exports = router;
