const InquiryModel = require('../models/Inquiry');

/* This function retrieves all quotations in the database */
const getAllInquiries = (req, res) => {
    InquiryModel.find({})
        .then(inquiries => res.json(inquiries))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch inquiries' });
        });
};

/* This function retrieves quotations using a unique email */
const getInquiryByEmail = (req, res) => {
    const email = req.params.email;

    InquiryModel.find({ email })
        .then(inquiries => {
            if (inquiries.length === 0) {
                return res.status(404).json({ error: 'No inquiries found for this email' });
            }
            res.json(inquiries);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch inquiries by email' });
        });
};

/* This function creates a new inquiry */
const createInquiry = (req, res) => {
    const { email,  message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: 'Email and message are required' });
    }

    const newInquiry = new InquiryModel({
        email,
        message,
        createdAt: new Date()
    });

    newInquiry.save()
        .then(inquiry => res.status(201).json(inquiry)) 
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to create inquiry' });
        });
};

module.exports = {
    getAllInquiries,
    getInquiryByEmail,
    createInquiry
};

