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
import Toast from '../../components/Toast';
import Modal from '../../components/Modal'; 

function FAQGuest() {
  const [backgroundImage, setBackgroundImage] = useState(inquirybg);

  const navigate = useNavigate();
  const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const [expandedCards, setExpandedCards] = useState([false, false, false, false]);

  const [isModalOpen, setModalOpen] = useState(false);
    const [content, setContent] = useState(null);

  const handleLoginClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmLogin = () => {
    navigate('/login')
  };

  

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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#FFFFFF',
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
                <MDBNavbarLink onClick={() => navigate('/services-guest')}>Services</MDBNavbarLink>
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogin}
    />
    </div>
  );
}

export default FAQGuest;
