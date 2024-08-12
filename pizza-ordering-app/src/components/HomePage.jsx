import React from 'react';
import { Link } from 'react-router-dom';
import PizzaList from './PizzaList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Pizza Palace</h1>
      </header>

      <main>
        <PizzaList />
      </main>

      <footer>
        <p>&copy; 2024 Pizza Palace</p>
      </footer>
    </div>
  );
};

export default HomePage;
