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



import ride1 from '../../images/ride1.jpg';
import ride2 from '../../images/ride2.jpg';
import ride3 from '../../images/ride3.jpg';
import ChatbotGuest from './ChatbotGuest';


function ServicesRideGuest() {

  const navigate = useNavigate();  
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);

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
  

  const getImageForRide = (picsValue) => {
    switch (picsValue) {
      case 1:
        return content?.rideImage1 || 'Loading Image...';;
      case 2:
        return content?.rideImage2 || 'Loading Image...';;
      case 3:
        return content?.rideImage3 || 'Loading Image...';;
      default:
        return null; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
            try {
                const ridesResponse = await fetch(`http://localhost:3000/api/rides/get-all-rides`);
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
                CAR RENTAL
              </MDBTypography>
          
            <MDBCard style={{ borderRadius: '15px', padding: '20px', backgroundColor: '#fff', marginTop: '10px', marginBottom: '20px' }}>
            <MDBRow>
              {rides.map((ride) => (
                <MDBCol md="6" lg="4" className="mb-4 align-items-center" key={ride._id}>
                  <div
                    onClick={() => navigate(`/ride-guest/${ride._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <MDBCardImage
                      src={getImageForRide(ride.pics)}
                      position="top"
                      alt={ride.name}
                      style={{ height: '70%', width: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>

                  <div className="d-flex flex-column mx-auto" style={{ width: '70%' }}>
                    <MDBTypography tag="h6" className="text-start mt-3" style={{ fontWeight: 'bold' }}>
                      {ride.name}
                    </MDBTypography>
                    <MDBTypography tag="p" className="text-start">
                      Type: {ride.type} <br />
                      Seats: {ride.seat}
                    </MDBTypography>
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

export default ServicesRideGuest;
