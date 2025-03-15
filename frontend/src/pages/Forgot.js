import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login1.css';  

import headerImage from '../images/header.jpg';
import Toast from '../components/Toast';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is valid
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/request-otp', { email });

      if (response.status === 201) {
        showToast('OTP sent to email!', 'success');
        navigate('/otp-request', { state: { email } });
      } else {
        setError('Error sending OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);  // Log the error to understand what went wrong
      setError('An error occurred while sending the OTP.');
    }
  };

  return (
    <div className="login-container">
      <form className="otp-form" onSubmit={handleOtpSubmit}>
        <div className="logo-header">
          <img src={headerImage} alt="Travel Wheels Logo" className="logo-image" />
        </div>
        
        <h2>Forgot Password</h2>
        {error && <p className="error-message">{error}</p>}
        
        <input
          type="text"
          placeholder="Enter Email"
          className="input-field full-width-emails"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');  // Clear error on input change
          }}
        />
        
        <div className='fbtns'>
          <button type="submit" className="otp-button">Send Code</button>
        </div>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Forgot;
