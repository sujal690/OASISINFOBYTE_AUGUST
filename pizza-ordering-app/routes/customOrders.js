// routes/customOrders.js
const express = require('express');
const CustomOrder = require('../models/CustomOrder');
const router = express.Router();

// Create a new custom pizza order
router.post('/', async (req, res) => {
    const { base, sauce, cheese, veggies } = req.body;

    try {
        const newOrder = new CustomOrder({
            base,
            sauce,
            cheese,
            veggies,
            status: 'pending'
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating custom pizza order:', error);
        res.status(500).json({ message: 'Error creating custom pizza order' });
    }
});

module.exports = router;
