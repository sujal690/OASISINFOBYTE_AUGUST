// src/components/UpdateInventory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBox, FaPen } from 'react-icons/fa'; // Importing icons
import './UpdateInventory.css'; // Importing the CSS file

const UpdateInventory = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    axios.get('/api/inventory')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/inventory/${selectedItem}`, { quantity });
      setQuantity('');
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  return (
    <div className="update-inventory">
      <h2><FaBox className="icon" /> Update Inventory Item</h2>
      <label>
        <FaPen className="label-icon" />
        Select Item:
        <select 
          value={selectedItem} 
          onChange={(e) => setSelectedItem(e.target.value)}
          className="select-input"
        >
          <option value="">Select item</option>
          {items.map(item => (
            <option key={item._id} value={item._id}>{item.item}</option>
          ))}
        </select>
      </label>
      <label>
        <FaPen className="label-icon" />
        New Quantity:
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          className="quantity-input"
        />
      </label>
      <button className="update-btn" onClick={handleUpdate}>Update Quantity</button>
    </div>
  );
};

export default UpdateInventory;
