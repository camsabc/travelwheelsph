/* Import statement for modules */
const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotation');

/* Provides routing for the quotation functions */
router.get('/get-all-quotations', async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quotations' });
  }
});

router.get('/get-quotation-by-id/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.status(200).json(quotation);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quotation' });
  }
});

router.post('/create-quotation', async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.status(201).json(quotation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating quotation' });
  }
});

router.put('/update-quotation/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.status(200).json(quotation);
  } catch (error) {
    res.status(500).json({ error: 'Error updating quotation' });
  }
});

router.delete('/delete-quotation/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.status(200).json({ message: 'Quotation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting quotation' });
  }
});

module.exports = router;
