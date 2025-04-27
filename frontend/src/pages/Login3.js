import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login1.css';  // Import the CSS file here
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';

import headerImage from '../images/header.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

import Toast from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const loginResponse = await fetch('https://travelwheelsph.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await loginResponse.json();
      
      if (loginResponse.ok) {
        if (data.user.type !== 'user') {
          navigate('/admin', { 
            state: { 
              name: data.user.firstname, 
              role: data.user.type,
              isAuthenticated: true
            } 
          });
        } else {
          navigate('/home-user', { 
            state: { 
              email: data.user.email 
            } 
          });
        }
        showToast('Login successful!', 'success');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Server error, please try again');
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

        <MDBRow>
                <MDBCol md="12">
                <label htmlFor="email" style={{ color: 'black', textAlign: 'left', display: 'block', paddingLeft: '16px', paddingBottom: '2px' }}>
                    Email 
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
              </MDBRow>

<MDBRow className='mb-2'>
          <MDBCol md="12">
            <label htmlFor="password" style={{ color: 'black', textAlign: 'left', display: 'block', paddingLeft: '16px', paddingBottom: '2px' }}>
              Password
            </label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                style={{
                  border: '2px solid rgb(250, 207, 32)',
                  borderRadius: '15px',
                  boxShadow: 'none',
                  padding: '10px',
                  backgroundColor: 'transparent',
                  width: '100%',
                  paddingRight: '40px', // Add padding to accommodate the icon
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px', // Position the icon to the right
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: 'black',
                  fontSize: '1.2em',
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </MDBCol>
        </MDBRow>

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

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Login;
