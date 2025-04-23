const AuditModel = require('../models/Audit');

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
  
      if (!firstname || !lastname || !action) {
        return res.status(400).json({ error: 'Firstname, lastname, and action are required.' });
      }
  
      const newAudit = new AuditModel({
        firstname,
        lastname,
        action
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
