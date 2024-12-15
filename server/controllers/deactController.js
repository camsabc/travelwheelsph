const DeactModel = require('../models/Deact');

/* This function retrieves all bookings in the database */
const getAllDeacts = (req, res) => {
    DeactModel.find({})
        .then(deacts => res.json(deacts))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch deacts' });
        });
};

/* This function creates a booking to be stored in the database */
const addDeact = (req, res) => {
    const {
        email,
        date
    } = req.body;

    const newDeact = new DeactModel({
        email,
        date
    });

    newDeact.save()
        .then(savedDeact => res.status(201).json(savedDeact))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to create booking' });
        });
};


const removeDeact = async (req, res) => {
    const { email } = req.params;  // Expecting email in the URL parameter
  
    try {
      // Find and delete the Deact entry associated with the given email
      const removedDeact = await DeactModel.findOneAndDelete({ email });
  
      if (!removedDeact) {
        return res.status(404).json({ error: 'Deact entry not found for this email' });
      }
  
      res.status(200).json({ message: 'Deact entry deleted successfully' });
    } catch (err) {
      console.error('Error deleting deact:', err);
      res.status(500).json({ error: 'Failed to delete deact' });
    }
};

  





module.exports = {
    getAllDeacts,
    addDeact,
    removeDeact
};

