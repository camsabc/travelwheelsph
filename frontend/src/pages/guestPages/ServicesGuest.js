import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal'; 
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBFooter,
  MDBCard
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import subheaderImage from '../../images/servicesbg.jpg';
import servicesImage1 from '../../images/services1.jpg';
import servicesImage2 from '../../images/services2.jpg';
import servicesImage3 from '../../images/services3.jpg';
import servicesImage4 from '../../images/services4.jpg';
import servicesImage5 from '../../images/services5.jpg';
import servicesImage6 from '../../images/services6.jpg';
import servicesImage7 from '../../images/services7.jpg';
import servicesImage8 from '../../images/services8.jpg';
import servicesImage9 from '../../images/services9.jpg';
import servicesImage10 from '../../images/services10.jpg';

import passportbg from '../../images/passportbg.jpg';
import ChatbotGuest from './ChatbotGuest';

function ServicesGuest() {
  const navigate = useNavigate();
  const [selectedRide, setSelectedRide] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('Flights'); 
  const [user, setUser] = useState(null);

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
    fetchData();
}, []);


  return (
    <div className="d-flex flex-column min-vh-100">

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

      {/* Subheader Section */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          backgroundImage: `url(${subheaderImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          I TRAVELLED WITH TRAVELTAYO
        </div>
      </div>

      {/* Main Content Section: Row of Images with 3 Columns */}
      <MDBContainer className="my-4">
        <MDBRow>
          {/* Column 1 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage1}
              alt="Service 1"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }}
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/services-pack-guest')}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                TOUR PACKAGES
            </button>
          </MDBCol>

          {/* Column 2 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage2}
              alt="Service 2"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {navigate('/hotel-guest')}}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                HOTEL BOOKING
            </button>
          </MDBCol>

          {/* Column 3 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage3}
              alt="Service 3"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/passport-guest')}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                PASSPORT APPOINTMENT
            </button>
          </MDBCol>

          {/* Column 4 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage4}
              alt="Service 4"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/flight-guest')}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                FLIGHT BOOKING
            </button>
          </MDBCol>

          {/* Column 5 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage5}
              alt="Service 5"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/services-ride-guest')}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                CAR RENTAL
            </button>
          </MDBCol>

          {/* Column 6 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage6}
              alt="Service 6"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/transfer-guest')}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                TRANSFER
            </button>
          </MDBCol>

          {/* Column 7 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage10}
              alt="Service 7"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/visa-guest')}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                VISA SERVICES
            </button>
          </MDBCol>

          {/* Column 8 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage9}
              alt="Service 8"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/insurance-guest')}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                TRAVEL INSURANCE
            </button>
          </MDBCol>

          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
  <MDBCardImage
    src={servicesImage8}
    alt="Service 9"
    className="img-fluid"
    style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
  />
  <button 
    type="button" 
    className="btn btn-primary"
    onClick={() => navigate('/services-educ-guest')}
    style={{ 
      fontWeight: 'bold',
      fontSize: '14px', 
      width: '80%', 
      borderRadius: '30px', 
      backgroundColor: 'rgb(255, 165, 0)', 
      border: 'none', 
      padding: '10px 20px' 
    }}
  >
    EDUCATIONAL TOUR
  </button>
</MDBCol>

          {/* Column 10 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={servicesImage7}
              alt="Service 10"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/mice-guest')}
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '80%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                MICE
            </button>
          </MDBCol>

        </MDBRow>
      </MDBContainer>

      {/* Footer Section */}
      <MDBFooter bgColor="light" className="text-start text-lg-left mt-auto">
        <div className="container text-left text-md-left">
            <div className="row mt-2 mb-2">
{/* Column 1 */}
<div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
    <h5 className="text-uppercase mt-2 mb-4 font-weight-bold" style={{ fontWeight: 'bold' }}>FOLLOW US</h5>
    
        {/* Social Media Icons Row */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* Facebook Button */}
            <a 
                href="https://www.facebook.com/TravelTayoCarRentalandTours" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(255, 165, 0)', // Orange
                    color: 'white',
                    textDecoration: 'none',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%', // Makes it circular
                    fontSize: '24px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <i className="fab fa-facebook-f"></i>
            </a>

            {/* Instagram Button */}
            <a 
                href="https://www.instagram.com/traveltayoph/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(255, 165, 0)', // Orange
                    color: 'white',
                    textDecoration: 'none',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%', // Makes it circular
                    fontSize: '24px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <i className="fab fa-instagram"></i>
            </a>
        </div>
    </div>

            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mt-4 mb-2 font-weight-bold">Business Hours:</h6>
                <p>
                    Monday - Saturday: 8AM - 7 PM
                </p>
            </div>

            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mt-4 mb-2 font-weight-bold">Business Address: </h6>
                <p>
                    Office Unit 2, Hersyl Building, Blk 5 Lot 25 Phase4, Golden City Subdivision, Brgy. Dila, Santa Rosa, Philippines
                </p>
            </div>

            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mt-4 text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/about-us-guest')}>ABOUT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/inquiry-guest')}>CONTACT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/faq-guest')}>FAQS</h6>
            </div>
    </div>
  </div>

</MDBFooter>

<ChatbotGuest/>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogin}
       />
    </div>
    
  );
}

export default ServicesGuest;
