import axios from 'axios';
import React, { useState } from 'react';
import './AddInventoryForm.css';
import { FaPlus } from 'react-icons/fa';

const AddInventoryForm = ({ apiUrl = '/api/inventory', showAlerts = false }) => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(apiUrl, { item, quantity });
      console.log('Inventory item added:', response.data);
      if (showAlerts) {
        alert('Inventory item added successfully!');
      }
      // Clear the form
      setItem('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding inventory:', error);
      if (showAlerts) {
        alert('Failed to add inventory. Please check the console for details.');
      }
    }
  };

  return (
    <form className="add-inventory-form" onSubmit={handleSubmit}>
        <div className="icon">
        <FaPlus /> {/* Icon for the form */}
      </div>
      <label>
        Item:
        <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
      </label>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>
      <button type="submit">Add Inventory Item</button>
    </form>
  );
};

export default AddInventoryForm;
