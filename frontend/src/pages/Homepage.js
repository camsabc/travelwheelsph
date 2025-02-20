import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal'; 
import './global.css'

import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBFooter,
  MDBCarousel, MDBCarouselItem
} from 'mdb-react-ui-kit';

import promoImage1 from '../images/h1.png';
import promoImage2 from '../images/h2.png';
import promoImage3 from '../images/h3.png';
import f1 from '../images/f1.png';
import f2 from '../images/f2.png';
import f3 from '../images/f3.png';

import logo from '../images/header.jpg';
import bg from '../images/bg.png';
import bg2 from '../images/home_bg2.jpg';
import bg3 from '../images/home_bg.jpg';

const Homepage = () => {
  
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

  const slides = [
    { src: promoImage1, label: 'DAVAO' },
    { src: promoImage2, label: 'BORACAY' },
    { src: promoImage3, label: 'TAIWAN' },
  ];

  const feedbacks = [
    { img: f1, label: 'Feedback 1' },
    { img: f2, label: 'Feedback 2' },
    { img: f3, label: 'Feedback 3' },
  ];

  const logos = [
    bg,
    bg2,
    bg3
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);


  const navigate = useNavigate(); 

  return (
    <>
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

    {/* LOGO SLIDER */}
    <div
    className="position-relative"
    style={{
      width: '100%',
      display: 'flex',
      transition: 'transform 0.5s ease',
      transform: `translateX(-${activeIndex * 100}%)`,
      position: 'absolute',
      zIndex: 0,
    }}
    >
    {logos.map((logo, index) => (
      <div key={index} style={{ minWidth: '100%', position: 'relative' }}>
        <MDBCardImage
          src={logo}
          alt={`Logo ${index + 1}`}
          className="img-fluid"
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover'
          }}
        />
        {/* Overlay Text */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '7%',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'left',
            textTransform: 'uppercase',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            width: '50%'
          }}
        >
          Inspiring destinations are just within your reach.
        </div>
      </div>
    ))}
    </div>



 
    <div className="d-flex justify-content-center flex-wrap gap-3 my-4">
    {[
        { icon: "fa-torii-gate", label: "Tour" },
        { icon: "fa-bed", label: "Hotel" },
        { icon: "fa-passport", label: "Passport Assistance" },
        { icon: "fa-plane", label: "Flights" },
        { icon: "fa-car", label: "Car Rental" },
        { icon: "fa-bus", label: "Transfers" },
        { icon: "fa-address-card", label: "VISA" },
        { icon: "fa-plane-circle-check", label: "Travel Insurance" },
        { icon: "fa-globe", label: "Educational Tour" },
        { icon: "fa-handshake", label: "MICE" }
    ].map((item, i) => (
        <div key={i} className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
            {/* Circular Icon */}
            <div 
                style={{
                    width: '50px', 
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgb(255, 165, 0)', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    marginBottom: '5px',
                }}
            >
                <i className={`fas ${item.icon}`} style={{ fontSize: '1.2rem' }}></i> 
            </div>

            <span style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center', opacity: '0.7'}}>
                {item.label}
            </span>
        </div>
    ))}
</div>



      <div style={{ width: '100vw', overflow: 'hidden', marginTop: '25px' }}>
        <MDBTypography 
            tag="h1" 

            style={{
                fontWeight: 'bolder', 
                color: '#808080', 
                fontSize: '18px', 
                marginLeft: '32px'
            }}
            >
            SCHEDULE YOUR NEXT ADVENTURE!
        </MDBTypography>

        <div 
          className="my-1" 
          style={{  
              width: '98%',  // Set the desired width
              marginLeft: '-10' // Centers the div horizontally
          }}
        >
    <MDBRow className="align-items-center">
        {/* Column for the text with no left padding */}
        <MDBCol size="7" > {/* Adjust size based on the layout you want */}
            <MDBTypography 
                tag="h1" 
                className="" 
                style={{
                    fontWeight: 'bolder', 
                    color: 'black', 
                    fontSize: '30px', 
                    marginLeft: '30px'

                }}
            >
                What's the next destination?
            </MDBTypography>
        </MDBCol>
        
        {/* Column for the button */}
        <MDBCol size="4" className="d-flex justify-content-end"> {/* Adjust size based on the layout you want */}
            <button 
                type="button" 
                onClick={() => navigate('/services-pack-guest')}
                className="btn btn-primary"
                style={{ 
                    fontWeight: 'bold',
                    fontSize: '14px', 
                    width: '30%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
            >
                VIEW ALL
            </button>
        </MDBCol>
    </MDBRow>
</div>





<div className="my-4" style={{ width: '100%', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  {slides.map((slide, index) => (
    <div
      key={index}
      style={{
        width: '390px',       
        height: '390px',
        margin: '10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '10px',
        }}
      >
        <MDBCardImage
          src={slide.src}
          alt={`Promo ${index + 1}`}
          className="img-fluid"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onClick={() => {navigate('/destination-form-guest')}}
        />
      </div>
      <h3
        style={{
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: '5px',
          textAlign: 'center', 
          marginTop: '5px', 
          color: '#FACF20',
          fontSize: '30px'
        }}
      >
        {slide.label}
      </h3>
    </div>
  ))}
</div>








    <div className="my-2" style={{ width: '100%' }}>
  <MDBRow className="align-items-center mt-4" style={{ marginLeft: '30px', width: '100%' }}>
    <MDBCol size="7">
      <MDBTypography
        tag="h1"
        className="mt-2"
        style={{
          fontWeight: 'bolder',
          color: 'rgb(255, 165, 0)',
          fontSize: '36px',
        }}
      >
        CLIENT'S FEEDBACK
      </MDBTypography>
    </MDBCol>

    <MDBCol size="4" className="d-flex justify-content-end mt-2">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => { navigate('/feedback-guest'); }}
        style={{
          fontWeight: 'bold',
          fontSize: '14px',
          backgroundColor: 'rgb(255, 165, 0)',
          border: 'none',
        }}
      >
        VIEW ALL
      </button>
    </MDBCol>
  </MDBRow>

  {/* Feedback Carousel */}
  <div className="my-2" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  {feedbacks.map((feedback, index) => (
    <div
      key={index}
      style={{
        width: '390px',         
        margin: '10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '390px',
          height: '390px',       
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '10px',
        }}
      >
        <MDBCardImage
          src={feedback.img}
          alt={`Feedback ${index + 1}`}
          className="img-fluid"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      
      {/* 
      <div className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
        {Array(5).fill().map((_, i) => (
          <i key={i} className="fas fa-star text-warning" style={{ fontSize: '1.5rem', margin: '0px 2px' }}></i>
        ))}
      </div>
      */}


    </div>
  ))}
</div>






</div>








      </div>

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

<Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogin}
       />
    </>
  );
};

export default Homepage;
