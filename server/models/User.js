const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false
    },
    profileImage: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: false
    },
    contactNumber: {
        type: String,
        required: false
    },
    bday: {
        type: Date,
        required: false
    },
    serviceHandle: {
        type: String,
        required: false
    },
    accountStatus: {
        type: String,
        required: false
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
