const mongoose = require('mongoose');

const DeactSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: false
    }
});

const DeactModel = mongoose.model('Deact', DeactSchema);

module.exports = DeactModel;
