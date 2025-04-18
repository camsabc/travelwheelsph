import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

import {
  MDBContainer,
  MDBCard,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import flightsbg from '../../images/flightsbg.jpg';

import Modal from '../../components/Modal'; 

import educ1 from '../../images/educ1.jpg';
import educ2 from '../../images/educ2.jpg';
import educ3 from '../../images/educ3.png';

import pack1 from '../../images/pack1.jpg';
import pack2 from '../../images/pack2.jpg';
import pack3 from '../../images/pack3.jpg';
import pack4 from '../../images/pack4.jpg';
import pack5 from '../../images/pack5.jpg';
import pack6 from '../../images/pack6.jpg';
import ChatbotGuest from './ChatbotGuest';

function ServicesEducGuest() {

  const navigate = useNavigate();  
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);
  const [content, setContent] = useState(null);

  const [educs, setEducs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
  
  
  const getImageForEduc = (picsValue) => {
    switch (picsValue) {
      case 1:
        return content?.educImage1 ||  educ1;
      case 2:
        return content?.educImage2 ||  educ2;
      case 3:
        return content?.educImage3 ||  educ3;
      default:
        return null; 
    }
  };

  const getImageForPack = (picsValue) => {
    switch (picsValue) {
      case 1:
        return pack1;
      case 2:
        return pack2;
      case 3:
        return pack3;
      case 4:
        return pack4;
      case 5:
        return pack5;
      case 6:
        return pack6;
    default:
        return null; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
            try {
                const educsResponse = await fetch(`https://travelwheelsph.onrender.com/api/educs/get-all-educs`);
                const educsData = await educsResponse.json();
                if (educsData.error) {
                    setError(educsData.error);
                } else {
                    setEducs(educsData);
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
        backgroundImage: `url(${content?.educBackgroundImage || ''})`,
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
              EDUCATIONAL TOUR
            </MDBTypography>
        
            <MDBCard style={{ borderRadius: '15px', padding: '20px', backgroundColor: '#fff', marginTop: '10px', marginBottom: '10px' }}>
              <MDBRow>
                {educs.map((educ) => (
                  <MDBCol md="6" lg="4" className="mb-4 align-items-center" key={educ._id} style={{ position: 'relative' }}>
                    <div
                      onClick={() => navigate(`/educ-guest/${educ._id}`)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                    >
                      <MDBCardImage
                        src={getImageForEduc(educ.pics)}
                        alt={educ.name}
                        style={{ height: '350px', width: '100%', objectFit: 'cover', objectPosition: 'center', marginBottom: '-20px' }}
                      />
                      {/* Text overlay */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-10px',
                        left: '10px',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '35px',
                        fontWeight: 'bolder', 
                        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
                      }}>
                        PACKAGE {educ.num}
                      </div>
                    </div>
                  </MDBCol>
                ))}
              </MDBRow>
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

export default ServicesEducGuest;
