import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './PaymentSubmit.css'

import logo from '../images/header.jpg';

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBTypography,
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon
  } from 'mdb-react-ui-kit';

const PaymentSubmit = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
  
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
  
    if (loading) {
      return <div className="text-center">Loading...</div>;
    }
  
    if (error) {
      return <div className="text-center">{error}</div>;
    }

    return (
        <>
        <div className="bg-white py-2 mb-1" style={{ flexShrink: 0 }}>
                <MDBContainer fluid className="d-flex align-items-center justify-content-between">
                <MDBCardImage
            src={logo}
            style={{ width: '200px', cursor: 'pointer' }}
            alt="Header Logo"
            onClick={() => navigate('/home-user', { state: { email: user.email }})}
        />
            <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
                <MDBNavbarNav className="align-items-center">
                <MDBNavbarItem style={{ margin: '0 15px' }}>
                <span style={{ cursor: 'pointer' }} onClick={ () => navigate('/services', { state: { email: user.email }})}>Services</span>
                </MDBNavbarItem>
                <MDBNavbarItem style={{ margin: '0 15px' }}>
                    <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem style={{ margin: '0 15px' }}>
                    <MDBNavbarLink onClick={() => navigate('/inquiry', { state: { email: user.email }})}>Inquiry</MDBNavbarLink>
                </MDBNavbarItem>
                <span
                    onClick={ () => navigate('/profile', { state: { email: user.email } })}
                    style={{
                        margin: '0 15px',
                        fontSize: '1rem',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                    >
                    Hi, {user ? user.firstname : 'Guest'}
                    </span>
                </MDBNavbarNav>
            </MDBNavbar>
            </MDBContainer>
        </div>

        <div className="confirmation-container">
            <div className="confirmation-content">
                <div className="confirmation-message">
                <div className="confirmation-icon">
                    {/* You can add an icon here if needed */}
                </div>
                <h1 style={{fontWeight: 'bolder'}}> <i className="fas fa-circle-check" style={{fontSize: '50px', paddingRight: '15px'}}></i>  We’ve received your payment!</h1>
                <p>You will receive an email confirmation about your acknowledged receipt soon! Thank you!</p>

                <button 
                    className="back-home-link" 
                    onClick={() => navigate('/home-user', {state: { email: user.email }})}
                    style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', padding: '0' }}
                >
                    Back to Homepage
                </button>
                </div>
            </div>
            </div>
        </>
    );
};

export default PaymentSubmit;
