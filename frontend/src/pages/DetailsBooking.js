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
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import logo from '../images/header.jpg';
import Chatbot from "../components/Chatbot";

function DetailsBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, email, index } = location.state || {}; 
  const [bookingDetails, setBookingDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSave = () => {
    fetch(`http://localhost:3000/api/bookings/edit-booking/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingDetails)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setBookingDetails(data);
          setIsEditing(false); // Exit edit mode
        }
      })
      .catch(err => {
        console.error('Error updating booking:', err);
        setError('Failed to update booking.');
      });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  const renderAttribute = (label, value, isEditable = false) => {
    if (!value) return null; 

    return isEditable ? (
      <MDBInput
        label={label}
        value={value}
        name={label.replace(' ', '').toLowerCase()}
        onChange={handleInputChange}
        style={{marginBottom: '10px'}}
      />
    ) : (
      <>
        {label}: {value}
        <br />
      </>
    );
  };

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
                {renderAttribute('LAST NAME', bookingDetails.lastname, isEditing)}
                {renderAttribute('FIRST NAME', bookingDetails.firstname, isEditing)}
                {renderAttribute('MIDDLE NAME', bookingDetails.middlename, isEditing)}
                {renderAttribute('EMAIL', bookingDetails.email, isEditing)}
                {renderAttribute('CONTACT NUMBER', bookingDetails.contactNumber, isEditing)}
              </MDBTypography>

              <MDBTypography tag="h5" style={{ paddingTop: '20px', fontWeight: 'bold', textAlign: 'start' }}>
                TRAVEL INFORMATION
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                {renderAttribute('BOOKING START DATE', bookingDetails.startDate && new Date(bookingDetails.startDate).toLocaleDateString(), isEditing)}
                {renderAttribute('BOOKING END DATE', bookingDetails.endDate && new Date(bookingDetails.endDate).toLocaleDateString(), isEditing)}
                {renderAttribute('TIME OF PICKUP', bookingDetails.startDate && new Date(bookingDetails.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }))}
                {renderAttribute('PICKUP LOCATION', bookingDetails.pickupLocation, isEditing)}
                {renderAttribute('DROP-OFF LOCATION', bookingDetails.dropOffLocation, isEditing)}
                {renderAttribute('VEHICLE NAME', bookingDetails.vehicleName, isEditing)}
                {renderAttribute('NUMBER OF PERSONS', bookingDetails.numOfPerson, isEditing)}
                {renderAttribute('REMARKS', bookingDetails.remarks, isEditing)}
                {renderAttribute('STATUS', bookingDetails.status)}
              </MDBTypography>

              {/* New Additional Attributes */}
              <MDBTypography tag="h5" style={{ paddingTop: '20px', fontWeight: 'bold', textAlign: 'start' }}>
                ADDITIONAL INFORMATION
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                {renderAttribute('AIRPORT DEPARTURE', bookingDetails.airportDeparture, isEditing)}
                {renderAttribute('AIRPORT ARRIVAL', bookingDetails.airportArrival, isEditing)}
                {renderAttribute('PREFERRED HOTEL', bookingDetails.preferredHotel, isEditing)}
                {renderAttribute('BUDGET RANGE', bookingDetails.budgetRange, isEditing)}
                {renderAttribute('GENDER', bookingDetails.gender, isEditing)}
                {renderAttribute('CIVIL STATUS', bookingDetails.civilStatus, isEditing)}
                {renderAttribute('BIRTH DATE', bookingDetails.birthDate && new Date(bookingDetails.birthDate).toLocaleDateString(), isEditing)}
                {renderAttribute('COUNTRY OF BIRTH', bookingDetails.countryBirth, isEditing)}
                {renderAttribute('PROVINCE OF BIRTH', bookingDetails.provinceBirth, isEditing)}
                {renderAttribute('MUNICIPALITY OF BIRTH', bookingDetails.municipalityBirth, isEditing)}
                {renderAttribute('FATHER\'S FIRST NAME', bookingDetails.firstnameFather, isEditing)}
                {renderAttribute('FATHER\'S MIDDLE NAME', bookingDetails.middlenameFather, isEditing)}
                {renderAttribute('FATHER\'S LAST NAME', bookingDetails.lastnameFather, isEditing)}
                {renderAttribute('FATHER\'S COUNTRY OF CITIZENSHIP', bookingDetails.countryCitizenshipFather, isEditing)}
                {renderAttribute('MOTHER\'S FIRST NAME', bookingDetails.firstnameMother, isEditing)}
                {renderAttribute('MOTHER\'S MIDDLE NAME', bookingDetails.middlenameMother, isEditing)}
                {renderAttribute('MOTHER\'S LAST NAME', bookingDetails.lastnameMother, isEditing)}
                {renderAttribute('MOTHER\'S COUNTRY OF CITIZENSHIP', bookingDetails.countryCitizenshipMother, isEditing)}
                {renderAttribute('SPOUSE\'S FIRST NAME', bookingDetails.firstnameSpouse, isEditing)}
                {renderAttribute('SPOUSE\'S MIDDLE NAME', bookingDetails.middlenameSpouse, isEditing)}
                {renderAttribute('SPOUSE\'S LAST NAME', bookingDetails.lastnameSpouse, isEditing)}
                {renderAttribute('APPLICATION TYPE', bookingDetails.applicationType, isEditing)}
                {renderAttribute('OLD PASSPORT NUMBER', bookingDetails.oldPassportNumber, isEditing)}
                {renderAttribute('DATE ISSUED', bookingDetails.dateIssued && new Date(bookingDetails.dateIssued).toLocaleDateString(), isEditing)}
                {renderAttribute('ISSUING AUTHORITY', bookingDetails.issuingAuthority, isEditing)}
                {renderAttribute('FOREIGN PASSPORT HOLDER', bookingDetails.foreignPassportHolder !== undefined ? (bookingDetails.foreignPassportHolder ? 'Yes' : 'No') : '', isEditing)}
                {renderAttribute('EMERGENCY CONTACT PERSON', bookingDetails.emergencyContactPerson, isEditing)}
                {renderAttribute('CONTACT NUMBER (FOREIGN)', bookingDetails.contactNumberForeign, isEditing)}
                {renderAttribute('PROVINCE', bookingDetails.province, isEditing)}
                {renderAttribute('CITY', bookingDetails.city, isEditing)}
                {renderAttribute('OCCUPATION', bookingDetails.occupation, isEditing)}
                {renderAttribute('OFFICE NUMBER', bookingDetails.officeNumber, isEditing)}
                {renderAttribute('OFFICE DETAILS', bookingDetails.officeDetails, isEditing)}
                {renderAttribute('FULL ADDRESS', bookingDetails.fullAddress, isEditing)}
                {renderAttribute('LANDMARK', bookingDetails.landmark, isEditing)}
                {renderAttribute('ADMIN NOTE', bookingDetails.note, isEditing)}
              </MDBTypography>

              {/* Edit and Save Buttons */}
              <div className="text-center mt-4">
                {isEditing ? (
                  <>
                    <MDBBtn onClick={handleSave} style={{ marginRight: '10px' }}>Save</MDBBtn>
                    <MDBBtn onClick={handleEditToggle} color="secondary">Cancel</MDBBtn>
                  </>
                ) : (
                  <MDBBtn onClick={handleEditToggle}>Edit</MDBBtn>
                )}
              </div>

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
      <Chatbot user={user}/>
    </div>
  );
}

export default DetailsBooking;
