import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import './CustomCursor';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!token && <li><Link to="/LoginForm">Login</Link></li>}
          {!token && <li><Link to="/RegisterForm">Register</Link></li>}
          {token && <li><Link to="/OrderForm">Create Pizza</Link></li>}
          {token && <li><Link to="/OrderList">My Orders</Link></li>}
          {token && <li onClick={handleLogout}>Logout</li>}
          <li><Link to="/AdminLogin">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
