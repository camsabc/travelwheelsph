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

import Modal from '../../components/Modal'; 

import pack1 from '../../images/dom1.PNG';
import pack2 from '../../images/dom2.PNG';
import pack3 from '../../images/dom3.PNG';
import pack4 from '../../images/int1.PNG';
import pack5 from '../../images/int2.PNG';
import pack6 from '../../images/int3.PNG';
import ChatbotGuest from './ChatbotGuest';

function ServicesPackGuest() {

  const navigate = useNavigate();  
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);

  const [packs, setPacks] = useState([]);

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
  
  

  const getImageForPack = (picsValue) => {
    switch (picsValue) {
      case 1:
        return content?.domesticImage1 || "Loading Image...";
      case 2:
        return content?.domesticImage2 || "Loading Image...";
      case 3:
        return content?.domesticImage3 || "Loading Image...";
      case 4:
        return content?.internationalImage1 || "Loading Image...";
      case 5:
        return content?.internationalImage2 || "Loading Image...";
      case 6:
        return content?.internationalImage3 || "Loading Image...";
    default:
        return null; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
            try {
                const packsResponse = await fetch(`http://localhost:3000/api/packs/get-all-packs`);
                const packsData = await packsResponse.json();
                if (packsData.error) {
                    setError(packsData.error);
                } else {
        
                    setPacks(packsData);
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
            TOUR PACKAGES
          </MDBTypography>

          <MDBCard 
            style={{ 
              borderRadius: '15px', 
              padding: '20px', 
              backgroundColor: '#fff', 
              marginTop: '10px', 
              marginBottom: '10px', 
              position: 'relative' 
            }}
          >

         <MDBTypography 
            tag="h3" 
            className="text-start mt-2" 
            style={{ fontWeight: 'bold', color: '#333' }}
          >
            DOMESTIC TOUR
          </MDBTypography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              

              {/* Slide content */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <MDBRow style={{ display: 'flex', justifyContent: 'center' }}>
                  {packs.slice(0, 3).map((pack) => (
                    <MDBCol 
                      md="6" 
                      lg="4" 
                      className="mb-4 align-items-center" 
                      key={pack._id} 
                      style={{ position: 'relative', display: 'inline-block', flexShrink: 0, width: '33%' }}
                    >
                      <div
                        onClick={() => navigate(`/pack-dom-guest/${pack._id}`)}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        <MDBCardImage
                          src={getImageForPack(pack.pics)}
                          alt={pack.name}
                          style={{ height: '350px', width: '100%', objectFit: 'cover', objectPosition: 'center', marginBottom: '-20px' }}
                        />
                      </div>
                    </MDBCol>
                  ))}
                </MDBRow>
              </div>
            </div>
          </MDBCard>



          <MDBCard 
            style={{ 
              borderRadius: '15px', 
              padding: '20px', 
              backgroundColor: '#fff', 
              marginTop: '20px', 
              marginBottom: '10px', 
              position: 'relative' 
            }}
          >

            <MDBTypography 
            tag="h3" 
            className="text-start mt-2" 
            style={{ fontWeight: 'bold', color: '#333' }}
          >
            INTERNATIONAL TOUR
          </MDBTypography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              

              {/* Slide content */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <MDBRow style={{ display: 'flex', justifyContent: 'center' }}>
                  {packs.slice(3, 6).map((pack) => (
                    <MDBCol 
                      md="6" 
                      lg="4" 
                      className="mb-4 align-items-center" 
                      key={pack._id} 
                      style={{ position: 'relative', display: 'inline-block', flexShrink: 0, width: '33%' }}
                    >
                      <div
                        onClick={() => navigate(`/pack-int-guest/${pack._id}`)}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        <MDBCardImage
                          src={getImageForPack(pack.pics)}
                          alt={pack.name}
                          style={{ height: '500', width: '100%', objectFit: 'cover', objectPosition: 'center', marginBottom: '-20px' }}
                        />
                      </div>
                    </MDBCol>
                  ))}
                </MDBRow>
              </div>
            </div>
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

export default ServicesPackGuest;
