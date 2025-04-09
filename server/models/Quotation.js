const mongoose = require('mongoose');

const QuotationSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    middlename: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    contactNumber: {
        type: Number,
        required: false
    },
    passengers: [{
        firstname: { type: String, required: false },
        lastname: { type: String, required: false },
        age: { type: Number, required: false },
        birthday: { type: Date, required: false },
    }],
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    pickupLocation: {
        type: String,
        required: false
    },
    dropOffLocation: {
        type: String,
        required: false
    },
    numOfPerson: {
        type: Number,
        required: false
    },
    vehicleName: {
        type: String,
        required: false
    },
    remarks: {
        type: String
    },
    status: {
        type: String
    },
    num: {
        type: Number
    },
    type: {
        type: String
    },
    db: {
        type: String
    },
    airportDeparture: {
        type: String,
        required: false
    },
    airportArrival: {
        type: String,
        required: false
    },
    preferredHotel: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    roomType: {
        type: String,
        required: false
    },
    budgetRange: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    civilStatus: {
        type: String,
        required: false
    },
    birthDate: {
        type: Date,
        required: false
    },
    countryBirth: {
        type: String,
        required: false
    },
    provinceBirth: {
        type: String,
        required: false
    },
    municipalityBirth: {
        type: String,
        required: false
    },
    firstnameFather: {
        type: String,
        required: false
    },
    middlenameFather: {
        type: String,
        required: false
    },
    lastnameFather: {
        type: String,
        required: false
    },
    countryCitizenshipFather: {
        type: String,
        required: false
    },
    firstnameMother: {
        type: String,
        required: false
    },
    middlenameMother: {
        type: String,
        required: false
    },
    lastnameMother: {
        type: String,
        required: false
    },
    countryCitizenshipMother: {
        type: String,
        required: false
    },
    firstnameSpouse: {
        type: String,
        required: false
    },
    middlenameSpouse: {
        type: String,
        required: false
    },
    lastnameSpouse: {
        type: String,
        required: false
    },
    applicationType: {
        type: String,
        required: false
    },
    oldPassportNumber: {
        type: String,
        required: false
    },
    dateIssued: {
        type: Date,
        required: false
    },
    issuingAuthority: {
        type: String,
        required: false
    },
    foreignPassportHolder: {
        type: String,
        required: false
    },
    emergencyContactPerson: {
        type: String,
        required: false
    },
    contactNumberForeign: {
        type: Number,
        required: false
    },
    province: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    officeNumber: {
        type: Number,
        required: false
    },
    officeDetails: {
        type: String,
        required: false
    },
    fullAddress: {
        type: String,
        required: false
    },
    landmark: {
        type: String,
        required: false
    },
    destination: {
        type: String,
        required: false
    },
    file: {
        type: String,
        required: false
    },
    payment: {
        type: String,
        required: false
    },
    pickupTime: {
        type: String,
        required: false
    },
    dropoffTime: {
        type: String,
        required: false
    },
    pickupDate: {
        type: Date,
        required: false
    },
    dropoffDate: {
        type: Date,
        required: false
    },
    disabled: {
        type: String,
        required: false
    },
    ar: {
        type: String,
        required: false
    },


    completeVisaForm: {
        type: String,
        required: false
    },
    origPass: {
        type: String,
        required: false
    },
    proofFunds: {
        type: String,
        required: false
    },
    idPic: {
        type: String,
        required: false
    },
    psaBirthCert: {
        type: String,
        required: false
    },
    latestItr: {
        type: String,
        required: false
    },


    businessReg: {
        type: String,
        required: false
    },
    bankStatement: {
        type: String,
        required: false
    },
    businessPermit: {
        type: String,
        required: false
    },
    recentItr: {
        type: String,
        required: false
    },


    employCert: {
        type: String,
        required: false
    },
    companyId: {
        type: String,
        required: false
    },
    itr: {
        type: String,
        required: false
    },

    
    schoolCert: {
        type: String,
        required: false
    },
    schoolId: {
        type: String,
        required: false
    },
    birthCert: {
        type: String,
        required: false
    },
    bankCert: {
        type: String,
        required: false
    },
});

const QuotationModel = mongoose.model('Quotation', QuotationSchema);

module.exports = QuotationModel;
