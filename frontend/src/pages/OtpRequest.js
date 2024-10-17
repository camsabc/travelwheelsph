import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import headerImage from '../images/header.jpg';
import './Signup3.css'; 
import Toast from '../components/Toast';

const OtpRequest = () => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};  

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP is empty
    if (!otp) {
      setErrors({ otp: 'Enter 6-digit code' });
      return; // Prevent submission if OTP is empty
    }

    // Check if OTP is exactly 6 digits
    if (otp.length !== 6) {
      setErrors({ otp: 'OTP must be 6 digits long' });
      return; // Prevent submission if OTP is not 6 digits
    }

    try {
      const response = await axios.post('https://travelwheelsph.onrender.com/verify-request-otp', { email, otp });

      if (response.status === 200) {
        showToast('Booking created successfully!', 'success');
        navigate(`/change-pass`, { state: { email: email } });
      }
    } catch (error) {
      setErrors({ otp: 'Invalid or expired OTP' });
    }
  };

  return (
    <div className="signup-container"> {/* Reusing signup-container for layout */}
      <form className="signup-form" onSubmit={handleOtpSubmit}>
        <div className="logo-header">
          <img src={headerImage} alt="Travel Wheels Logo" className="logo-image" />
        </div>

        <input
          type="text"
          placeholder="Enter OTP"
          className="input-field full-width-email" 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {errors.otp && <p className="error-message">{errors.otp}</p>}

        <button type="submit" className="signup-button full-width">Verify OTP</button>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default OtpRequest;
