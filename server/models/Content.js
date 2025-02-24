const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    bannerImage1: {
        type: String,
        required: false
    },
    bannerImage2: {
        type: String,
        required: false
    },
    bannerImage3: {
        type: String,
        required: false
    },
    bannerText: {
        type: String,
        required: false
    },
    adventureImage1: {
        type: String,
        required: false
    },
    adventureImage2: {
        type: String,
        required: false
    },
    adventureImage3: {
        type: String,
        required: false
    },
    feedbackImage1: {
        type: String,
        required: false
    },
    feedbackImage2: {
        type: String,
        required: false
    },
    feedbackImage3: {
        type: String,
        required: false
    },




    promoTitle: {
        type: String,
        required: false
    },
    promoImage1: {
        type: String,
        required: false
    },
    promoImage2: {
        type: String,
        required: false
    },
    promoImage3: {
        type: String,
        required: false
    },
    promotText1: {
        type: String,
        required: false
    },
    promotText2: {
        type: String,
        required: false
    },
    promotText3: {
        type: String,
        required: false
    },

    question1: {
        type: String,
        required: false
    },
    question2: {
        type: String,
        required: false
    },
    question3: {
        type: String,
        required: false
    },
    question4: {
        type: String,
        required: false
    },
    answer1: {
        type: String,
        required: false
    },
    answer2: {
        type: String,
        required: false
    },
    answer3: {
        type: String,
        required: false
    },
    answer4: {
        type: String,
        required: false
    },

    domesticImage1: {
        type: String,
        required: false
    },
    domesticImage2: {
        type: String,
        required: false
    },
    domesticImage3: {
        type: String,
        required: false
    },
    internationalImage1: {
        type: String,
        required: false
    },
    internationalImage2: {
        type: String,
        required: false
    },
    internationalImage3: {
        type: String,
        required: false
    },

    subtitle: {
        type: String,
        required: false
    },
    backgroundImage: {
        type: String,
        required: false
    },

    rideImage1: {
        type: String,
        required: false
    },
    rideImage2: {
        type: String,
        required: false
    },
    rideImage3: {
        type: String,
        required: false
    },

});

const ContentModel = mongoose.model('Content', ContentSchema);

module.exports = ContentModel;
