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
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import inquirybg from '../../images/inquirybg.jpg';

import anneImage from '../../images/anneImage.png';
import philtoaLogo from '../../images/philtoa.png';
import dotLogo from '../../images/dot.png';
import ptaaLogo from '../../images/ptaa.png';
import alttaLogo from '../../images/altta.png';
import lovePhilippinesLogo from '../../images/lovePhilippines.png';
import ChatbotGuest from './ChatbotGuest';

function AboutUsGuest() {
  const [backgroundImage, setBackgroundImage] = useState(inquirybg);

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
      const [content, setContent] = useState(null);
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

      useEffect(() => {
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
      }, []);


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
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  fontWeight: 'bold',
                  width: '100%',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: 'rgb(255, 165, 0)',
                  padding: '5x 20px',
                  fontSize: '14px'
                }}
                onClick={() => navigate('/login')}
              >
                Log In / Sign up
              </button>
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
                    {content?.aboutText1}
                        
                    </MDBTypography>

                    <MDBTypography className='mt-3' style={{ fontSize: '25px', color: 'rgb(255, 165, 0)', fontWeight: 'bolder' }}>
                        Why Choose Us?
                    </MDBTypography>

                    <MDBTypography>
                    {content?.aboutText2}
                      
                    </MDBTypography>

                    <MDBTypography className='mt-3' style={{ fontSize: '25px', color: 'rgb(255, 165, 0)', fontWeight: 'bolder' }}>
                      Accreditations & Affiliations
                    </MDBTypography>

                    <MDBTypography>
                    {content?.aboutText3}
                    
                    </MDBTypography>

                    <MDBTypography>
                    <ul>
                      <li>Accreditation of Philippine Department of Tourism</li>
                      <li>Member, Tourism Promotions Board</li>
                      <li>Member, PhilGEPS (#233306)</li>
                      <li>Member, Philippine Tour Operator Association (PHILTOA)</li>
                      <li>Member, Philippine Travel Agencies Association</li>
                      <li>Member, Alliance of Laguna Travel and Tour Agencies</li>
                    </ul>
                    </MDBTypography>

                    <div className="container mt-3">
                    <MDBRow className="justify-content-center align-items-center affiliations-logos" style={{ gap: '20px' }}>
                      <MDBCol size="auto">
                        <img src={philtoaLogo} alt="PHILTOA Logo" className="affiliation-logo img-fluid" style={{ maxWidth: '100px' }} />
                      </MDBCol>
                      <MDBCol size="auto">
                        <img src={dotLogo} alt="DOT Logo" className="affiliation-logo img-fluid" style={{ maxWidth: '100px' }} />
                      </MDBCol>
                      <MDBCol size="auto">
                        <img src={ptaaLogo} alt="PTAA Logo" className="affiliation-logo img-fluid" style={{ maxWidth: '100px' }} />
                      </MDBCol>
                      <MDBCol size="auto">
                        <img src={alttaLogo} alt="ALTTA Logo" className="affiliation-logo img-fluid" style={{ maxWidth: '100px' }} />
                      </MDBCol>
                      <MDBCol size="auto">
                        <img src={lovePhilippinesLogo} alt="Love Philippines Logo" className="affiliation-logo img-fluid" style={{ maxWidth: '100px' }} />
                      </MDBCol>
                    </MDBRow>
                  </div>
                </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>

      <ChatbotGuest />
    </div>
  );
}

export default AboutUsGuest;
