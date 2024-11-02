import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
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
  MDBFooter
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

const HomepageUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <>
    {/* HEADER */}
      <div className="bg-white py-2" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
        <MDBCardImage
    src={logo}
    style={{ width: '200px', cursor: 'pointer' }}
    alt="Header Logo"
    onClick={() => navigate('/home-user', { state: { email: user.email }})} 
  />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink 
                      onClick={() => navigate('/services', { state: { email: user.email }})}
                  >
                      Services
                  </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
               <MDBNavbarLink onClick={() => navigate('/inquiry', { state: { email: user.email }})}>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => navigate('/profile', { state: { email: user.email }})}
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



      <div style={{ width: '100vw', overflow: 'hidden' }}>
      <div
        className="position-relative"
        style={{
          width: '100%',
          display: 'flex',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {logos.map((logo, index) => (
          <div key={index} style={{ minWidth: '100%' }}>
            <MDBCardImage
              src={logo}
              alt={`Logo ${index + 1}`}
              className="img-fluid"
              style={{
                width: '100%', 
                height: '350px', 
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>


        <MDBTypography 
            tag="h1" 
            className="mt-3" 
            style={{
                fontWeight: '600', 
                color: 'black', 
                fontSize: '20px', 
                marginLeft: '20px'
            }}
            >
            SCHEDULE YOUR NEXT ADVENTURE
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
                className="mt-2" 
                style={{
                    fontWeight: '600', 
                    color: 'black', 
                    fontSize: '30px', 
                    marginLeft: '30px'
                }}
            >
                WHAT'S THE NEXT DESTINATION?
            </MDBTypography>
        </MDBCol>
        
        {/* Column for the button */}
        <MDBCol size="4" className="d-flex justify-content-end"> {/* Adjust size based on the layout you want */}
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/services-portal', { state: { serviceName: 'Tour', email: user.email } })}
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

 







<div className="my-4" style={{ width: '100%', overflow: 'hidden' }}>
  <div
    className="position-relative"
    style={{
      width: '100%',
      height: '700px',
      display: 'flex',
      transition: 'transform 0.5s ease',
      transform: `translateX(-${activeIndex * 100}%)`,
    }}
  >
    {slides.map((slide, index) => (
      <div
        key={index}
        style={{
          minWidth: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '80%', 
            height: '80%', 
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
            fontSize: '40px'
          }}
        >
          {slide.label}
        </h3>
      </div>
    ))}
  </div>
</div>






    <div className="my-1" style={{ width: '100%' }}>
  <MDBRow className="align-items-center mt-3" style={{ marginLeft: '50px', style: '80%' }}>
    <MDBCol size="7">
      <MDBTypography
        tag="h1"
        className="mt-2"
        style={{
          fontWeight: 'bolder',
          color: 'rgb(255, 165, 0)',
          fontSize: '30px',
          marginLeft: '30px',
        }}
      >
        CLIENT'S FEEDBACK
      </MDBTypography>
    </MDBCol>

    <MDBCol size="4" className="d-flex justify-content-end">
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
  <div className="my-4" style={{ width: '100%', overflow: 'hidden' }}>
    <div
      className="position-relative"
      style={{
        width: '100%',
        height: '700px', // Adjusted height for shorter images
        display: 'flex',
        transition: 'transform 0.5s ease',
        transform: `translateX(-${activeIndex * 100}%)`,
      }}
    >
      {feedbacks.map((feedback, index) => (
        <div key={index} style={{ minWidth: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '80%', height: '80%', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
            <MDBCardImage
              src={feedback.img}
              alt={`Feedback ${index + 1}`}
              className="img-fluid"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* 5-star rating below the picture */}
          <div className="mt-2 d-flex justify-content-center" style={{ marginTop: '20px' }}>
            <i className="fas fa-star text-warning" style={{ fontSize: '2rem', margin: '0px 2px' }}></i>
            <i className="fas fa-star text-warning" style={{ fontSize: '2rem', margin: '0px 2px' }}></i>
            <i className="fas fa-star text-warning" style={{ fontSize: '2rem', margin: '0px 2px' }}></i>
            <i className="fas fa-star text-warning" style={{ fontSize: '2rem', margin: '0px 2px' }}></i>
            <i className="fas fa-star text-warning" style={{ fontSize: '2rem', margin: '0px 2px' }}></i>
          </div>
        </div>
      ))}
    </div>
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
                <h6 className="mt-4 text-uppercase mb-2 font-weight-bold ms-4">ABOUT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4">CONTACT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/faq', { state: { email: user.email }})}>FAQS</h6>
            </div>
    </div>
  </div>

</MDBFooter>
    </>
  );
};

export default HomepageUser;
