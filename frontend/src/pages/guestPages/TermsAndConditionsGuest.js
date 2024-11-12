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

import logo from '../../images/header.jpg';
import inquirybg from '../../images/inquirybg.jpg';
import Toast from '../../components/Toast';

function TermsAndConditionsGuest() {
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
    onClick={() => navigate('/')} 
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

      {/* Main Content Section */}
      <MDBContainer className="flex-grow-1 py-4">
        <div className="d-flex justify-content-center">
          <MDBCard style={{ maxWidth: '1200px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
            
            <MDBTypography tag="h5" className="text-start mb-2 mt-3" style={{paddingLeft: "20px", fontWeight: 'bolder'}}>
              TERMS AND CONDITIONS:
            </MDBTypography>

            <ul style={{paddingLeft: "50px", fontWeight: "bold", paddingBottom: "10px", fontSize: '18px', marginRight: '10px'}}>
                <li> AIRFARE: Book and Buy/ Full payment is required for confirmation and issuance of air ticket. </li>
                <li> TOUR PACKAGE: 50% deposit, remaining balance 2 weeks before the tour. </li>
                <li> The reservation fee is required to secure the slot/s. </li>
                <li> Cancellation fees ( based on total package expense; based on date of tour ) 1 month—50% 2 weeks—75% 1 week– 100%.  </li>
                <li> 2 weeks notification prior the tour day is required for any new reservations/revisions or cancellations.  </li>
                <li> Travel voucher and itinerary will be issued upon completion of the total package amount. </li>
                <li> The Company reserves the right to confirm only reservations covered by deposit or full payment.  </li>
                <li> No refund will be extended for any unused services, cancellation, no show or early departure prior to departure date. </li>
                <li> Cancellation of tour due to circumstances such as a result of fortuitous events or acts of God can be rescheduled (incl. fire, flood, earthquake, storm, hurricane or other natural disaster), war, invasion, acts of foreign enemies, hostilities, civil war). </li>
            </ul>
            
          </MDBCard>
        </div>
      </MDBContainer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default TermsAndConditionsGuest;
