const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: false
    },
    lastname: {
      type: String,
      required: false
    },
    action: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true // auto-adds createdAt and updatedAt fields
  }
);

const AuditModel = mongoose.model('Audit', AuditSchema);

module.exports = AuditModel;
