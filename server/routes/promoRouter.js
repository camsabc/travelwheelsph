/* Import statement for modules */
const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');

/* Provides routing for the ride functions */
router.get('/get-all-promos', promoController.getAllPromos);
router.get('/get-promo-by-id/:id', promoController.getPromoById);

module.exports = router;
