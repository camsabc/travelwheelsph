const QuotationModel = require('../models/Quotation');

/* This function retrieves all quotations in the database */
const getAllQuotations = (req, res) => {
    QuotationModel.find({})
        .then(quotations => res.json(quotations))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch quotations' });
        });
};

/* This function retrieves quotations using a unique email */
const getQuotationByEmail = (req, res) => {
    const email = req.params.email;

    QuotationModel.find({ email })
        .then(quotations => {
            if (quotations.length === 0) {
                return res.status(404).json({ error: 'No quotations found for this email' });
            }
            res.json(quotations);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch quotations by email' });
        });
};




const attachFile = async (req, res) => {
    const quotationId = req.params.id; 
    const { file } = req.body; 

    try {
        if (!file) {
            return res.status(400).json({ error: 'File is required' });
        }

        const updatedQuotation = await QuotationModel.findByIdAndUpdate(
            quotationId,
            { file },
            { new: true, runValidators: true } 
        );

        if (!updatedQuotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        res.json({ message: 'File attached successfully', quotation: updatedQuotation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to attach file' });
    }
};

const attachPayment = async (req, res) => {
    const quotationId = req.params.id; 
    const { payment } = req.body; 

    try {
        if (!payment) {
            return res.status(400).json({ error: 'File is required' });
        }

        const updatedQuotation = await QuotationModel.findByIdAndUpdate(
            quotationId,
            { payment },
            { new: true, runValidators: true } 
        );

        if (!updatedQuotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        res.json({ message: 'File attached successfully', quotation: updatedQuotation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to attach file' });
    }
};

const attachAr = async (req, res) => {
    const quotationId = req.params.id; 
    const { ar } = req.body; 

    try {
        if (!ar) {
            return res.status(400).json({ error: 'File is required' });
        }

        const updatedQuotation = await QuotationModel.findByIdAndUpdate(
            quotationId,
            { ar },
            { new: true, runValidators: true } 
        );

        if (!updatedQuotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        res.json({ message: 'File attached successfully', quotation: updatedQuotation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to attach file' });
    }
};





/* This function creates a quotation to be stored in the database */
const createQuotation = (req, res) => {
    const {
        firstname,
        middlename,
        lastname,
        email,
        contactNumber,
        startDate,
        endDate,
        pickupLocation,
        dropOffLocation,
        pickupTime,
        pickupDate,
        dropoffTime,
        dropoffDate,
        airportDeparture,
        airportArrival,
        preferredHotel,
        budgetRange,
        pickuploc,
        dropoffloc,
        companyname,
        contactperson,
        companyaddress,
        numOfPerson,
        vehicleName,
        remarks,
        status,
        gender,
        civilStatus,
        birthDate,
        countryBirth,
        provinceBirth,
        municipalityBirth,  
        firstnameFather,
        middlenameFather,
        lastnameFather,
        countryCitizenshipFather,
        firstnameMother,
        middlenameMother,
        lastnameMother,
        countryCitizenshipMother,
        firstnameSpouse,
        middlenameSpouse,
        lastnameSpouse,   
        applicationType, 
        oldPassportNumber,
        dateIssued,
        issuingAuthority,
        foreignPassportHolder,
        emergencyContactPerson,
        contactNumberForeign,
        province,
        city,
        occupation,
        officeNumber,
        officeDetails,
        fullAddress,
        landmark,
        passengers,
        disabled,
        num,
        type,
        db,
        file,
        payment
    } = req.body;

    /* Generates a random nine-digit number */
    const generateRandomNumber = () => Math.floor(100000000 + Math.random() * 900000000);

    const newQuotation = new QuotationModel({
        firstname,
        middlename,
        lastname,
        email,
        contactNumber,
        startDate,
        endDate,
        pickupTime,
        pickupDate,
        dropoffTime,
        dropoffDate,
        pickupLocation,
        dropOffLocation,
        airportDeparture,
        airportArrival,
        preferredHotel,
        budgetRange,
        pickuploc,
        dropoffloc,
        companyname,
        contactperson,
        companyaddress,
        numOfPerson,
        vehicleName,
        remarks,
        status,
        gender,
        civilStatus,
        birthDate,
        countryBirth,
        provinceBirth,
        municipalityBirth,  
        firstnameFather,
        middlenameFather,
        lastnameFather,
        countryCitizenshipFather,
        firstnameMother,
        middlenameMother,
        lastnameMother,
        countryCitizenshipMother,
        firstnameSpouse,
        middlenameSpouse,
        lastnameSpouse,   
        applicationType, 
        oldPassportNumber,
        dateIssued,
        issuingAuthority,
        foreignPassportHolder,
        emergencyContactPerson,
        contactNumberForeign,
        province,
        city,
        occupation,
        officeNumber,
        officeDetails,
        fullAddress,
        passengers,
        landmark,
        num: generateRandomNumber(), 
        type,
        disabled: 'false',
        db: 'quotation',
        file,
        payment
    });

    newQuotation.save()
        .then(savedQuotation => res.status(201).json(savedQuotation))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to create quotation' });
        });
};

/* This function retrieves one quotation using a unique id */
const getQuotationById = (req, res) => {
    const id = req.params.id;

    QuotationModel.findById(id)
        .then(quotation => {
            if (!quotation) {
                return res.status(404).json({ error: 'Quotation not found' });
            }
            res.json(quotation);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch quotation by ID' });
        });
};

/* Changes the status of a particular quotation using unique id */
const changeStatus = (req, res) => {
    const { quotationId, status } = req.body;

    console.log(status)

    QuotationModel.findByIdAndUpdate(quotationId, { status }, { new: true })
        .then(updatedQuotation => {
            if (!updatedQuotation) {
                return res.status(404).json({ error: 'BookQuotationing not found' });
            }
            res.json(updatedQuotation);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to change status' });
        });
};

/* Changes the activity of a particular quotation using unique id */
const toggleQuotation = (req, res) => {
    const { quotationId, disabled } = req.body;


    QuotationModel.findByIdAndUpdate(quotationId, { disabled }, { new: true })
        .then(updatedQuotation => {
            if (!updatedQuotation) {
                return res.status(404).json({ error: 'Quotation not found' });
            }
            res.json(updatedQuotation);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to change status' });
        });
};

module.exports = {
    getAllQuotations,
    getQuotationByEmail,
    createQuotation,
    getQuotationById,
    changeStatus,
    attachFile,
    attachPayment,
    toggleQuotation,
    attachAr
};
