import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import inquirybg from '../images/inquirybg.jpg';
import map from '../images/map.jpg';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import Toast from '../components/Toast';

function TermsAndConditionsVisa() {
  const [backgroundImage, setBackgroundImage] = useState(inquirybg);

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
          <MDBCard style={{ maxWidth: '1200px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
            
            <MDBTypography tag="h5" className="text-start mb-2 mt-3" style={{paddingLeft: "20px", fontWeight: 'bolder'}}>
              TERMS AND CONDITIONS:
            </MDBTypography>

            <MDBTypography tag="h5" className="text-start mb-4" style={{paddingLeft: "20px", fontWeight: 'bolder'}}>
              I  allow Travel Tayo Car Rental and Tours  to process my papers for my visa application. I am fully aware of the following rules and agreements:
            </MDBTypography>

            <ul style={{paddingLeft: "50px", fontWeight: "bold", paddingBottom: "10px", fontSize: '18px', marginRight: '10px'}}>
                <li> Travel Tayo Car Rental and Tours  will collect all the needed requirements based on list of requirements provided by the embassy. </li>
                <li> Travel Tayo Car Rental and Tours  will only process the visa application once a week, every Friday. </li>
                <li> Must submit the documents of the applicant not later than 2-3 months prior the departure date. </li>
                <li> Once submitted, those with incomplete documents will be given a maximum of 1 week to comply for the documents. Failure to comply, Travel Tayo Car Rental and Tours  will not be responsible for any delay caused by this which may cause forfeiture of payment.  </li>
                <li> Approval or denial of the visas is given by the embassy, not by Travel Tayo Car Rental and Tours  and will not be liable for any decision made by the embassy.  </li>
                <li> Broken Passport is not accepted/at least 6 months valid. Must have signature and have at least 2 blank pages.  </li>
                <li> Note: bio-page of the passport should have a signature of the passenger  </li>
                <li> If visa is denied, will follow the agreement that payment is non-refundable. </li>
                <li> Note: No visas shall be entertained without this agreement. Please fill-out the needed information. </li>
            </ul>
            
          </MDBCard>
        </div>
      </MDBContainer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default TermsAndConditionsVisa;
