/* Import statement for modules */
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

/* Provides routing for the booking functions */
router.get('/get-all-feedbacks', feedbackController.getAllFeedbacks);
router.get('/get-all-feedbacks-by-email/:email', feedbackController.getFeedbackByEmail);
router.post('/create-feedback', feedbackController.createFeedback);
router.get('/get-feedback-count-by-service', feedbackController.getFeedbackCountsByService);

module.exports = router;
