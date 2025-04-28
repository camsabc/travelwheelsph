/* Import statement for modules */
const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

/* Provides routing for content update functions */
router.get('/get-content/:id', contentController.getContent);
router.patch('/update-image', contentController.updateContentImage);
router.patch('/update-text', contentController.updateContentText);
router.patch('/update-all', contentController.updateAllContent);

module.exports = router;
