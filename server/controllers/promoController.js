const PromoModel = require('../models/Promo');

/* This function retrieves all promos in the database */
const getAllPromos = (req, res) => {
    PromoModel.find({})
        .then(promos => res.json(promos))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch promos' });
        });
};


/* This function retrieves one promos using a unique id */
const getPromoById = (req, res) => {
    const { id } = req.params;

    PromoModel.findById(id)
        .then(promo => {
            if (!promo) {
                return res.status(404).json({ error: 'Promo not found' });
            }
            res.json(promo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch promo' });
        });
};

module.exports = {
    getAllPromos,
    getPromoById 
};
