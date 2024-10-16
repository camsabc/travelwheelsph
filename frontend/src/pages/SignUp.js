import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Signup3.css';
import headerImage from '../images/header.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const SignUp = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    let errors = {};

    // Validate form fields
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      errors.general = 'All fields are required';
      formIsValid = false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address';
      formIsValid = false;
    }
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      errors.password = 'Password must be at least 6 characters long, and include uppercase letters, lowercase letters, numbers, and special characters';
      formIsValid = false;
    }    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      formIsValid = false;
    }

    setErrors(errors);

    if (formIsValid) {
      try {
        const response = await axios.post('https://travelwheelsph.onrender.com/signup', {
          firstname,
          lastname,
          email,
          password,
          type,
        });

        if (response.status === 201) {
          alert('User registered successfully! An OTP has been sent to your email.');
          navigate('/otp', { state: { email, type, firstname } }); 
        }
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data === 'User already exists') {
          setErrors({ email: 'This email is already registered. Please use a different email.' });
        } else {
          console.error('Error during signup:', error);
          alert('An error occurred while submitting the form.');
        }
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="logo-header">
          <img src={headerImage} alt="Logo" className="logo-image" />
        </div>

        {errors.general && <p className="error-message">{errors.general}</p>}

        <div className="input-group">
          <input
            type="text"
            placeholder="First name"
            className="input-field-name half-width"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            className="input-field-name half-width"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="input-field full-width-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}


          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              placeholder="Password"
              className="pass-input-field password-input" // Add class for styling
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password" // Add a class to style the eye icon
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Switch between eye and eye-slash */}
            </span>
          </div>
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'} // Toggle confirm password visibility
              placeholder="Confirm Password"
              className="pass-input-field confirm-password-input" // Add class for styling
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="toggle-password" // Add a class to style the eye icon
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Switch between eye and eye-slash */}
            </span>
          </div>

        {errors.password && <p className="error-message">{errors.password}</p>}
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        <button type="submit" className="signup-button full-width-signup">Sign Up</button>

        <p className="ps">
          Already have an account? 
            <span 
              className="href" 
              style={{ cursor: 'pointer', textDecoration: 'underline', paddingLeft: '5px' }} 
              onClick={() => navigate('/login')}
            >
              Sign In.
            </span>
        </p>
        <p className='ps'>
          By clicking Sign Up, you agree to our <a href="/terms" className="href">Terms of Service</a> and <a href="/privacy" className="href">Privacy Statement</a>.
        </p>
      </form>
    </div>
  );
};

export default SignUp;
