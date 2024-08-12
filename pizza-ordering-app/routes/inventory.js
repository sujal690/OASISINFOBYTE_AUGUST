// routes/inventory.js
const express = require('express');
const Inventory = require('../models/Inventory');
const router = express.Router();

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new inventory item
router.post('/', async (req, res) => {
  const { item, quantity } = req.body;
  const newItem = new Inventory({ item, quantity });
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update inventory item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const item = await Inventory.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.quantity = quantity;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Inventory.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting inventory item:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
