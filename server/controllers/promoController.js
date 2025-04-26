const Promo = require('../models/Promo');

// Get all promos
exports.getAllPromos = async (req, res) => {
  try {
    const promos = await Promo.find();
    res.status(200).json(promos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching promos' });
  }
};

// Get single promo by ID
exports.getPromoById = async (req, res) => {
  try {
    const promo = await Promo.findById(req.params.id);
    if (!promo) {
      return res.status(404).json({ error: 'Promo not found' });
    }
    res.status(200).json(promo);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching promo' });
  }
};

// Get active promos
exports.getActivePromos = async (req, res) => {
  try {
    const promos = await Promo.find({ status: 'active' });
    res.status(200).json(promos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching active promos' });
  }
};

// Create new promo
exports.createPromo = async (req, res) => {
  try {
    const promo = new Promo(req.body);
    await promo.save();
    res.status(201).json(promo);
  } catch (error) {
    res.status(500).json({ error: 'Error creating promo' });
  }
};

// Add new promo
exports.addPromo = async (req, res) => {
  try {
    const { name, description, price, duration, inclusions, image, startDate, endDate } = req.body;
    
    const newPromo = new Promo({
      name,
      description,
      price,
      duration,
      inclusions: inclusions.split(',').map(item => item.trim()),
      image,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: 'active'
    });

    await newPromo.save();
    res.status(201).json(newPromo);
  } catch (error) {
    res.status(500).json({ error: 'Error adding new promo' });
  }
};

// Update promo
exports.updatePromo = async (req, res) => {
  try {
    const promo = await Promo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!promo) {
      return res.status(404).json({ error: 'Promo not found' });
    }
    res.status(200).json(promo);
  } catch (error) {
    res.status(500).json({ error: 'Error updating promo' });
  }
};

// Update promo image
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const updatedPromo = await Promo.findByIdAndUpdate(
      id,
      { image },
      { new: true }
    );

    if (!updatedPromo) {
      return res.status(404).json({ error: 'Promo not found' });
    }

    res.status(200).json(updatedPromo);
  } catch (error) {
    res.status(500).json({ error: 'Error updating promo image' });
  }
};

// Update promo status
exports.updatePromoStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const promo = await Promo.findByIdAndUpdate(
      req.params.id, 
      { status },
      { new: true }
    );
    if (!promo) {
      return res.status(404).json({ error: 'Promo not found' });
    }
    res.status(200).json(promo);
  } catch (error) {
    res.status(500).json({ error: 'Error updating promo status' });
  }
};

// Delete promo
exports.deletePromo = async (req, res) => {
  try {
    const promo = await Promo.findByIdAndDelete(req.params.id);
    if (!promo) {
      return res.status(404).json({ error: 'Promo not found' });
    }
    res.status(200).json({ message: 'Promo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting promo' });
  }
};
