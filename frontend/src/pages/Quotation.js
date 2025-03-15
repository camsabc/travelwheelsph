import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
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

function Quotation() {
  const [user, setUser] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setUser(data);
            return fetch(`http://localhost:3000/api/quotations/get-all-quotations-by-email/${email}`);
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setQuotations(data);
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

  const handleDetailsClick = (quotationId, index) => {
    navigate('/details-quotation', { state: { id: quotationId, email: user.email, index } });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#ffffff' }}>
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

      {/* Main Content Section */}
      <MDBContainer className="flex-grow-1 py-5">
        {/* Title and Line */}
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: 'bolder', paddingBottom: '10px', color: 'rgb(61, 132, 185)' }}>QUOTATIONS</h2>
          <hr style={{ width: '100%', margin: '0 auto', borderTop: '5px solid rgb(255, 165, 0)', paddingBottom: '10px', opacity: 1 }} />
        </div>

        {quotations.length > 0 ? (
          <MDBRow>
            {quotations.map((quotation, index) => (
              <MDBCol md="6" lg="4" className="mb-4" key={quotation.id || `fallback-${Math.random()}`}>
                <MDBCard style={{ border: 'none', boxShadow: 'none', minHeight: '175px', position: 'relative', backgroundColor: 'rgb(241, 241, 240)', borderRadius: '25px' }}>
                <MDBCardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>

                    <MDBTypography tag="h4" style={{ fontWeight: 'bolder', textAlign: 'center', marginBottom: '1rem', color: 'black' }}>
                      QUOTATION #{index + 1}
                    </MDBTypography>

                    <MDBTypography tag="p" style={{ textAlign: 'start', fontSize: '16px', paddingLeft: '10px' }}>
                      {quotation.type} <br />
                      Date: {new Date(quotation.startDate).toLocaleDateString()} <br />
                      Status: {quotation.status} <br />
                    </MDBTypography>

                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                          fontWeight: 'bold',
                          width: '100%',
                          borderRadius: '30px',
                          backgroundColor:  'rgb(255, 165, 0)',
                          border: 'none',
                          padding: '10px 50px',
                          fontSize: '14px',
                          cursor:  'pointer',
                          opacity: 1,
                        }}
                        onClick={() => handleDetailsClick(quotation._id, index)}
              
                      >
                        MORE DETAILS
                      </button>
                    </div>

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        ) : (
          <div className="text-center" style={{ padding: '20px', fontSize: '1.25rem', fontWeight: 'bold' }}>No quotations found.</div>
        )}
      </MDBContainer>

      <button
        onClick={() => navigate('/profile', { state: { email: user.email }})}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '40px',
          backgroundColor: 'rgb(255, 165, 0)',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          padding: '12px',
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          fontSize: '20px',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FaArrowLeft />
      </button>

    </div>
  );
}

export default Quotation;
