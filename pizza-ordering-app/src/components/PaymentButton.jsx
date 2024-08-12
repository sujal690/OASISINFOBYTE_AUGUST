import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './PaymentButton.css'; // Import the CSS for styling

const PaymentButton = () => {
  const location = useLocation();
  const { amount, base, sauce, cheese, veggies } = location.state || {};

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePayment = async () => {
    if (password !== '2005') {
      setError('Invalid password. Please try again.');
      return;
    }

    try {
      // Create a mock order
      const response = await axios.post('http://localhost:5000/api/payment/orders', { amount });

      // Ensure the response contains an ID
      if (response.data && response.data.id) {
        console.log('Mock Order Created:', response.data);

        // Confirm the mock order
        const confirmResponse = await axios.post('http://localhost:5000/api/payment/confirm', { orderId: response.data.id });

        if (confirmResponse.data && confirmResponse.data.message) {
          alert('Payment successful! Order ID: ' + response.data.id + ' - ' + confirmResponse.data.message);
        } else {
          console.error('Confirmation response does not contain message:', confirmResponse.data);
          alert('Payment failed. Please try again.');
        }
      } else {
        console.error('Order creation response does not contain ID:', response.data);
        alert('Order creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="payment-button-container">
      <h2>Payment Details</h2>
      <div className="payment-details">
        <div className="payment-description">
          <div className="order-item">
            <span className="order-item-icon">🍕</span>
            <span className="order-item-label">Base:</span>
            <span className="order-item-value">{base}</span>
          </div>
          <div className="order-item">
            <span className="order-item-icon">🥫</span>
            <span className="order-item-label">Sauce:</span>
            <span className="order-item-value">{sauce}</span>
          </div>
          <div className="order-item">
            <span className="order-item-icon">🧀</span>
            <span className="order-item-label">Cheese:</span>
            <span className="order-item-value">{cheese}</span>
          </div>
          <div className="order-item">
            <span className="order-item-icon">🥦</span>
            <span className="order-item-label">Veggies:</span>
            <span className="order-item-value">{veggies}</span>
          </div>
        </div>
        <div className="payment-amount">
          Amount: ₹{amount}
        </div>
      </div>
      <div className="password-input-container">
        <label htmlFor="password">Enter Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <button className="payment-button" onClick={handlePayment}>Pay ₹{amount}</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PaymentButton;
