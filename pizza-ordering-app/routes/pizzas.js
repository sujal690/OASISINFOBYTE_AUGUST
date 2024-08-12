const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

// Route to fetch all pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to create a custom pizza
router.post('/custom', async (req, res) => {
  try {
    const { base, sauce, cheese, veggies } = req.body;

    // Check if all required fields are present
    if (!base || !sauce || !cheese || !veggies) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newPizza = new Pizza({
      name: `Custom Pizza - ${base}`, // Give a default name or customize it
      ingredients: [base, sauce, cheese, ...veggies],
      price: 10, // Default price, you can calculate based on ingredients
      imageUrl: 'custom-pizza.jpg', // Default image, you can change this
    });

    await newPizza.save();

    res.status(201).json({ message: 'Custom pizza created successfully!', pizza: newPizza });
  } catch (error) {
    console.error('Error creating custom pizza:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
