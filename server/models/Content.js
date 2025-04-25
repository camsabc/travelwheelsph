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
    promoImage4: {
        type: String,
        required: false
    },
    promoLocationText1: {
        type: String,
        required: false
    },
    promoLocationText2: {
        type: String,
        required: false
    },
    promoLocationText3: {
        type: String,
        required: false
    },
    promoLocationText4: {
        type: String,
        required: false
    },
    promoText1: {
        type: String,
        required: false
    },
    promoText2: {
        type: String,
        required: false
    },
    promoText3: {
        type: String,
        required: false
    },
    promoText4: {
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



    aboutText1: {
        type: String,
        required: false
    },
    aboutText2: {
        type: String,
        required: false
    },
    aboutText3: {
        type: String,
        required: false
    },
    aboutImage: {
        type: String,
        required: false
    },



    contactNumber1: {
        type: String,
        required: false
    },
    contactNumber2: {
        type: String,
        required: false
    },
    contactNumber3: {
        type: String,
        required: false
    },
    contactEmail: {
        type: String,
        required: false
    },
    contactFB: {
        type: String,
        required: false
    },
    contactIG: {
        type: String,
        required: false
    },
    contactAddress: {
        type: String,
        required: false
    },
    contactImage: {
        type: String,
        required: false
    },



    editProfileWarning: {
        type: String,
        required: false
    },



    paymentPaypalNumber: {
        type: String,
        required: false
    },
    paymentPaypalQrImage: {
        type: String,
        required: false
    },
    paymentGcashNumber: {
        type: String,
        required: false
    },
    paymentGcashQrImage: {
        type: String,
        required: false
    },
    paymentMayaNumber: {
        type: String,
        required: false
    },
    paymentMayaQrImage: {
        type: String,
        required: false
    },



    paymentMainText: {
        type: String,
        required: false
    },
    paymentSubText: {
        type: String,
        required: false
    },


    stepOneText: {
        type: String,
        required: false
    },
    stepTwoText: {
        type: String,
        required: false
    },
    stepThreeText: {
        type: String,
        required: false
    },
    passportSubtitle: {
        type: String,
        required: false
    },
    passportImage: {
        type: String,
        required: false
    },



    flightNoteText: {
        type: String,
        required: false
    },
    flightImage: {
        type: String,
        required: false
    },



    insuranceNoteText: {
        type: String,
        required: false
    },
    insuranceImage: {
        type: String,
        required: false
    },




    miceSubtitle: {
        type: String,
        required: false
    },
    miceImage: {
        type: String,
        required: false
    },




    transferImage: {
        type: String,
        required: false
    },




    visaNote1: {
        type: String,
        required: false
    },
    visaNote2: {
        type: String,
        required: false
    },
    visaImage: {
        type: String,
        required: false
    },


    educImage1: {
        type: String,
        required: false
    },
    educImage2: {
        type: String,
        required: false
    },
    educImage3: {
        type: String,
        required: false
    },
    educBackgroundImage: {
        type: String,
        required: false
    },
});

const ContentModel = mongoose.model('Content', ContentSchema);

module.exports = ContentModel;
