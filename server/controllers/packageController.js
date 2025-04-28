const Package = require('../models/Package');

const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
};

const getPackageById = async (req, res) => {
  try {
    const pack = await Package.findById(req.params.id);
    if (!pack) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(pack);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch package' });
  }
};

const createPackage = async (req, res) => {
  try {
    const pack = new Package(req.body);
    await pack.save();
    res.status(201).json(pack);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create package' });
  }
};

const updatePackage = async (req, res) => {
  try {
    const pack = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pack) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(pack);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update package' });
  }
};

const deletePackage = async (req, res) => {
  try {
    const pack = await Package.findByIdAndDelete(req.params.id);
    if (!pack) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete package' });
  }
};

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
};
