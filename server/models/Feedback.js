const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    service: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    remarkLike: {
        type: String,
        required: false
    },
    remarkImprove: {
        type: String,
        required: false
    },
    reco: {
        type: String,
        required: false
    },
    rateDate: {
        type: Date,
        required: false
    },
    rateBookingExperience: {
        type: Number,
        min: 1,
        max: 5
    },
    rateCustomerService: {
        type: Number,
        min: 1,
        max: 5,
        required: false
    },
    ratePricing: {
        type: Number,
        min: 1,
        max: 5,
        required: false
    },
    rateOverallExperience: {
        type: Number,
        min: 1,
        max: 5,
        required: false
    }
});

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);

module.exports = FeedbackModel;
