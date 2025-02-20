import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import subheaderImage from '../../images/promobg.jpg';
import promoImage1 from '../../images/promo1.jpg';
import promoImage2 from '../../images/promo2.jpg';
import promoImage3 from '../../images/promo3.jpg';
import Toast from '../../components/Toast';
import Modal from '../../components/Modal'; 

function PromosGuest() {
  const navigate = useNavigate();
  const location = useLocation();

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

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink 
                    onClick={() => navigate('/services-guest')}
                >
                    Services
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos-guest')} style={{ color: 'rgb(255, 165, 0)', fontWeight: 'bold' }}  >Promos</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry-guest')}>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => {navigate('/login')}}
                style={{
                  margin: '0 25px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, Guest
              </span>
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

      <MDBTypography 
            tag="h1" 
            className="text-center mt-5" 
            style={{
                fontWeight: 'bolder', 
                color: 'rgb(255, 165, 0)', 
                fontSize: '35px', 
            }}
            >
            BOOK YOUR NEXT VACATION WITH OUR SALE!!!
        </MDBTypography>

      <MDBContainer className="my-4">
        <MDBRow>
          {/* Column 1 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={promoImage1}
              alt="Promo 1"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            />
            <h5 className="mt-2" style={{ fontWeight: 'bold', padding: '25px' }}>
                FOR AS LOW AS <span style={{ color: 'rgb(255, 165, 0)' }}>PHP 3,999</span>
            </h5>

            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/services-guest')}
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
                BOOK NOW
            </button>

          </MDBCol>

          {/* Column 2 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={promoImage2}
              alt="Promo 2"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover' }} 
            />

            <h5 className="mt-2" style={{ fontWeight: 'bold', padding: '25px' }}>
                FOR AS LOW AS <span style={{ color: 'rgb(255, 165, 0)' }}>PHP 4,999</span>
            </h5>

            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/services-guest')}
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
                BOOK NOW
            </button>
          </MDBCol>

          {/* Column 3 */}
          <MDBCol md="4" className="mb-4 d-flex flex-column align-items-center">
            <MDBCardImage
              src={promoImage3}
              alt="Promo 3"
              className="img-fluid"
              style={{ width: '300px', height: '300px', objectFit: 'cover' }} 
            />
            <h5 className="mt-2" style={{ fontWeight: 'bold', padding: '25px' }}>
                FOR AS LOW AS <span style={{ color: 'rgb(255, 165, 0)' }}>PHP 3,999</span>
            </h5> 

            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/services-guest')}
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
                BOOK NOW
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
                <h5 className="text-uppercase mb-4 font-weight-bold" style={{fontWeight: 'bold'}}>FOLLOW US</h5>
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

    </div>
  );
}

export default PromosGuest;
