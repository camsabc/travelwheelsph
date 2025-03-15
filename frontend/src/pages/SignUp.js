import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';

import './Signup3.css';
import headerImage from '../images/header.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Toast from '../components/Toast';

const SignUp = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [bday, setBday] = useState('');

  const [type, setType] = useState('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  

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
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password)) {
      errors.password = 'Password must be 8-15 characters long and include uppercase letters, lowercase letters, numbers, and special characters';
      formIsValid = false;
    }    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      formIsValid = false;
    }

    setErrors(errors);

    if (formIsValid) {
      try {
        const response = await axios.post('http://localhost:3000/signup', {
          firstname,
          lastname,
          email,
          password,
          type,
          contactNumber,
          bday
        });

        if (response.status === 201) {
          showToast('User registered successfully! An OTP has been sent to your email.', 'success');
          navigate('/otp', { state: { email, type, firstname } });
        }
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data === 'User already exists') {
          setErrors({ email: 'This email is already registered. Please use a different email.' });
        } else {
          showToast('An error occurred while submitting the form.', 'error');
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

        <MDBRow>
              <MDBCol md="6">
                <label htmlFor="lastname" style={{ color: 'black', textAlign: 'left', display: 'block', paddingLeft: '16px', paddingBottom: '2px' }}>
                    Last Name 
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
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
                <MDBCol md="6">
                <label htmlFor="firstname" style={{ color: 'black', textAlign: 'left', display: 'block', paddingLeft: '16px', paddingBottom: '2px' }}>
                    First Name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
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

              <MDBRow>
              <MDBCol md="6">
              <label
                htmlFor="contactNumber"
                style={{
                  color: 'black',
                  textAlign: 'left',
                  display: 'block',
                  paddingLeft: '16px',
                  paddingBottom: '2px'
                }}
              >
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
                pattern="\d{11}"
                title="Please enter exactly 11 digits"
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

                <MDBCol md="6">
                <label htmlFor="bday" style={{ color: 'black', textAlign: 'left', display: 'block', paddingLeft: '16px', paddingBottom: '2px' }}>
                    Birthday
                  </label>
                  <input
                    id="bday"
                    name="bday"
                    type="date"
                    value={bday}
                    onChange={(e) => setBday(e.target.value)}
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
        {errors.email && <p className="error-message">{errors.email}</p>}



        <MDBRow>
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




        <MDBRow className='mt-3 mb-3'>
          <MDBCol md="12">
            <label htmlFor="confirmPassword" style={{ color: 'black', textAlign: 'left', display: 'block', paddingLeft: '16px', paddingBottom: '2px' }}>
              Confirm Password 
            </label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </MDBCol>
        </MDBRow>

        {errors.password && <p className="error-message">{errors.password}</p>}
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            fontWeight: 'bold',
            width: '55%',
            borderRadius: '30px',
            backgroundColor: 'rgb(255, 165, 0)',
            border: 'none',
            padding: '7px 10px',
            marginTop: '10px',
            marginBottom: '20px',
          }}
          disabled={!isChecked}
        >
          SIGN UP
        </button>


        <p className="ps">
          Already have an account?
          <span
            className="href"
            style={{ cursor: 'pointer', textDecoration: 'underline', paddingLeft: '5px' }}
            onClick={() => {
              navigate('/login');
            }}
          >
            Sign In.
          </span>
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <label htmlFor="termsCheckbox" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
    <input 
      type="checkbox" 
      id="termsCheckbox" 
      checked={isChecked} 
      onChange={handleCheckboxChange} 
      style={{ marginRight: '10px' }} 
    />
    By clicking this, you agree to our{' '}
    <span 
      onClick={() => navigate('/privacy-statement')}
      style={{ 
        color: '#68BBE3', 
        cursor: 'pointer', 
        textDecoration: 'underline', 
        display: 'inline',
        margin: '0 5px'
      }}
    >
      Privacy Statement
    </span>
     and
    <span 
      onClick={() => navigate('/terms-and-condition-guest')}
      style={{ 
        color: '#68BBE3', 
        cursor: 'pointer', 
        textDecoration: 'underline', 
        display: 'inline',
        margin: '0 5px'
      }}
    >
      Terms and Conditions
    </span>
  </label>
</div>



      </form>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default SignUp;
