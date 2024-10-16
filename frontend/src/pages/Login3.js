import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login1.css';  // Import the CSS file here

import headerImage from '../images/header.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError('');

    // Check for empty inputs
    if (!email && !password) {
      setError('All inputs are required');
      return;
    }

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email is invalid');
      return;
    }

    // Validate password complexity
    const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordValidationRegex.test(password)) {
      setError('Invalid Password');
      return;
    }

    try {
      const response = await axios.post('https://travelwheelsph.onrender.com/login', { email, password });

      if (response.status === 200) {
        alert('Login successful!');
        navigate(`/home-user`, { state: { email: email } });
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  useEffect(() => {
    if (email) {
      fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setUser(data);
          }
          setLoading(false);  
        })
        .catch(err => {
          console.error('Error fetching user:', err);
          setError('Failed to fetch user data.');
          setLoading(false);
        });
    } else {
      setLoading(false);  
    }
  }, [email]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo-header">
          <img src={headerImage} alt="Travel Wheels Logo" className="logo-image" />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="input-field full-width-emails"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container">  {/* New wrapper for password field */}
          <input
            type={showPassword ? 'text' : 'password'} // Toggle between text and password types
            placeholder="Password"
            className="input-field full-width-emails"
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

        {error && <p className="error-message">{error}</p>}

        <div className='fp'>
          <button
            onClick={() => navigate('/forgot')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: 'inherit',
              textDecoration: 'underline',
            }}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "rgb(255, 165, 0)",
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: 0,
            fontSize: 'inherit',
            color: "white",
            borderRadius: "12px",
            padding: "10px",
            width: "50%"
          }}
          className="login-button"
        >
          Sign in
        </button>

        <p className='ps'>
          Don't have an account yet? 
          <button
            onClick={() => navigate('/signup')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: 0,
              fontSize: 'inherit',
              textDecoration: 'underline',
              marginLeft: "5px",
              color: "rgb(255, 165, 0)"
            }}
          >
            Sign Up.
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
