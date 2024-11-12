import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import inquirybg from '../../images/inquirybg.jpg';
import map from '../../images/map.jpg';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

function InquiryGuest() {
  const [backgroundImage, setBackgroundImage] = useState(inquirybg);

  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('Inquiry submitted successfully!');
  };



  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#eee',
      }}
    >
      {/* Header Section */}
      <div className="bg-white py-2" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
        <MDBCardImage
    src={logo}
    style={{ width: '200px', cursor: 'pointer' }}
    alt="Header Logo"
    onClick={() => navigate('/')} 
  />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">

            <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink 
                    onClick={() => navigate('/services-guest')}
                >
                    Services
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos-guest')} >Promos</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold', fontWeight: 'bold' }}>
                <MDBNavbarLink 
                    onClick={() => navigate('/inquiry')}
                    style={{ color: 'rgb(255, 165, 0)' }} 
                >
                    Inquiry
                </MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => {navigate('/login')}}
                style={{
                  margin: '0 25px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, Guest
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      <MDBTypography 
        tag="h1" 
        className="text-center mt-5" 
        style={{
            fontWeight: 'bolder', 
            color: 'white', 
            fontSize: '60px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'  
        }}
    >
        CONTACT US
    </MDBTypography>

      {/* Main Content Section */}
      <MDBContainer className="flex-grow-1 py-4">
        <div className="d-flex justify-content-center">
          <MDBCard style={{ maxWidth: '1200px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
            <MDBCardBody>


            <div className="row mb-4 justify-content-between">
              <div className="col-12 col-lg-auto d-flex align-items-center mb-3">
                <FaPhone style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} />
                <div style={{ fontSize: '15px', color: 'black' }}>
                  GLOBE  0915-262-3898 <br />
                  GLOBE  0927-893-0271 <br />
                  GLOBE  0994-639-6953
                </div>
              </div>
              <div className="col-12 col-lg-auto d-flex align-items-center mb-3">
                <FaEnvelope style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} />
                <div style={{ fontSize: '15px', color: 'black' }}>info@traveltayoph.com</div>
              </div>
              <div className="col-12 col-lg-auto d-flex align-items-center mb-3">
                <FaFacebook style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} />
                <div style={{ fontSize: '15px', color: 'black' }}>TravelTayo Car Rental and Tours</div>
              </div>
              <div className="col-12 col-lg-auto d-flex align-items-center mb-3">
                <FaInstagram style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} />
                <div style={{ fontSize: '15px', color: 'black' }}>Travel Tayo PH</div>
              </div>
            </div>


              {/* Additional text and image below the row */}
              <MDBCardText className="text-center mb-4 mt-5">
                <span style={{ color: 'black', fontWeight: 'bold', marginRight: '5px' }}>
                    ADDRESS
                </span>
                <span style={{ color: 'rgb(255, 165, 0)' }}>
                    {' '}
                    Office Unit 2, Hersyl Building, Blk 5 Lot 25 Phase4, Golden City Subdivision, Brgy. Dila, Santa Rosa, Philippines
                </span>
              </MDBCardText>

              <div className="d-flex justify-content-center mb-4">
                <MDBCardImage src={map} style={{ maxWidth: '100%', height: 'auto' }} alt="Additional Info" />
              </div>

              {/* Contact Form Section */}
              <div className="text-center mt-5">
                <MDBTypography tag="h3" style={{ color: 'rgb(250, 165, 0)', fontWeight: 'bolder' }}>
                  SEND AN INQUIRY
                </MDBTypography>

                {/* Email Address Input */}
                <div className="mb-1">  {/* Add this div for new row */}
                  <input
                    type="email"
                    placeholder="Enter email address"
                    required
                    style={{
                      border: '2px solid rgb(250, 165, 0)',
                      borderRadius: '20px', 
                      boxShadow: 'none',
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%', 
                      maxWidth: '600px', 
                      margin: '10px auto',
                      textAlign: 'center'
                    }}
                  />
                </div>

                {/* Inquiry Textarea */}
                <div className="mb-3"> 
                  <textarea
                    placeholder="Your inquiry here..."
                    rows="4"
                    required
                    style={{
                      border: '2px solid rgb(250, 165, 0)',
                      borderRadius: '20px', 
                      boxShadow: 'none',
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%', 
                      maxWidth: '600px', 
                      margin: '10px auto',
                      textAlign: 'center'
                    }}
                  ></textarea>
                </div>

                <button 
                    type="button" 
                    style={{ 
                        fontWeight: 'bold',
                        width: '20%', 
                        borderRadius: '30px', 
                        backgroundColor: 'rgb(255, 165, 0)', 
                        border: 'none', 
                        padding: '7px 10px',
                        color: 'white'
                    }}
                    onClick={handleSubmit} 
                >
                    Send
                </button>

                {/* Success message below the button */}
                {successMessage && (
                  <div style={{
                    marginTop: '30px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '15px',
                    maxWidth: '600px',
                    margin: '10px auto',
                  }}>
                    {successMessage}
                  </div>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>

    </div>
  );
}

export default InquiryGuest;
