import React, { useState } from 'react';
import axios from 'axios';

const CustomPizza = () => {
  const [base, setBase] = useState('');
  const [sauce, setSauce] = useState('');
  const [cheese, setCheese] = useState('');
  const [veggies, setVeggies] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/pizzas/custom', { base, sauce, cheese, veggies });
      console.log('Custom Pizza Created:', response.data);
      setMessage('Custom pizza created successfully!');

      // Clear form fields
      setBase('');
      setSauce('');
      setCheese('');
      setVeggies([]);
    } catch (error) {
      console.error('Error creating custom pizza:', error);
      setMessage('Error creating custom pizza');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Your Custom Pizza</h2>
      <label>
        Base:
        <input type="text" value={base} onChange={(e) => setBase(e.target.value)} />
      </label>
      <label>
        Sauce:
        <input type="text" value={sauce} onChange={(e) => setSauce(e.target.value)} />
      </label>
      <label>
        Cheese:
        <input type="text" value={cheese} onChange={(e) => setCheese(e.target.value)} />
      </label>
      <label>
        Veggies (comma-separated):
        <input type="text" value={veggies.join(', ')} onChange={(e) => setVeggies(e.target.value.split(','))} />
      </label>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CustomPizza;
