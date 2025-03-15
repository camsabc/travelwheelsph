import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import headerImage from '../images/header.jpg';
import './Signup3.css';
import Toast from '../components/Toast';

const DeactAccOtp = () => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30); // Timer set to 30 seconds
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; 

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  useEffect(() => {
    let interval = null;

    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    if (timer === 0) {
      setResendDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [resendDisabled, timer]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  
    // Check if OTP is empty
    if (!otp) {
      setErrors({ otp: 'Enter 6-digit code' });
      return;
    }
  
    // Check if OTP is exactly 6 digits
    if (otp.length !== 6) {
      setErrors({ otp: 'OTP must be 6 digits long' });
      return;
    }
  
    try {
      const response = await axios.post('https://travelwheelsph.onrender.com/verify-otp', { email, otp });
  
      if (response.status === 200) {
        const currentDate = new Date().toISOString(); 
        await addDeact(email, currentDate);  
      }
    } catch (error) {
      setErrors({ otp: 'Invalid or expired OTP' });
    }
  };

  const addDeact = async (email, date) => {
    try {
      const response = await axios.post('https://travelwheelsph.onrender.com/api/deacts/add-deact', { email, date });
      if (response.status === 201) {
        showToast('Your account has now been deactivated', 'success');
  
       
        setTimeout(() => {
          navigate('/');
        }, 3000); 
      }
    } catch (error) {
      setErrors({ otp: 'Error adding Deact. Please try again later.' });
    }
  };

  const resendOtp = async () => {
    try {
      setResendDisabled(true);
      setTimer(30); // Reset the timer to 30 seconds
      const response = await axios.post('https://travelwheelsph.onrender.com/request-otp', { email });
      
      if (response.status === 200) {
        showToast('OTP sent to email!', 'success');
      }
    } catch (error) {
      setErrors({ otp: 'Error resending OTP. Please try again later.' });
      setResendDisabled(false);
    }
  };

  return (
    <div className="deact-otp-container">
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

        <button 
          type="button" 
          className="signup-button full-width" 
          onClick={resendOtp} 
          disabled={resendDisabled}
          style={{ marginLeft: "10px" }}
        >
          {resendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
        </button>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DeactAccOtp;
