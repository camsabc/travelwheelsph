import React, { useState, useEffect } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';

import {
  MDBContainer,
  MDBCard,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import flightsbg from '../../images/flightsbg.jpg';
import visabg from '../../images/visa-bg.jpg';

import Modal from '../../components/Modal'; 


import ChatbotGuest from './ChatbotGuest';

import japan_flag from '../../images/japan.png'
import southkorea_flag from '../../images/southkorea.png'
import usa_flag from '../../images/usa.png'
import canada_flag from '../../images/canada.png'
import uae_flag from '../../images/uae.png'
import turkey_flag from '../../images/turkey.png'
import india_flag from '../../images/india.png'
import vietnam_flag from '../../images/vietnam.png'
import newzealand_flag from '../../images/newzealand.png'
import china_flag from '../../images/china.png'
import russia_flag from '../../images/russia.png'
import spain_flag from '../../images/spain.png'


function ServicesVisaGuest() {

  const navigate = useNavigate();  
  const [backgroundImage, setBackgroundImage] = useState(visabg);

  const [rides, setRides] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const [content, setContent] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmLogin = () => {
    navigate('/login')
  };

    const countries = [
      { name: 'Japan', flag: japan_flag },
      { name: 'South Korea', flag: southkorea_flag },
      { name: 'USA', flag: usa_flag },
      { name: 'Canada', flag: canada_flag },
      { name: 'UAE', flag: uae_flag },
      { name: 'Turkey', flag: turkey_flag },
      { name: 'India', flag: india_flag },
      { name: 'Vietnam', flag: vietnam_flag },
      { name: 'New Zealand', flag: newzealand_flag },
      { name: 'China', flag: china_flag },
      { name: 'Russia', flag: russia_flag },
      { name: 'Spain', flag: spain_flag },
    ];
  


  useEffect(() => {
    const fetchData = async () => {
            try {
                const ridesResponse = await fetch(`https://travelwheelsph.onrender.com/api/rides/get-all-rides`);
                const ridesData = await ridesResponse.json();
                if (ridesData.error) {
                    setError(ridesData.error);
                } else {
                    setRides(ridesData);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch user or rides data.');
            } finally {
                setLoading(false);
            }
    };
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
    fetchData();
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
    style={{ width: '200px', cursor: 'pointer' }}
    alt="Header Logo"
    onClick={() => navigate('/')} 
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

      {/* Main Content Section */}

                 <>
                      <MDBTypography 
                        tag="h1" 
                        className="text-center mt-4" 
                        style={{
                          fontWeight: 'bolder', 
                          color: 'white', 
                          fontSize: '60px',
                          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
                        }}
                      >
                        VISA ASSISTANCE
                      </MDBTypography>
                    
                      <MDBCard 
                        style={{ 
                          borderRadius: '15px', 
                          padding: '30px', 
                          backgroundColor: '#fff', 
                          marginTop: '10px', 
                          marginBottom: '5px',
                          alignSelf: 'center',
                          width: '85%'
                  
                        }}
                      >
                    <MDBRow>
                      {countries.map((country, index) => (
                        <MDBCol md="3" className="mb-4" key={index}>
                          <MDBCard 
                            style={{ 
                              borderRadius: '10px', 
                              textAlign: 'center', 
                              padding: '10px', 
                              backgroundColor: '#fff4be' 
                            }}
                            onClick={() => navigate(`/visa-guest-2`, { state: { country: country.name } })}
                          >
                            <div 
                              style={{ 
                                width: '100%', 
                                height: '100px',  // Fixed container height
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                overflow: 'hidden',
                                borderRadius: '10px 10px 0 0'
                              }}
                            >
                              <img 
                                src={country.flag} 
                                alt={`${country.name} flag`} 
                                style={{ 
                                  width: '180px', 
                                  height: '100px',  
                                  objectFit: 'cover', 
                                  borderRadius: '5px'
                                }}
                              />
                            </div>
                            <MDBTypography tag="h6" className="mt-2" style={{ color: 'black', fontSize: '20px' }}>
                              {country.name}
                            </MDBTypography>
                          </MDBCard>
                        </MDBCol>
                      ))}
                    </MDBRow>
          
                    <MDBTypography 
                      tag="h6" 
                      className="mt-2 text-center"  
                      style={{ color: 'black', fontSize: '16px', textAlign: 'center' }} 
                    >
                      If your desired country is not listed above, click here to inquire
                    </MDBTypography>
          
          
          
                      </MDBCard>
                    </>

          <ChatbotGuest />

          <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogin}
       />
    </div>
  );
}

export default ServicesVisaGuest;
