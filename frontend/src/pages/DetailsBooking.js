import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBTypography,
  MDBBtn
} from 'mdb-react-ui-kit';
import logo from '../images/header.jpg';

function DetailsBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, email, index } = location.state || {}; 
  const [bookingDetails, setBookingDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setLoading(false);
          } else {
            setUser(data);
            return fetch(`http://localhost:3000/api/bookings/get-booking-by-id/${id}`);
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            console.log(data);
            setBookingDetails(data);
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
  }, [id, email]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  // Helper function to render attribute with conditional line break
  const renderAttribute = (label, value) => (
    value ? (
      <>
        {label}: {value}
        <br />
      </>
    ) : null
  );

  return (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#eee', fontFamily: "'Poppins', sans-serif" }}>
      {/* Header Section */}
      <div className="bg-white py-2 mb-1" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
          <MDBCardImage
            src={logo}
            style={{ width: '200px', cursor: 'pointer' }}
            alt="Header Logo"
            onClick={() => navigate('/home-user', { state: { email: user.email } })}
          />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => navigate('/services', { state: { email: user.email } })}>Services</span>
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

        {/* Booking Details Card */}
        {bookingDetails && (
          <MDBCard className="w-100" style={{ overflowX: 'auto', backgroundColor: 'rgb(255, 222, 89)' }}>
            <MDBCardBody>
              <MDBTypography tag="h2" className="text-center mb-4" style={{ fontWeight: 'bold', color: 'white' }}>
                BOOKING #{index + 1}
              </MDBTypography>

              <MDBTypography tag="h5" style={{ fontWeight: 'bold', textAlign: 'start' }}>
                PERSONAL INFORMATION
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                {renderAttribute('LAST NAME', bookingDetails.lastname)}
                {renderAttribute('FIRST NAME', bookingDetails.firstname)}
                {renderAttribute('MIDDLE NAME', bookingDetails.middlename)}
                {renderAttribute('EMAIL', bookingDetails.email)}
                {renderAttribute('CONTACT NUMBER', bookingDetails.contactNumber)}
              </MDBTypography>

              <MDBTypography tag="h5" style={{ paddingTop: '20px', fontWeight: 'bold', textAlign: 'start' }}>
                TRAVEL INFORMATION
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                {renderAttribute('BOOKING START DATE', bookingDetails.startDate && new Date(bookingDetails.startDate).toLocaleDateString())}
                {renderAttribute('BOOKING END DATE', bookingDetails.endDate && new Date(bookingDetails.endDate).toLocaleDateString())}
                {renderAttribute('TIME OF PICKUP', bookingDetails.startDate && new Date(bookingDetails.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }))}
                {renderAttribute('PICKUP LOCATION', bookingDetails.pickupLocation)}
                {renderAttribute('DROP-OFF LOCATION', bookingDetails.dropOffLocation)}
                {renderAttribute('VEHICLE NAME', bookingDetails.vehicleName)}
                {renderAttribute('NUMBER OF PERSONS', bookingDetails.numOfPerson)}
                {renderAttribute('REMARKS', bookingDetails.remarks)}
                {renderAttribute('STATUS', bookingDetails.status)}
              </MDBTypography>

              {/* New Additional Attributes */}
              <MDBTypography tag="h5" style={{ paddingTop: '20px', fontWeight: 'bold', textAlign: 'start' }}>
                ADDITIONAL INFORMATION
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                {renderAttribute('AIRPORT DEPARTURE', bookingDetails.airportDeparture)}
                {renderAttribute('AIRPORT ARRIVAL', bookingDetails.airportArrival)}
                {renderAttribute('PREFERRED HOTEL', bookingDetails.preferredHotel)}
                {renderAttribute('BUDGET RANGE', bookingDetails.budgetRange)}
                {renderAttribute('GENDER', bookingDetails.gender)}
                {renderAttribute('CIVIL STATUS', bookingDetails.civilStatus)}
                {renderAttribute('BIRTH DATE', bookingDetails.birthDate && new Date(bookingDetails.birthDate).toLocaleDateString())}
                {renderAttribute('COUNTRY OF BIRTH', bookingDetails.countryBirth)}
                {renderAttribute('PROVINCE OF BIRTH', bookingDetails.provinceBirth)}
                {renderAttribute('MUNICIPALITY OF BIRTH', bookingDetails.municipalityBirth)}
                {renderAttribute('FATHER\'S FIRST NAME', bookingDetails.firstnameFather)}
                {renderAttribute('FATHER\'S MIDDLE NAME', bookingDetails.middlenameFather)}
                {renderAttribute('FATHER\'S LAST NAME', bookingDetails.lastnameFather)}
                {renderAttribute('FATHER\'S COUNTRY OF CITIZENSHIP', bookingDetails.countryCitizenshipFather)}
                {renderAttribute('MOTHER\'S FIRST NAME', bookingDetails.firstnameMother)}
                {renderAttribute('MOTHER\'S MIDDLE NAME', bookingDetails.middlenameMother)}
                {renderAttribute('MOTHER\'S LAST NAME', bookingDetails.lastnameMother)}
                {renderAttribute('MOTHER\'S COUNTRY OF CITIZENSHIP', bookingDetails.countryCitizenshipMother)}
                {renderAttribute('SPOUSE\'S FIRST NAME', bookingDetails.firstnameSpouse)}
                {renderAttribute('SPOUSE\'S MIDDLE NAME', bookingDetails.middlenameSpouse)}
                {renderAttribute('SPOUSE\'S LAST NAME', bookingDetails.lastnameSpouse)}
                {renderAttribute('APPLICATION TYPE', bookingDetails.applicationType)}
                {renderAttribute('OLD PASSPORT NUMBER', bookingDetails.oldPassportNumber)}
                {renderAttribute('DATE ISSUED', bookingDetails.dateIssued && new Date(bookingDetails.dateIssued).toLocaleDateString())}
                {renderAttribute('ISSUING AUTHORITY', bookingDetails.issuingAuthority)}
                {renderAttribute('FOREIGN PASSPORT HOLDER', bookingDetails.foreignPassportHolder !== undefined ? (bookingDetails.foreignPassportHolder ? 'Yes' : 'No') : '')}
                {renderAttribute('EMERGENCY CONTACT PERSON', bookingDetails.emergencyContactPerson)}
                {renderAttribute('CONTACT NUMBER (FOREIGN)', bookingDetails.contactNumberForeign)}
                {renderAttribute('PROVINCE', bookingDetails.province)}
                {renderAttribute('CITY', bookingDetails.city)}
                {renderAttribute('OCCUPATION', bookingDetails.occupation)}
                {renderAttribute('OFFICE NUMBER', bookingDetails.officeNumber)}
                {renderAttribute('OFFICE DETAILS', bookingDetails.officeDetails)}
                {renderAttribute('FULL ADDRESS', bookingDetails.fullAddress)}
                {renderAttribute('LANDMARK', bookingDetails.landmark)}
                {renderAttribute('ADMIN NOTE', bookingDetails.note)}
              </MDBTypography>

              {/* Conditionally render the button for "Awaiting Payment" status */}
              {bookingDetails.status === 'Awaiting Payment' && (
                <div className="text-center" style={{ paddingTop: '20px' }}>
                  <MDBBtn color="success" onClick={() => navigate('/payment-confirmation', { state: { email: user.email } })}>
                    Proceed to Payment
                  </MDBBtn>
                </div>
              )}
            </MDBCardBody>
          </MDBCard>
        )}

        {/* Floating Button */}
        <MDBBtn
          floating
          color="primary"
          className="position-fixed d-flex align-items-center justify-content-center"
          style={{ bottom: '50px', right: '110px', borderRadius: '50%', width: '50px', height: '50px', backgroundColor: 'white' }}
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left" style={{ fontSize: '24px', color: 'rgb(255, 222, 89)', fontWeight: 'bolder' }}></i>
        </MDBBtn>
      </MDBContainer>
    </div>
  );
}

export default DetailsBooking;
