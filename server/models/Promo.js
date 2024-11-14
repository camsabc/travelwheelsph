const mongoose = require('mongoose');

const PromoSchema = mongoose.Schema({
    num: {
        type: String,
        required: false
    },
    pics: {
        type: Number,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
});

const PromoModel = mongoose.model('Promo', PromoSchema);

module.exports = PromoModel;
