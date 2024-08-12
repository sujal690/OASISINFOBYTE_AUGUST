import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginForm';
import RegisterPage from './components/RegisterForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import PizzaList from './components/PizzaList';
import AddInventoryForm from './components/AddInventoryForm';
import InventoryList from './components/InventoryList';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import RequestResetForm from './components/RequestResetForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import UpdateInventory from './components/UpdateInventory';
import PaymentButton from './components/PaymentButton';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import LightedCursor from './components/LightedCursor';
import BackgroundVideo from './components/BackgroundVideo'; // Adjust path as necessary
import './App.css'; // Your main CSS file



const App = () => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (token) {
          const response = await fetch('http://localhost:5000/api/user/check', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          setAuth({ isAuthenticated: true, user: data });
        }
      } catch (error) {
        setAuth({ isAuthenticated: false, user: null });
      }
    };

    fetchAuth();
  }, []);

  return (
    <Router>
      <BackgroundVideo />
      <LightedCursor /> {/* Integrate the LightedCursor */}
      <Header isAuthenticated={auth.isAuthenticated} />
      <div className="main-content">
        <Routes>
        
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginForm" element={<LoginPage />} />
          <Route path="/RegisterForm" element={<RegisterPage />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/ResetPasswordForm" element={<ResetPasswordForm />} />
          <Route path="/RequestResetForm" element={<RequestResetForm />} />
          <Route path="/PizzaList" element={<PizzaList />} />
          <Route path="/PaymentButton" element={<PaymentButton />} />

          {/* Protected Admin Routes */}
          <Route path="/AdminDashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/AddInventoryForm" element={<ProtectedRoute element={<AddInventoryForm />} />} />
          <Route path="/InventoryList" element={<ProtectedRoute element={<InventoryList />} />} />
          <Route path="/OrderList" element={<ProtectedRoute element={<OrderList />} />} />
          <Route path="/OrderForm" element={<ProtectedRoute element={<OrderForm />} />} />
          <Route path="/UpdateInventory" element={<ProtectedRoute element={<UpdateInventory />} />} />

          {/* Redirect or Not Found Route */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
