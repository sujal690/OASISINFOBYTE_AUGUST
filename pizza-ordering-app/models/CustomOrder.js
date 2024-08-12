// models/CustomOrder.js
const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema({
    base: { type: String, required: true },
    sauce: { type: String, required: true },
    cheese: { type: String, required: true },
    veggies: { type: [String], required: true },
    status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' }
});

const CustomOrder = mongoose.model('CustomOrder', customOrderSchema);

module.exports = CustomOrder;
