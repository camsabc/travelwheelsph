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
import Chatbot from "../components/Chatbot";

import logo from '../images/header.jpg';

import lg1 from '../images/lg1.jpg';
import lg2 from '../images/lg2.jpg';
import lg3 from '../images/lg3.jpg';

const HomepageUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [content, setContent] = useState(null);


  const slides = content ? [
    { src: content.adventureImage1, label: 'DAVAO' },
    { src: content.adventureImage2, label: 'BORACAY' },
    { src: content.adventureImage3, label: 'TAIWAN' },
  ] : [];

  const feedbacks = content ? [
    { img: content.feedbackImage1, label: 'Feedback 1' },
    { img: content.feedbackImage2, label: 'Feedback 2' },
    { img: content.feedbackImage3, label: 'Feedback 3' },
  ] : [];


  const logos = content
  ? [

      `<iframe src="https://www.google.com/maps/embed?pb=!4v1740938048542!6m8!1m7!1skDh_bxXlGpgVlNgdscqU_A!2m2!1d11.94987721533076!2d121.9469231882238!3f114.26280566728494!4f-0.04381137292116932!5f0.7820865974627469" 
      width="1350" height="380" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" scrolling="no" frameborder="0" 
      style="border-radius: 12px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); overflow: hidden;"></iframe>`,

      `<iframe src="https://www.google.com/maps/embed?pb=!4v1740938115799!6m8!1m7!1spIEcK5UrfGg1jkiaeNkGfw!2m2!1d7.073649258285839!2d125.6111223506343!3f211.95818!4f0!5f0.7820865974627469"
      width="1350" height="380" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" scrolling="no" frameborder="0" 
      style="border-radius: 12px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); overflow: hidden;"></iframe>`,

      `<iframe src="https://www.google.com/maps/embed?pb=!4v1740937849107!6m8!1m7!1sqCuHEF_Pa6mBh2lO8TnAhQ!2m2!1d35.35966629101768!2d138.7311853983154!3f359.88742!4f30!5f0.7820865974627469"
      width="1350" height="380" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" scrolling="no" frameborder="0" 
     style="border-radius: 12px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); overflow: hidden;"></iframe>`,
     
    ]
  : [];

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
    <>
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
{logos.map((iframeString, index) => (
  <div key={index} style={{ minWidth: '100%', position: 'relative' }}>
    <div dangerouslySetInnerHTML={{ __html: iframeString }} />
    
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
      {content.bannerText}
    </div>
  </div>
))}

</div>




 
    <div className="d-flex justify-content-center flex-wrap gap-3 my-4">
    {[
      { icon: "fa-torii-gate", label: "Tour Packages", route: "/services-portal", serviceName: "Tour" },
      { icon: "fa-bed", label: "Hotel", route: "/hotel", serviceName: "" },
      { icon: "fa-passport", label: "Passport Assistance", route: "/passport", serviceName: "" },
      { icon: "fa-plane", label: "Flights", route: "/flight", serviceName: "Flight Booking" },
      { icon: "fa-car", label: "Car Rental", route: "/services-portal", serviceName: "Ride" },
      { icon: "fa-bus", label: "Transfers", route: "/services-portal", serviceName: "Transfer" },
      { icon: "fa-address-card", label: "VISA", route: "/services-portal", serviceName: "Visa" },
      { icon: "fa-plane-circle-check", label: "Travel Insurance", route: "/services-portal", serviceName: "Travel Insurance" },
      { icon: "fa-globe", label: "Educational Tour", route: "/services-portal", serviceName: "Educational Tour" },
      { icon: "fa-handshake", label: "MICE", route: "/mice", serviceName: "Special Services" }
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
                onClick={() => navigate(item.route, { state: { serviceName: item.serviceName, email: user.email } })}
            >
                <i className={`fas ${item.icon}`} style={{ fontSize: '1.2rem' }}></i> 
            </div>

            <span style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center', opacity: '0.7'}}>
                {item.label}
            </span>
        </div>
    ))}
</div>







      <div style={{ width: '100vw', overflow: 'hidden', marginTop: '40px' }}>
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
          onClick={() => navigate('/destination-form', { state: { email: user.email } })}
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
        AVAILABLE PROMOS
      </MDBTypography>
    </MDBCol>

    <MDBCol size="4" className="d-flex justify-content-end">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => { navigate('/feedback', { state: { email: user.email }})}}
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
      
      
      <div className="d-flex justify-content-center" style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '20px' }}>
        FOR AS LOW AS <span style={{ color: 'rgb(255, 165, 0)', marginLeft: '7px' }}>{content?.promoText3 || "PHP 3999"}</span>
      </div>


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
                <h6 className="mt-4 text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/about-us', { state: { email: user.email }})}>ABOUT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/inquiry', { state: { email: user.email }})}>CONTACT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/faq', { state: { email: user.email }})}>FAQS</h6>
            </div>
    </div>
  </div>

</MDBFooter>

<Chatbot user={user}/>
    </>
  );
};

export default HomepageUser;
