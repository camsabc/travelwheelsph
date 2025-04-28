/* Import statement for modules */
const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

/* Provides routing for the ride functions */
router.get('/get-all-packs', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching packages' });
  }
});

router.get('/get-pack-by-id/:id', async (req, res) => {
  try {
    const pack = await Package.findById(req.params.id);
    if (!pack) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(pack);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching package' });
  }
});

router.post('/add-pack', async (req, res) => {
  try {
    const pack = new Package(req.body);
    await pack.save();
    res.status(201).json(pack);
  } catch (error) {
    res.status(500).json({ error: 'Error creating package' });
  }
});

router.put('/update-pack/:id', async (req, res) => {
  try {
    const pack = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!pack) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(pack);
  } catch (error) {
    res.status(500).json({ error: 'Error updating package' });
  }
});

router.delete('/delete-pack/:id', async (req, res) => {
  try {
    const pack = await Package.findByIdAndDelete(req.params.id);
    if (!pack) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting package' });
  }
});

module.exports = router;
