/* Import statement for modules */
const express = require('express');
const router = express.Router();
const deactController = require('../controllers/deactController');

/* Provides routing for the booking functions */
router.get('/get-all-deacts', deactController.getAllDeacts);
router.post('/add-deact', deactController.addDeact);
router.delete('/remove-deact/:email', deactController.removeDeact);


module.exports = router;
