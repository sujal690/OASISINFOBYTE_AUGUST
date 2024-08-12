import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import RequestResetForm from './RequestResetForm';  // Import the RequestResetForm component

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showResetForm, setShowResetForm] = useState(false);  // State to toggle the reset form
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('User logged in successfully:', response.data);
      localStorage.setItem('userToken', response.data.token);  // Store token
      navigate('/');  // Redirect to home page
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      {showResetForm ? (
        <RequestResetForm onClose={() => setShowResetForm(false)} />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <p onClick={() => setShowResetForm(true)} className="forgot-password">
            Forgot Password?
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
