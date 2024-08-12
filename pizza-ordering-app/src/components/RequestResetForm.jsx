import React, { useState } from 'react';
import axios from 'axios';

const RequestResetForm = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth1/forgot-password', { email });
      console.log('Password reset email sent:', response.data);
    } catch (error) {
      console.error('Error requesting password reset:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Request Password Reset</button>
    </form>
  );
};

export default RequestResetForm;
