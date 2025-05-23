import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import bg from '../../images/bg.jpg';
import ChatbotGuest from './ChatbotGuest';

function DetailsOneEducGuest() {
  const [user, setUser] = useState(null);
  const [educ, setEduc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const userResponse = await fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`);
          const userData = await userResponse.json();
          if (userData.error) {
            setError(userData.error);
            return;
          }
          setUser(userData);
        }

        const educResponse = await fetch(`https://travelwheelsph.onrender.com/api/educs/get-educ-by-id/${id}`);
        const educData = await educResponse.json();
        if (educData.error) {
          setError(educData.error);
          return;
        }
        setEduc(educData);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, email]);


const handleQuotationSubmit = async (e) => {
    navigate(`/educ-quotations-guest/${educ._id}`)
};



  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
<div
  className="d-flex flex-column min-vh-100"
  style={{
    backgroundImage: `url(${bg})`,
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

      {/* Main Content Section */}
      <MDBTypography 
        tag="h1" 
        className="text-center mb-3 mt-4" 
        style={{
            fontWeight: 'bolder', 
            color: 'white', 
            fontSize: '60px', 
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
        }}
        >
        PACKAGE {educ.num}
        </MDBTypography>

      <MDBContainer className="flex-grow-1 d-flex align-items-center justify-content-center">
        
        <MDBCard style={{ maxWidth: '900px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
          
          <MDBCardBody>
            <MDBTypography tag="h5" className="text-start mb-2" style={{fontWeight: 'bold'}}>PACKAGE {educ.num} DETAILS AND ITINERARY:</MDBTypography>
            <MDBTypography tag="h6" className="text-start mb-4"> <strong>Pax: </strong> {educ.pax} </MDBTypography>

              <MDBTypography tag="h6" className="text-start mb-2" style={{fontWeight: 'bold'}}>Iterinary:</MDBTypography>

              <MDBTypography>
                8 am to 10 am - Rizal Park (Guided tour about Dr. Jose Rizal and Philippine history.) <br/>
                11 am to 12 nn - National Museum of the Philippines (Explore Filipino art, culture, and history exhibits.)  <br/>
                12 nn to 1 pm - Lunch (Buy at any fast-food chain or eat inside the bus.)  <br/>
                1 pm to 3 pm - Manila Ocean Park (Educational tour of marine life exhibits.)  <br/>
                4 pm to 7 pm - Star City  <br/> <br/>

                Enjoy the day!
              </MDBTypography>

              <MDBRow className="mt-4">
                <MDBCol md="12" className="d-flex align-items-center">

            <button 
                type="button" 
                className="btn btn-primary"
                style={{ 
                    fontWeight: 'bold',
                    width: '100%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px' 
                }}
                onClick={handleQuotationSubmit} 
            >
                REQUEST QUOTATION
            </button>

                </MDBCol>

                </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      <ChatbotGuest />
    </div>
  );
}

export default DetailsOneEducGuest;
