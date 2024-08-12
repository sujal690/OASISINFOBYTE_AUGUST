// src/components/InventoryList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLeaf, FaTrashAlt } from 'react-icons/fa'; // Importing icons
import './InventoryList.css'; // Importing the CSS file

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/inventory');
        setInventory(response.data);
      } catch (error) {
        setError('Error fetching inventory');
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/inventory/${id}`);
      setInventory(inventory.filter(item => item._id !== id));
    } catch (error) {
      setError('Error removing inventory');
      console.error('Error removing inventory:', error);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="inventory-list">
      <h2><FaLeaf className="icon" /> Inventory List</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item._id}>
            <div className="item-details">
              <span className="item-name">{item.item}</span>
              <span className="item-quantity">Quantity: {item.quantity}</span>
            </div>
            <button className="remove-btn" onClick={() => handleRemove(item._id)}>
              <FaTrashAlt /> Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;

