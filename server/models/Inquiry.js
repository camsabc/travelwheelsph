const mongoose = require('mongoose');

const InquirySchema = mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    }
});

const InquiryModel = mongoose.model('Inquiry', InquirySchema);

module.exports = InquiryModel;
