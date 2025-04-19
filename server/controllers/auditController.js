const AuditModel = require('../models/Audit');

/* This function retrieves all feedbacks in the database */
const getAllAudits = (req, res) => {
    AuditModel.find({})
        .then(audits => res.json(audits))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch audits' });
        });
};


const createAudit = async (req, res) => {
    try {
      const { firstname, lastname, action } = req.body;
  
      // Validate required fields
      if (!firstname || !lastname || !action) {
        return res.status(400).json({ error: 'Firstname, lastname, and action are required.' });
      }
  
      const newAudit = new AuditModel({
        firstname,
        lastname,
        action
        // timestamp will auto-generate if your schema uses timestamps
      });
  
      const savedAudit = await newAudit.save();
      res.status(201).json(savedAudit);
    } catch (err) {
      console.error('Error creating audit:', err);
      res.status(500).json({ error: 'Failed to create audit' });
    }
};
  
module.exports = {
    getAllAudits,
    createAudit
};
