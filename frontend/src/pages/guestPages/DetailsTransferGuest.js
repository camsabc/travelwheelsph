import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBNavbarLink,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbar,
  MDBCardImage
} from 'mdb-react-ui-kit';

import flightsbg from '../../images/flightsbg.jpg';
import Toast from '../../components/Toast'; 
import logo from '../../images/header.jpg';



function DetailsTransferGuest() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { email } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('vip escort');

  const [toast, setToast] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isPopulateChecked, setIsPopulateChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const addPassenger = () => {
    const newPassenger = { firstname: '', lastname: '', age: '' }; // Add age field
    setPassengers([...passengers, newPassenger]);
  
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      passengers: [...prevDetails.passengers, newPassenger],
    }));
  };
  
  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [name]: value,
    };
  
    setPassengers(updatedPassengers);
  
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      passengers: updatedPassengers,
    }));
  };

  
  
  

  const [bookingDetails, setBookingDetails] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    contactNumber: '',
    startDate: '',
    endDate: '',
    pickupLocation: '',
    dropOffLocation: '',
    numOfPerson: '',



    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Transfer',
    class: 'vip escort'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const populateUserData = () => {
    if (user) {
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        firstname: user.firstname,
        middlename: user.middlename || '', // Assuming user might not have a middlename
        lastname: user.lastname,
        email: user.email,
        contactNumber: user.contactNumber || '', // Assuming user might not have a contact number
      }));
    }
  };

  const populateCheckboxHandler = (e) => {
    setIsPopulateChecked(e.target.checked);
    if (e.target.checked) {
      populateUserData(); // Populate the fields with user data
    } else {
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        contactNumber: '',
      })); // Clear the fields when unchecked
    }
  };

  const handleOptionChange = (e) => {
    const selectedClass = e.target.value;
    setSelectedOption(selectedClass);
  
    // Update bookingDetails with the selected transport class
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      class: selectedClass,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/bookings/create-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        });

        const result = await response.json();

        if (result.error) {
            setError(result.error);
            return;
        }

        showToast('Booking created successfully!', 'success');
        navigate('/profile', { state: { email: user.email } });
    } catch (err) {
        console.error('Error creating booking:', err);
        setError('Failed to create booking.');
    }
};

const handleQuotationSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/quotations/create-quotation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        });

        const result = await response.json();

        if (result.error) {
            setError(result.error);
            return;
        }

        showToast('Quotation created successfully!', 'success');
        navigate('/request-quotation', { state: { email: user.email }})
    } catch (err) {
        console.error('Error creating quotation:', err);
        setError('Failed to submit quotation request.');
    }
};



  return (
    <>
    {/* Header Section */}
    <div className="d-flex flex-column min-vh-100" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#eee',
      }}>


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
      <MDBTypography 
            tag="h1" 
            className="text-center mt-5" 
            style={{
                fontWeight: 'bolder', 
                color: 'white', 
                fontSize: '60px',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
            }}
        >
            TRANSFER
      </MDBTypography>

      <MDBContainer className="flex-grow-1 d-flex align-items-center justify-content-center">
        <MDBCard style={{ maxWidth: '900px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
          <MDBCardBody>
            <MDBTypography tag="h5" className="text-center mb-5">Kindly complete the details below:</MDBTypography>
            <MDBTypography tag="h6" className="text-start mb-4" style={{color: 'red'}}>Fields with asterisks (*) are required</MDBTypography>
            <form>
              <MDBTypography tag="h6" className="text-start mb-3" style={{fontWeight: 'bold'}}>General Information</MDBTypography>

              <MDBRow className="mb-3">
  <MDBCol md="12" className="d-flex align-items-center">
    <input 
      type="checkbox" 
      id="autoFillCheckbox" 
      checked={isPopulateChecked} 
      onChange={populateCheckboxHandler} 
      style={{ marginRight: '10px' }} 
    />
    <label htmlFor="autoFillCheckbox">
      Click here to apply your account information.
    </label>
  </MDBCol>
</MDBRow>

<MDBRow>
              <MDBCol md="6">
                <label htmlFor="lastname" style={{ color: 'black', paddingLeft: '12px' }}>
                    Last Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={bookingDetails.lastname}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
                <MDBCol md="6">
                <label htmlFor="firstname" style={{ color: 'black', paddingLeft: '12px' }}>
                    First Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={bookingDetails.firstname}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
              </MDBRow>


              <MDBRow>
              <MDBCol md="6">
              <label htmlFor="middlename" style={{ color: 'black', paddingLeft: '12px' }}>
                    Middle Name
                  </label>
                  <input
                    id="middlename"
                    name="middlename"
                    type="text"
                    value={bookingDetails.middlename}
                    onChange={handleChange}
                    
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
                <MDBCol md="6">
                <label htmlFor="email" style={{ color: 'black', paddingLeft: '12px' }}>
                    Email <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={bookingDetails.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
              <MDBCol md="6">
              <label htmlFor="contactNumber" style={{ color: 'black', paddingLeft: '12px' }}>
                    Contact Number <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    value={bookingDetails.contactNumber}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
              </MDBRow>

              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Travel Information</MDBTypography>

              <MDBRow className="mb-4">
              <MDBCol md="4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="classOptions"
                    id="airporttransfer"
                    value="airporttransfer"
                    checked={selectedOption === 'airport transfer'}
                    onChange={handleOptionChange}
                  />
                  <label className="form-check-label" htmlFor="airporttransfer">
                    Airport Transfer
                  </label>
                </div>
              </MDBCol>
              <MDBCol md="4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="classOptions"
                    id="hoteltransfer"
                    value="hoteltransfer"
                    checked={selectedOption === 'hotel transfer'}
                    onChange={handleOptionChange}
                  />
                  <label className="form-check-label" htmlFor="hoteltransfer">
                    Hotel Transfer
                  </label>
                </div>
              </MDBCol>
              <MDBCol md="4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="classOptions"
                    id="vipescort"
                    value="vipescort"
                    checked={selectedOption === 'vip escort'}
                    onChange={handleOptionChange}
                  />
                  <label className="form-check-label" htmlFor="vipescort">
                    VIP Escort
                  </label>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="6">
              <label htmlFor="startDate" style={{ color: 'black', paddingLeft: '12px' }}>
                    Start Date <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={bookingDetails.startDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
                <MDBCol md="6">
                <label htmlFor="endDate" style={{ color: 'black', paddingLeft: '12px' }}>
                    End Date <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={bookingDetails.endDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                    min={bookingDetails.startDate || new Date().toISOString().split("T")[0]}
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
              <MDBCol md="6">
              <label htmlFor="pickupLocation" style={{ color: 'black', paddingLeft: '12px' }}>
                    Pickup Location <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="pickupLocation"
                    name="pickupLocation"
                    type="text"
                    value={bookingDetails.pickupLocation}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
                <MDBCol md="6">
                <label htmlFor="dropOffLocation" style={{ color: 'black', paddingLeft: '12px' }}>
                    Dropoff Location <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="dropOffLocation"
                    name="dropOffLocation"
                    type="text"
                    value={bookingDetails.dropOffLocation}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                <label htmlFor="numOfPerson" style={{ color: 'black', paddingLeft: '12px' }}>
                    Number of Person <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="numOfPerson"
                    name="numOfPerson"
                    type="number"
                    value={bookingDetails.numOfPerson}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      border: '2px solid rgb(250, 207, 32)', 
                      borderRadius: '15px', 
                      boxShadow: 'none', 
                      padding: '10px',
                      backgroundColor: 'transparent', 
                      width: '100%',
                      marginBottom: '10px'
                    }}
                  />
                </MDBCol>
              </MDBRow>

              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Other remarks/requests:</MDBTypography>

<MDBRow>
  <MDBCol md="12">
      <input
      id="remarks"
      name="remarks"
      type="text"
      value={bookingDetails.remarks}
      placeholder='Remarks'
      onChange={handleChange}
      className="form-control"
      style={{
          border: '2px solid rgb(250, 207, 32)',
          borderRadius: '15px', 
          boxShadow: 'none',
          padding: '15px', 
          backgroundColor: 'transparent', 
          width: '100%', 
          marginBottom: '10px'
      }}
      />
  </MDBCol>
  </MDBRow>

  <MDBRow className="mt-3">
                  <MDBCol md="8" className="d-flex align-items-center">
                    <input 
                      type="checkbox" 
                      id="termsCheckbox" 
                      checked={isChecked} 
                      onChange={handleCheckboxChange} 
                      style={{ marginRight: '10px' }} 
                    />
                    <label htmlFor="termsCheckbox">
                      By clicking this, you agree to our{' '}
                      <span 
                        onClick={() => navigate('/terms-and-conditions-guest')}
                        style={{ 
                          color: '#68BBE3', 
                          cursor: 'pointer' 
                        }}
                      >
                        Terms and Conditions
                      </span>.
                    </label>
                  </MDBCol>

                  <MDBCol md="4" className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                        fontWeight: 'bold',
                        width: '100%',
                        borderRadius: '30px',
                        backgroundColor: 'rgb(255, 165, 0)',
                        border: 'none',
                        padding: '10px 20px',
                      }}
                      onClick={handleQuotationSubmit}
                      disabled
                    >
                      REQUEST QUOTATION
                    </button>
                  </MDBCol>
                </MDBRow>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
    </>
  );
}

export default DetailsTransferGuest;
