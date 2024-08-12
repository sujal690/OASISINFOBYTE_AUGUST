import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle redirection
import axios from 'axios';
import './OrderForm.css';



const OrderForm = () => {
  const [formData, setFormData] = useState({
    base: '',
    sauce: '',
    cheese: '',
    veggies: [],
  });
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    updateAmount(); // Update amount when form data changes
  };

  const handleVeggiesChange = (e) => {
    setFormData({
      ...formData,
      veggies: e.target.value.split(','),
    });
    updateAmount(); // Update amount when veggies change
  };

  const updateAmount = () => {
    let basePrice = formData.base ? 100 : 0;
    let saucePrice = formData.sauce ? 50 : 0;
    let cheesePrice = formData.cheese ? 75 : 0;
    let veggiePrice = formData.veggies.length ? formData.veggies.length * 20 : 0;

    setAmount(basePrice + saucePrice + cheesePrice + veggiePrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    try {
      const response = await axios.post('http://localhost:5000/api/custom-orders', formData);
      console.log('Order placed successfully:', response.data);
      navigate('/PaymentButton', { 
        state: { 
          amount, 
          base: formData.base, 
          sauce: formData.sauce, 
          cheese: formData.cheese, 
          veggies: formData.veggies.join(', ') 
        } 
      });
      
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="order-form-container">
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="order-form">
        <h1>Order Your Pizza</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Base</label>
            <input type="text" name="base" value={formData.base} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Sauce</label>
            <input type="text" name="sauce" value={formData.sauce} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Cheese</label>
            <input type="text" name="cheese" value={formData.cheese} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Veggies (comma-separated)</label>
            <input type="text" name="veggies" value={formData.veggies.join(',')} onChange={handleVeggiesChange} />
          </div>
          <div className="form-group">
            <h3>Total Amount: ₹{amount}</h3>
          </div>
          <button type="submit" className="order-button">Place Order</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
