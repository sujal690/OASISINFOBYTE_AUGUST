import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('adminToken'); // Check for admin token

  if (!token) {
    return <Navigate to="/AdminLogin" />; // Redirect to AdminLogin if not authenticated
  }

  return element; // Render the protected component if authenticated
};

export default ProtectedRoute;
