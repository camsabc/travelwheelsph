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

import logo from '../images/header.jpg';
import inquirybg from '../images/inquirybg.jpg';
import map from '../images/map.jpg';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import Chatbot from "../components/Chatbot";

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

  
    const [content, setContent] = useState(null);

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
      setInquiryData({ message: '' }); // Clear form
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
            setInquiryData({ email: email})
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
              <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
                <MDBNavbarLink
                  onClick={() => navigate('/inquiry')}
                  style={{ color: 'rgb(255, 165, 0)' }}
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
                Hi, {user?.firstname || "Loading..."}
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
        CONTACT US
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
              <div className="row mb-4 justify-content-between">
                <div className="col-12 col-lg-auto d-flex align-items-center mb-3">
                  <FaPhone style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} />
                  <div style={{ fontSize: '15px', color: 'black' }}>
                    {content?.contactNumber1} <br />
                    {content?.contactNumber2}  <br />
                    {content?.contactNumber3} 
                  </div>
                </div>
                <div className="col-12 col-lg-auto d-flex align-items-center mb-3">
                  <FaEnvelope style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} />
                  <div style={{ fontSize: '15px', color: 'black' }}>{content?.contactEmail} </div>
                </div>
                <div className="col-12 col-lg-auto d-flex align-items-center mb-3">
                  <FaFacebook style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} />
                  <div style={{ fontSize: '15px', color: 'black' }}>{content?.contactFB} </div>
                </div>
                <div className="col-12 col-lg-auto d-flex align-items-center mb-3">
                  <FaInstagram style={{ fontSize: '3rem', marginRight: '15px', color: 'rgb(255, 165, 0)' }} />
                  <div style={{ fontSize: '15px', color: 'black' }}>{content?.contactIG} </div>
                </div>
              </div>

              <MDBCardText className="text-center mb-4 mt-5">
                <span style={{ color: 'black', fontWeight: 'bold', marginRight: '5px' }}>ADDRESS</span>
                <span style={{ color: 'rgb(255, 165, 0)' }}>
                  {content?.contactAddress} 
                </span>
              </MDBCardText>

              <div className="d-flex justify-content-center mb-4">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1933.1963936003895!2d121.11127923822303!3d14.288596095777885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d8453b6836cf%3A0x3b8c0b6d16163c23!2sEntrance%20to%20Golden%20City%20Subdivision%2C%20Santa%20Rosa%2C%20Laguna!5e0!3m2!1sen!2sph!4v1741455638246!5m2!1sen!2sph" width="700" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>               

              <div className="text-center mt-5">
                <MDBTypography tag="h3" style={{ color: 'rgb(250, 165, 0)', fontWeight: 'bolder' }}>
                  SEND AN INQUIRY
                </MDBTypography>

                <div className="mb-3">
                  <textarea
                    name="message"
                    value={inquiryData.message}
                    onChange={handleInputChange}
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
                      textAlign: 'center',
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
                    color: 'white',
                  }}
                  onClick={handleSubmit}
                >
                  Send
                </button>

                {/* Success message below the button */}
                {successMessage && (
                  <div
                    style={{
                      marginTop: '30px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      padding: '20px',
                      borderRadius: '15px',
                      maxWidth: '600px',
                      margin: '10px auto',
                    }}
                  >
                    {successMessage}
                  </div>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>

      <Chatbot user={user}/>
    </div>
  );
}

export default Inquiry;
