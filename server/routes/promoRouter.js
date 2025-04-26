/* Import statement for modules */
const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');

// GET routes
router.get('/all', promoController.getAllPromos);
router.get('/get-promo-by-id/:id', promoController.getPromoById);
router.get('/active', promoController.getActivePromos);

// POST routes 
router.post('/create', promoController.createPromo);
router.post('/add', promoController.createPromo);

// PUT routes
router.put('/update/:id', promoController.updatePromo);
router.put('/status/:id', promoController.updatePromoStatus);
router.put('/update-image/:id', promoController.updateImage);

// DELETE routes
router.delete('/delete/:id', promoController.deletePromo);
router.delete('/:id', promoController.deletePromo);

module.exports = router;
