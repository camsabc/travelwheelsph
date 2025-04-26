const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  inclusions: [{ type: String }],
  image: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Promo', promoSchema);
