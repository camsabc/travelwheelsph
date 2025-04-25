const FeedbackModel = require('../models/Feedback');

/* This function retrieves all feedbacks in the database */
const getAllFeedbacks = (req, res) => {
    FeedbackModel.find({})
        .then(feedbacks => res.json(feedbacks))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch feedbacks' });
        });
};

/* This function retrieves feedbacks using a unique email */
const getFeedbackByEmail = (req, res) => {
    const email = req.params.email;

    FeedbackModel.find({ email })
        .then(feedbacks => {
            if (feedbacks.length === 0) {
                return res.status(404).json({ error: 'No feedbacks found for this email' });
            }
            res.json(feedbacks);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch feedbacks by email' });
        });
};
const createFeedback = async (req, res) => {
    try {
        const {
            name,
            service,
            duration,
            remarkLike,
            remarkImprove,
            reco,
            rateBookingExperience,
            rateCustomerService,
            ratePricing,
            rateOverallExperience,
            feedbackImage // new field for feedback image
        } = req.body;

        // Basic validation
        if (
            !name || !service || !duration || typeof rateBookingExperience !== 'number' ||
            typeof rateCustomerService !== 'number' || typeof ratePricing !== 'number' ||
            typeof rateOverallExperience !== 'number'
        ) {
            return res.status(400).json({ error: 'Missing or invalid required fields' });
        }

        const newFeedback = new FeedbackModel({
            name,
            service,
            duration,
            remarkLike: remarkLike || '',
            remarkImprove: remarkImprove || '',
            reco: reco || '',
            rateDate: new Date(),
            rateBookingExperience,
            rateCustomerService,
            ratePricing,
            rateOverallExperience,
            feedbackImage: feedbackImage || '' // safely set default if not provided
        });

        const feedback = await newFeedback.save();
        res.status(201).json({ message: 'Feedback created successfully', feedback });
    } catch (err) {
        console.error('Error creating feedback:', err);
        res.status(500).json({ error: 'An error occurred while creating feedback' });
    }
};


/* This function retrieves feedback counts grouped by service type */
const getFeedbackCountsByService = async (req, res) => {
    try {
        const feedbackCounts = await FeedbackModel.aggregate([
            {
                $group: {
                    _id: '$service',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format the aggregation result for easier client consumption.
        const formattedData = feedbackCounts.map(item => ({
            service: item._id,
            count: item.count
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching feedback counts:', error);
        res.status(500).json({ error: 'Failed to fetch feedback counts' });
    }
};

module.exports = {
    getAllFeedbacks,
    getFeedbackByEmail,
    createFeedback,
    getFeedbackCountsByService
};
