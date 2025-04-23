const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema(
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
    timestamps: true
  }
);

const AuditModel = mongoose.model('Audit', auditSchema);

module.exports = AuditModel;