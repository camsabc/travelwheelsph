import React, { useState } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
} from 'mdb-react-ui-kit';

import hotelbg from '../images/hotelbg.jpg';
import logo from '../images/header.jpg';
import Toast from './Toast'; 

function CarDetails() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(hotelbg);
  const location = useLocation();
  const { serviceName, email } = location.state || {};
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [toast, setToast] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isPopulateChecked, setIsPopulateChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const [bookingDetails, setBookingDetails] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    contactNumber: '',
    startDate: '',
    endDate: '',
    preferredHotel: '',
    budgetRange: '',
    numOfPerson: '',
    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Hotel Reservation',
    file: '',
    payment: ''
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


  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/bookings/create-booking', {
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
        const response = await fetch('https://travelwheelsph.onrender.com/api/quotations/create-quotation', {
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

        <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
          <MDBNavbarLink 
              onClick={() => navigate('/services', { state: { email: user.email }})}
              style={{ color: 'rgb(255, 165, 0)' }}  
          >
              Services
          </MDBNavbarLink>
        </MDBNavbarItem>

        <MDBNavbarItem style={{ margin: '0 25px' }}>
          <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
        </MDBNavbarItem>

        <MDBNavbarItem style={{ margin: '0 25px' }}>
          <MDBNavbarLink onClick={() => navigate('/inquiry')}>Inquiry</MDBNavbarLink>
        </MDBNavbarItem>
        <span
          onClick={() => {}}
          style={{
            margin: '0 25px',
            fontSize: '1rem',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          Hi, Anthony
        </span>
      </MDBNavbarNav>
    </MDBNavbar>
  </MDBContainer>
</div>
    <div className="d-flex flex-column min-vh-100" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundColor: '#eee',
    }}>
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
        CAR RENTAL
      </MDBTypography>

      <MDBTypography 
        tag="h3" 
        className="text-center mb-3" 
        style={{
          color: 'white', 
          fontSize: '16px',
        }}
      >
        We provide access to a wide range of hotels, from luxurious resorts to budget-friendly options, ensuring you find the perfect stay
      </MDBTypography>

      <MDBContainer className="flex-grow-1 d-flex align-items-center justify-content-center">
        <MDBCard style={{ maxWidth: '900px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
          <MDBCardBody>
            <MDBTypography tag="h5" className="text-center mb-5">Kindly complete the details below:</MDBTypography>
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
                <label htmlFor="lastname" style={{ color: 'black', fontWeight: 'bold' }}>
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
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="First Name"
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
                    }}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <input
                    id="middlename"
                    name="middlename"
                    type="text"
                    placeholder="Middle Name"
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
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
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
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    placeholder="Contact Number"
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


              <MDBRow>
                <MDBCol md="6">
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    placeholder="Start Date"
                    value={bookingDetails.startDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
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
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    placeholder="End Date"
                    value={bookingDetails.endDate}
                    onChange={handleChange}
                    required
                    min={bookingDetails.startDate || new Date().toISOString().split("T")[0]}
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
                  <input
                    id="pickuploc"
                    name="pickuploc"
                    type="text"
                    placeholder="Pick Up Location"
                    value={bookingDetails.pickuploc}
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
                  <input
                    id="dropoffloc"
                    name="dropoffloc"
                    type="text"
                    placeholder="Drop Off Location"
                    value={bookingDetails.dropoffloc}
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
                  <input
                    id="numOfPerson"
                    name="numOfPerson"
                    type="number"
                    placeholder="Number of Persons"
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
                        onClick={() => navigate('/terms-and-conditions', { state: { email: user.email }})}
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
                      disabled={
                        !isChecked ||
                        !bookingDetails.lastname ||
                        !bookingDetails.firstname ||
                        !bookingDetails.email ||
                        !bookingDetails.contactNumber ||
                        
                        !bookingDetails.startDate ||
                        !bookingDetails.endDate ||
                        !bookingDetails.preferredHotel ||
                        !bookingDetails.budgetRange ||
                        !bookingDetails.numOfPerson
                      } 
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

export default CarDetails;
