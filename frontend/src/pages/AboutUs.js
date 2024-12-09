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

import logo from '../images/header.jpg';
import inquirybg from '../images/inquirybg.jpg';



import anneImage from '../images/anneImage.png';
import philtoaLogo from '../images/philtoa.png';
import dotLogo from '../images/dot.png';
import ptaaLogo from '../images/ptaa.png';
import alttaLogo from '../images/altta.png';
import lovePhilippinesLogo from '../images/lovePhilippines.png';



function Inquiry() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the inquiry to the backend
    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/inquiries/create-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the inquiry');
      }

      setSuccessMessage('Inquiry submitted successfully!');
      setInquiryData({ email: '', message: '' }); // Clear form
    } catch (err) {
      setError('Failed to submit the inquiry.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          const userResponse = await fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`);
          const userData = await userResponse.json();

          if (userData.error) {
            setError(userData.error);
          } else {
            setUser(userData);
          }
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to fetch user data.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [email]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h3>{error}</h3>
      </div>
    );
  }

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
            onClick={() => navigate('/home-user', { state: { email: user.email } })}
          />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/services', { state: { email: user.email } })}>Services</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email } })}>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink
                  onClick={() => navigate('/inquiry')}
                  
                >
                  Inquiry
                </MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => navigate('/profile', { state: { email: user.email } })}
                style={{
                  margin: '0 25px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, {user.firstname}
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

                    
                    <MDBTypography className='mt-3' style={{ fontSize: '25px', color: 'rgb(255, 165, 0)', fontWeight: 'bolder' }}>
                      Accreditations & Affiliations
                    </MDBTypography>

                    <MDBTypography>
                    As part of continuous improvement and raising the quality standard, the company has started attaining the accreditation and affiliations:
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
    </div>
  );
}

export default Inquiry;
