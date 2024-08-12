import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './PizzaList.css';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPizzas(data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, []);

  const handleOrder = (pizza) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      // Navigate to OrderForm with the selected pizza's details
      navigate('/OrderForm', { state: { pizza } });
    }
  };

  return (
    <div>
      <h1>Available Pizzas</h1>
      <div className="pizza-list">
        {pizzas.map(pizza => (
          <div key={pizza._id} className="pizza-item">
            <img src={pizza.imageUrl} alt={pizza.name} />
            <h2>{pizza.name}</h2>
            <p>Ingredients: {pizza.ingredients.join(', ')}</p>
            <p>Price: ₹{pizza.price}</p>
            <button onClick={handleOrder}>Order</button> {/* Example button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
