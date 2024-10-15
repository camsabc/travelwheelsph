import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login1.css';  // Import the CSS file here

import headerImage from '../images/header.jpg';

const ChangePass = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; 

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if both passwords match
    if (newPassword !== newPasswordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Call backend API to change the user's password
      const response = await axios.post('https://travelwheelsph.onrender.com/change-password', {
        email,           // User email passed from the previous page
        newPassword      // New password to be set
      });

      if (response.data.success) {
        // On success, navigate to a different page (e.g., login page)
        navigate('/login');
      } else {
        setError(response.data.message || 'An error occurred.');
      }
    } catch (error) {
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="otp-form" onSubmit={handleOtpSubmit}>
        <div className="logo-header">
          <img src={headerImage} alt="Travel Wheels Logo" className="logo-image" />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <input
          type="password"   // Changed to "password" type for security
          placeholder="Enter New Password"
          className="input-field full-width-emails"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError('');  // Clear error on input change
          }}
        />

        <input
          type="password"   // Changed to "password" type for security
          placeholder="Re-enter New Password"
          className="input-field full-width-emails"
          value={newPasswordConfirm}
          onChange={(e) => {
            setNewPasswordConfirm(e.target.value);
            setError('');  // Clear error on input change
          }}
        />
        
        <div className='fbtns'>
          <button type="submit" className="otp-button">Confirm</button>
        </div>
      
      </form>
    </div>
  );
};

export default ChangePass;
