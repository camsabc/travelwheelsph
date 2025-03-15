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
    const { id, email } = location.state || {}; 
    const [quotationDetails, setQuotationDetails] = useState(null);
    const [quotations, setQuotations] = useState([]); 

    
      const [content, setContent] = useState(null);

      
  

  useEffect(() => {
    if (email) {
      fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setLoading(false);
          } else {
            setUser(data);

            return fetch(`https://travelwheelsph.onrender.com/api/quotations/get-all-quotations-by-email/${email}`);
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setQuotations(data);
            if (id) {
              return fetch(`https://travelwheelsph.onrender.com/api/quotations/get-quotation-by-id/${id}`);
            }
          }
          setLoading(false);
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            console.log(data)
            setQuotationDetails(data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          setError('Failed to fetch data.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    const fetchContent = async () => {
      try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/contents/get-content/67b8bf22dcf4d107a677a21f');
        const result = await response.json();
        if (response.ok) {
          setContent(result);
        } 
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, email]);

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
                <h1 style={{fontWeight: 'bolder'}}> <i className="fas fa-circle-check" style={{fontSize: '50px', paddingRight: '15px'}}></i>  {content?.paymentMainText} </h1>
                <p>{content?.paymentSubText}You will receive an email confirmation about your acknowledged receipt soon! Thank you!</p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', paddingTop: '20px' }}>
                  <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                          fontWeight: 'bold',
                          width: '200px',
                          fontSize: '14px',
                          borderRadius: '30px',
                          backgroundColor: 'rgb(255, 165, 0)',
                          border: 'none',
                          padding: '10px 20px',
                      }}
                      onClick={() => navigate('/feedback', { state: { id: quotationDetails._id, email: user.email }})}
                  >
                      Give us a feedback
                  </button>

                  <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                          fontWeight: 'bold',
                          width: '200px',
                          fontSize: '14px',
                          borderRadius: '30px',
                          backgroundColor: 'rgb(255, 165, 0)',
                          border: 'none',
                          padding: '10px 20px',
                      }}
                      onClick={() => navigate('/home-user', { state: { email: user.email }})}
                  >
                      Back to Homepage
                  </button>
              </div>

                </div>
            </div>
            </div>
        </>
    );
};

export default PaymentSubmit;
