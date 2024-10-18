import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import Toast from '../components/Toast';

function UpcomingBooking() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  useEffect(() => {
    if (email) {
      fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setUser(data);
            return fetch(`https://travelwheelsph.onrender.com/api/bookings/get-all-bookings-by-email/${email}`);
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setBookings(data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          setError('Failed to fetch data.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [email]);

  const handleDetailsClick = (bookingId, index) => {
    navigate('/details-booking', { state: { id: bookingId, email: user.email, index } });
  };

  const handleCancelClick = async (bookingId) => {
      try {
        const response = await fetch(`https://travelwheelsph.onrender.com/api/bookings/delete-booking/${bookingId}`, {
            method: 'DELETE',  // Use DELETE for deletion
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (result.error) {
            setError(result.error); 
            return;
        }

        showToast('Booking deleted successfully!', 'success');
        navigate(-1)
    } catch (err) {
        console.error('Error deleting booking:', err);
        setError('Failed to delete booking.');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#eee', fontFamily: "'Poppins', sans-serif" }}>
      
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
                <span style={{ cursor: 'pointer' }} onClick={() => navigate('/services', { state: { email: user.email }})}>Services</span>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => navigate('/profile', { state: { email: user.email } })}
                style={{
                  margin: '0 15px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, {user?.firstname}
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      {/* Main Content Section */}
      <MDBContainer className="flex-grow-1 py-5">

        {/* Title and Line */}
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: 'bolder', paddingBottom: '10px', color: 'rgb(61, 132, 185)' }}>UPCOMING BOOKINGS</h2>
          <hr style={{ width: '100%', margin: '0 auto', borderTop: '5px solid rgb(255, 165, 0)', paddingBottom: '10px', opacity: 1 }} />
        </div>

        {bookings.length > 0 ? (
          <MDBRow>
            {bookings.map((booking, index) => (
              <MDBCol md="6" lg="4" className="mb-4" key={booking.id || `fallback-${Math.random()}`}>
                <MDBCard style={{ minHeight: '175px', position: 'relative', backgroundColor: 'rgb(255, 222, 89)' }}>
                  <MDBCardBody>
                    <MDBTypography tag="h3" style={{ fontWeight: 'bolder', textAlign: 'center', marginBottom: '1rem', color: 'white' }}>
                      BOOKING #{index + 1}
                    </MDBTypography>

                    <MDBTypography tag="h6" style={{ fontWeight: 'bold', textAlign: 'start' }}>
                      {booking.type}
                    </MDBTypography>

                    <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                      Date: {new Date(booking.startDate).toLocaleDateString()} <br />
                    </MDBTypography>

                    <MDBTypography tag="h6" style={{ textAlign: 'start' }}>
                      <span style={{ fontWeight: 'bold' }}>Status:</span> {booking.status}
                    </MDBTypography>

                    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MDBBtn
                        rounded
                        size="sm"
                        style={{
                          backgroundColor: 'white',
                          width: '200px',
                          height: '40px',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                        onClick={() => handleDetailsClick(booking._id, index)}
                      >
                        MORE DETAILS
                      </MDBBtn>
                      <MDBBtn
                        rounded
                        size="sm"
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          marginLeft: '5px',
                          width: '100px',
                          height: '40px',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                        onClick={() => handleCancelClick(booking._id)}
                      >
                        CANCEL
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        ) : (
          <div className="text-center" style={{ padding: '20px', fontSize: '1.25rem', fontWeight: 'bold' }}>No bookings found.</div>
        )}
      </MDBContainer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default UpcomingBooking;
