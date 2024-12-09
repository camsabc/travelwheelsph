import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardImage,
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import reqbg from '../images/rq_bg.jpg';
import Toast from '../components/Toast';

function RequestQuotation() {
  const [backgroundImage, setBackgroundImage] = useState(reqbg);

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showToast('Inquiry submitted successful!', 'success');
  };

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
    onClick={() => navigate('/home-user', { state: { email: user.email }})} 
  />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/services', { state: { email: user.email }})}>Services</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
                <MDBNavbarLink 
                    onClick={() => navigate('/inquiry')}
                    style={{ color: 'rgb(255, 165, 0)' }} 
                >
                    Inquiry
                </MDBNavbarLink>
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
                Hi, {user ? user.firstname : 'Guest'}
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      {/* Main Content Section */}
      <MDBContainer className="flex-grow-1 py-4">
        <div className="d-flex justify-content-center">
            <MDBCard
            style={{
                maxWidth: '1200px',
                width: '100%',
                marginBottom: '50px',
                backgroundColor: 'rgba(255, 255, 255)',
                padding: '20px',
                borderRadius: '15px',
            }}
            >
                <MDBRow className="d-flex align-items-center justify-content-center mt-5">
                    <MDBCol size="auto">
                    <MDBIcon
                        icon="check-circle"
                        size="5x"
                        className="me-3"
                        style={{color: '#39B54A' }}
                    
                    />
                    </MDBCol>
                    <MDBCol size="auto">
                        <p className="h1 mb-0" style={{color: '#39B54A', fontWeight: 'bolder' }}>We’ve received your request for quotation!</p>
                    </MDBCol>
                </MDBRow>

                <MDBCol className="d-flex align-items-center justify-content-center mt-5">
                    <p className="h4 mb-0">Expect a response within 3-5 business days.</p>
                </MDBCol>
                <MDBCol className="d-flex align-items-center justify-content-center mt-1">
                    <p className="h4 mb-0">Thank you!</p>
                </MDBCol>
                <MDBCol className="d-flex align-items-center justify-content-center mt-4 mb-3">
                <p 
                    className="h4" 
                    style={{ textDecoration: 'underline', cursor: 'pointer', color: '#FFA500' }} 
                    onClick={() => navigate('/home-user', { state: { email: user.email }})}
                    >
                    Back to Homepage
                </p>
                </MDBCol>


            </MDBCard>
        </div>
        </MDBContainer>



      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default RequestQuotation;
