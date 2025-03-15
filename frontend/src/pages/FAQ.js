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

import logo from '../images/header.jpg';
import inquirybg from '../images/inquirybg.jpg';
import map from '../images/map.jpg';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import Toast from '../components/Toast';
import Chatbot from "../components/Chatbot";

function FAQ() {
  const [backgroundImage, setBackgroundImage] = useState(inquirybg);

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

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [toast, setToast] = useState(null);

  const [expandedCards, setExpandedCards] = useState([false, false, false, false]);
    const [content, setContent] = useState(null);

  const faqData = [
    { question: content?.question1 || "Loading question...", answer: content?.answer1 || "Loading answer..." },
    { question: content?.question2 || "Loading question...", answer: content?.answer2 || "Loading answer..." },
    { question: content?.question3 || "Loading question...", answer: content?.answer3 || "Loading answer..." },
    { question: content?.question4 || "Loading question...", answer: content?.answer4 || "Loading answer..." },
  ];

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const toggleCard = (index) => {
    setExpandedCards((prevExpandedCards) =>
      prevExpandedCards.map((isExpanded, i) => (i === index ? !isExpanded : isExpanded))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showToast('Inquiry submitted successful!', 'success');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          const userResponse = await fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`);
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
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/contents/get-content/67b8bf22dcf4d107a677a21f');
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#FFFFFF',
      }}
    >
{/* Header Section */}
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

{/* Main Content Section */}
<MDBContainer className="flex-grow-1 py-4">
        <MDBTypography 
          tag="h1" 
          className="text-center mt-2 mb-5" 
          style={{
            fontWeight: 'bolder', 
            color: 'rgb(255, 165, 0)', 
            fontSize: '60px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
          }}
        >
          Frequently Asked Questions (FAQs)
        </MDBTypography>

        {faqData.map((item, index) => (
            <MDBCard key={index} className="my-3" style={{ borderRadius: '15px', border: 'none' }}>
                <MDBCardBody 
                className="d-flex justify-content-between align-items-center" // Centers content vertically
                onClick={() => toggleCard(index)}
                style={{ 
                    cursor: 'pointer', 
                    backgroundColor: '#FFDE95', 
                    borderRadius: '15px', 
                    border: 'none', 
                    fontSize: '16px',
                    minHeight: '70px' // Adjust as needed for vertical alignment
                }}
                >
                <MDBCardText className="mb-0">{item.question}</MDBCardText> {/* Ensure no margin on text */}
                <MDBCardText className="mb-0">{expandedCards[index] ? '-' : '+'}</MDBCardText>
                </MDBCardBody>
                
                {expandedCards[index] && (
                <MDBCardBody style={{ backgroundColor: '#f5f5f5', borderRadius: '15px', border: 'none', fontSize: '16px' }}>
                    <MDBCardText className="mb-0">{item.answer}</MDBCardText>
                </MDBCardBody>
                )}
            </MDBCard>
            ))}



      </MDBContainer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Chatbot user={user}/>
    </div>
  );
}

export default FAQ;
