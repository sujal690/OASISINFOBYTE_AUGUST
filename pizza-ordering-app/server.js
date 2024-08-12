const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const pizzaRoutes = require('./routes/pizzas');
const inventoryRoutes = require('./routes/inventory'); // Import the inventory routes
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('./models/Order'); // Import the Order model
const orderRoutes = require('./routes/orders');
const forgotPasswordRouter = require('./routes/forgotPassword'); // Adjust path as necessary
const customOrders = require('./routes/customOrders');
const adminRoutes = require('./routes/admin');
const admin1 = require('./routes/admin');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/admin/inventory', inventoryRoutes);
app.use('/api/admin/orders', orderRoutes);
app.use('/api/auth1', forgotPasswordRouter);
app.use('/api/orders', orderRoutes); // Existing orders route
app.use('/api/custom-orders', customOrders); // New custom pizza orders route
app.use('/api/admin', adminRoutes);

// Serve the frontend in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}


app.post('/api/payment/orders', async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    const options = {
      amount: req.body.amount , // Amount in paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    console.log('Mock Order:', options);

    // Create a mock order
    const mockOrder = {
      id: crypto.randomBytes(10).toString('hex'),
      amount: options.amount,
      currency: options.currency,
      receipt: options.receipt,
      status: 'created',
    };

    // Save the order to the database
    const newOrder = new Order({
      orderId: mockOrder.id, // Use custom orderId
      amount: mockOrder.amount,
      currency: mockOrder.currency,
      receipt: mockOrder.receipt,
      status: mockOrder.status,
    });

    await newOrder.save();

    res.json(mockOrder);
  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ error: error.message });
  }
});



// server.js

app.post('/api/payment/confirm', async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order by custom orderId (string format)
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order status
    order.status = 'completed'; // Update status as needed
    await order.save();

    res.json({ message: 'Order confirmed', order });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ error: error.message });
  }
});





app.use('/api/inventory', inventoryRoutes); // Use the inventory routes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
