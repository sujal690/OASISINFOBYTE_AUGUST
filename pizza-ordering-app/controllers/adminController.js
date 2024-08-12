const Inventory = require('../models/Inventory');
const Order = require('../models/Order');

// Add or update inventory
exports.addOrUpdateInventory = async (req, res) => {
    try {
        const { id, name, type, quantity } = req.body;
        const inventory = id ? await Inventory.findByIdAndUpdate(id, { name, type, quantity }, { new: true }) :
                              await Inventory.create({ name, type, quantity });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove inventory
exports.removeInventory = async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Inventory item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
