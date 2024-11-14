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
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import inquirybg from '../../images/inquirybg.jpg';

function AboutUsGuest() {
  const [backgroundImage, setBackgroundImage] = useState(inquirybg);

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [inquiryData, setInquiryData] = useState({
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryData({
      ...inquiryData,
      [name]: value,
    });
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
          style={{ width: '200px', cursor: 'pointer' }}  // Added cursor style to indicate it's clickable
          alt="Header Logo"
          onClick={() => navigate('/login')} // Added onClick handler
        />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">

              <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
                <MDBNavbarLink 
                    onClick={() => navigate('/services-guest')}
                    style={{ color: 'rgb(255, 165, 0)' }}  
                >
                    Services
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos-guest')}>Promos</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry-guest')}>Inquiry</MDBNavbarLink>
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
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        }}
      >
        ABOUT US
      </MDBTypography>

      {/* Main Content Section */}
      <MDBContainer className="flex-grow-1 py-4">
        <div className="d-flex justify-content-center">
          <MDBCard
            style={{
              maxWidth: '1200px',
              width: '100%',
              marginBottom: '50px',
              backgroundColor: 'rgba(255, 255, 255)',
              padding: '20px',
              borderRadius: '15px',
            }}
          >
            <MDBCardBody>
                <div className="row mb-0 justify-content-between">
                    <MDBTypography style={{ fontSize: '25px', color: 'rgb(255, 165, 0)', fontWeight: 'bolder' }}>
                        Travel Tayo Car Rental & Tours
                    </MDBTypography>

                    <MDBTypography>
                        Travel Tayo Car Rental and Tours is a private owned business, located at Unit 2, 2nd Flr, Hersyl Building, Blk 5 Lot 25 Ph4 Golden City Subdivision, Brgy. Dita, Sta Rosa, Laguna. Founded on October 2015, the company has projected revenues and started to establish its name and connections in the local market. It foresees potentials and has expanded the range of services vigorously.
                    </MDBTypography>

                    <MDBTypography className='mt-3' style={{ fontSize: '25px', color: 'rgb(255, 165, 0)', fontWeight: 'bolder' }}>
                        Why Choose Us?
                    </MDBTypography>

                    <MDBTypography>
                        We offer unmatched value, safety, and convenience. We prioritize top-notch customer service, cultural experiences, and safe mobility for all clients. The company is operated and managed based on the international standard environment gained from the previous companies attended by the founders, applying the quality standard of leadership, processes, strategy, resources, and people. With continuous innovation and nationwide accessibility, we guarantee every journey leaves a lasting impact, making us your ideal travel partner.
                    </MDBTypography>
                </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>
    </div>
  );
}

export default AboutUsGuest;
