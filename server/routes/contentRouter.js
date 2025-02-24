/* Import statement for modules */
const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

/* Provides routing for content update functions */
router.patch('/update-image', contentController.setImage);
router.patch('/update-text', contentController.updateText);
router.get('/get-content/:id', contentController.getContentById);

module.exports = router;
