// routes/orders.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Get all orders
// routes/orders.js
router.get('/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/orders', async (req, res) => {
  const { orderId, amount, currency, receipt, status, products } = req.body;
  const newOrder = new Order({ orderId, amount, currency, receipt, status, products });
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




module.exports = router;
