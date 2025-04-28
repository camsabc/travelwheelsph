const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  duration: String,
  num: String,
  pics: Number,
  type: {
    type: String,
    enum: ['domestic', 'international']
  },
  inclusions: [String],
  exclusions: [String],
  specialNotes: [String]
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
