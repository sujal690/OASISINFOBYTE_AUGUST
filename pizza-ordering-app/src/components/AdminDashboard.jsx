// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddInventoryForm from './AddInventoryForm';
import InventoryList from './InventoryList';
import OrderList from './OrderList';
import UpdateInventory from './UpdateInventory';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/admin/check', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setAuth({ isAuthenticated: true, user: response.data.user });
        } else {
          setAuth({ isAuthenticated: false, user: null });
        }
      } catch (error) {
        console.error('Error fetching admin data:', error.response?.data?.message || error.message);
        setAuth({ isAuthenticated: false, user: null });
      }
    };
  
    fetchAuth();
  }, []);
  

  if (!auth.isAuthenticated) {
    return <p>Access Denied</p>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {auth.user?.name || 'Admin'}!</p>
      </header>
      <main className="dashboard-content">
        <section className="dashboard-section manage-inventory">
          <h2>Manage Inventory</h2>
          <div className="inventory-controls">
            <AddInventoryForm />
            <UpdateInventory />
          </div>
          <div className="inventory-lists">
            <h3>Items Available</h3>
            <InventoryList />
          </div>
        </section>
        <section className="dashboard-section track-orders">
          <h2>Track Orders</h2>
          <OrderList />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
