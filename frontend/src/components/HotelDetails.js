import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBFooter,
  MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn
} from 'mdb-react-ui-kit';

import flightsbg from '../images/flightsbg.jpg';
import hotelbg from '../images/hotelbg.jpg';
import passportbg from '../images/passportbg.jpg';
import visabg from '../images/visabg.jpg';
import logo from '../images/header.jpg';

import Toast from './Toast'; 

function HotelDetails() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(hotelbg);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { email } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [content, setContent] = useState(null);

  const [toast, setToast] = useState(null);
  const [passengers, setPassengers] = useState([]);

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
    passengers: [],
    file: '',
    payment: ''
  });

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { 
      ...updatedPassengers[index], 
      [name]: value 
    };
    setPassengers(updatedPassengers);
  
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      passengers: updatedPassengers,
    }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "numOfPerson") {
      const count = parseInt(value, 10) || 0; 
      const updatedPassengers = Array.from({ length: count }, (_, index) => ({
        firstname: passengers[index]?.firstname || '',
        middlename: passengers[index]?.middlename || '',
        lastname: passengers[index]?.lastname || '',
        birthdate: passengers[index]?.birthdate || '',
      }));
      
      setPassengers(updatedPassengers);
  
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        numOfPerson: value,
        passengers: updatedPassengers,
      }));
    } else {
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
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








const [showPreview, setShowPreview] = useState(false);


const handlePreviewQuotation = (e) => {
  e.preventDefault();
  setShowPreview(true);
};


const QuotationPreviewModal = ({ show, onClose, onConfirm, bookingDetails }) => {
  return (
      <MDBModal open={show} tabIndex="-1" setOpen={onClose}>
          <MDBModalDialog size='lg'>
              <MDBModalContent>
                  <MDBModalHeader>
                      <h5 className="modal-title">Kindly confirm if details below are correct</h5>
                      <MDBBtn className="btn-close" color="none" onClick={onClose}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                      {/* Two-column layout for main details */}
                      <p><strong>Service Type:</strong> {bookingDetails.type} </p>
                      <MDBRow>

                      <MDBCol md="6">
                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Contact Person</p>
                        <p style={{ marginBottom: '5px' }}>Name: {bookingDetails.firstname} {bookingDetails.lastname}</p>
                        <p style={{ marginBottom: '5px' }}>Email: {bookingDetails.email}</p>
                        <p style={{ marginBottom: '5px' }}>Contact: {bookingDetails.contactNumber}</p>
                      </MDBCol>

                      <MDBCol md="6">
                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Travel Details</p>
                        <p style={{ marginBottom: '5px' }}>Start Date: {bookingDetails.startDate} </p>
                        <p style={{ marginBottom: '5px' }}>End Date: {bookingDetails.endDate}</p>
                        <p style={{ marginBottom: '5px' }}>Pickup Location: {bookingDetails.pickupLocation}</p>
                        <p style={{ marginBottom: '5px' }}>Dropoff Location: {bookingDetails.dropOffLocation}</p>
                        <p style={{ marginBottom: '5px' }}>Package: {bookingDetails.package}</p>
                        <p style={{ marginBottom: '5px' }}>Number of Person: {bookingDetails.numOfPerson}</p>
                      </MDBCol>

                      </MDBRow>

                      {/* Passengers list below */}
                      <hr />
<h5>Pax List</h5>
<div>
  {bookingDetails.passengers.length > 0 ? (
      <ul style={{ listStyle: 'none', padding: '0' }}>
          {bookingDetails.passengers.map((p, index) => {
              // Compute age from birthdate
              const birthYear = new Date(p.birthdate).getFullYear();
              const currentYear = new Date().getFullYear();
              const age = currentYear - birthYear;

              // Determine category
              let category = "Adult";
              if (age < 12) category = "Child";
              else if (age >= 60) category = "Senior";

              return (
                  <li key={index} style={{ marginBottom: '10px' }}>
                      <div style={{
                          backgroundColor: '#f8f9fa', // Gray background for each card
                          padding: '15px',
                          borderRadius: '8px',
                          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                          border: '1px solid #ddd'
                      }}>
                          <MDBCol md="12">
                              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Person #{index + 1}</p>
                              <p style={{ marginBottom: '5px' }}>
                                  Name: {p.firstname} {p.middlename} {p.lastname}
                              </p>

                              <MDBRow>
                                  <MDBCol md="6">
                                      <p style={{ marginBottom: '5px' }}>Age: {age}</p>
                                  </MDBCol>
                                  <MDBCol md="6">
                                      <p style={{ marginBottom: '5px' }}>Category: {category}</p>
                                  </MDBCol>
                              </MDBRow>
                          </MDBCol>
                      </div>
                  </li>
              );
          })}
      </ul>
  ) : (
      <p style={{ margin: '0', padding: '10px' }}>No passengers added.</p>
  )}
</div>


                  </MDBModalBody>
                  <MDBModalFooter style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {/* Travel Insurance Checkbox */}
  <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <input 
          type="checkbox" 
          id="travelInsurance" 
          style={{ marginRight: '8px' }}
      />
      <label htmlFor="travelInsurance">I would like to add  <strong>Travel Insurance</strong>  to this trip.</label>
  </div>

  {/* Centered Buttons with Styling */}
  <div style={{ display: 'flex', gap: '100px' }}>
      <button
          type="button"
          className="btn btn-secondary"
          style={{
              fontWeight: 'bold',
              width: '100%',
              width: '250px',
              fontSize: '14px',
              borderRadius: '30px',
              backgroundColor: 'red', 
              border: 'none',
              padding: '10px 10px',
          }}
          onClick={onClose}
      >
          Cancel
      </button>

      <button
          type="button"
          className="btn btn-primary"
          style={{
              fontWeight: 'bold',
              width: '100%',
              width: '250px',
              fontSize: '14px',
              borderRadius: '30px',
              backgroundColor: 'rgb(255, 165, 0)', // Matching the request quotation button
              border: 'none',
              padding: '10px 20px',
          }}
          onClick={onConfirm}
      >
          Confirm & Send
      </button>
  </div>
</MDBModalFooter>


              </MDBModalContent>
          </MDBModalDialog>
      </MDBModal>
  );
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
    const fetchContent = async () => {
      try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/contents/get-content/67b8bf22dcf4d107a677a21f');
        const result = await response.json();
        if (response.ok) {
          setContent(result);
        } 
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
    fetchData();
  }, [email]);

  // Conditional rendering based on loading state
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
          onClick={() => navigate('/profile', { state: { email: user.email } })}
          style={{
            margin: '0 25px',
            fontSize: '1rem',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          Hi, {user?.firstname || "Loading..."}
        </span>
      </MDBNavbarNav>
    </MDBNavbar>
  </MDBContainer>
</div>
    <div className="d-flex flex-column min-vh-100" style={{
      backgroundImage: `url(${content?.backgroundImage || ''})`,
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
        HOTEL BOOKING
      </MDBTypography>

      <MDBTypography 
        tag="h3" 
        className="text-center mb-3" 
        style={{
          color: 'white', 
          fontSize: '16px',
        }}
      >
        {content?.subtitle || "We provide access to a wide range of hotels, from luxurious resorts to budget-friendly options, ensuring you find the perfect stay"}
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
                                <MDBCol md="6">
                    <label htmlFor="numOfPerson" style={{ color: 'black', paddingLeft: '12px' }}>
                      Number of Persons <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id="numOfPerson"
                      name="numOfPerson"
                      type="number"
                      min="1"
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



              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Pax List</MDBTypography>
              
              {passengers.map((passenger, index) => (
                <div key={index} className="mb-4">
                  <MDBTypography tag="h6" className="text-start" style={{ fontWeight: 'bold', paddingLeft: '12px' }}>
                    Person {index + 1}
                  </MDBTypography>
                  
                  <MDBRow>
                    <MDBCol md="6">
                      <label htmlFor={`passenger-lastname-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                        Last Name <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id={`passenger-lastname-${index}`}
                        name="lastname"
                        type="text"
                        value={passenger.lastname}
                        onChange={(e) => handlePassengerChange(index, e)}
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
                      <label htmlFor={`passenger-firstname-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                        First Name <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id={`passenger-firstname-${index}`}
                        name="firstname"
                        type="text"
                        value={passenger.firstname}
                        onChange={(e) => handlePassengerChange(index, e)}
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
                      <label htmlFor={`passenger-middlename-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                        Middle Name
                      </label>
                      <input
                        id={`passenger-middlename-${index}`}
                        name="middlename"
                        type="text"
                        value={passenger.middlename}
                        onChange={(e) => handlePassengerChange(index, e)}
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
                      <label htmlFor={`passenger-birthdate-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                        Birthdate <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id={`passenger-birthdate-${index}`}
                        name="birthdate"
                        type="date"
                        value={passenger.birthdate}
                        onChange={(e) => handlePassengerChange(index, e)}
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
                </div>
              ))}

              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Travel Information</MDBTypography>

              <MDBRow>
              <MDBCol md="6">
              <label htmlFor="startDate" style={{ color: 'black', paddingLeft: '12px' }}>
                    Check In Date <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={bookingDetails.startDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                    min={new Date().toISOString().split("T")[0]}
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
                    Check Out Date <span style={{ color: 'red' }}>*</span>
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
                <label htmlFor="preferredHotel" style={{ color: 'black', paddingLeft: '12px' }}>
                    Preferred Hotel <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="preferredHotel"
                    name="preferredHotel"
                    type="text"
                    value={bookingDetails.preferredHotel}
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
                <label htmlFor="budgetRange" style={{ color: 'black', paddingLeft: '12px' }}>
                    Budget Range <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="budgetRange"
                    name="budgetRange"
                    type="text"
                    value={bookingDetails.budgetRange}
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
                  <MDBCol md="6" className="d-flex align-items-center">
                    <input 
                      type="checkbox" 
                      id="termsCheckbox" 
                      checked={isChecked} 
                      onChange={handleCheckboxChange} 
                      style={{ marginRight: '10px' }} 
                    />
                    <label htmlFor="termsCheckbox" style={{ fontSize: '15px'}}>
                      By clicking this, you agree to {' '}
                      <span 
                        onClick={() => navigate('/terms-and-conditions', { state: { email: user.email }})}
                        style={{ 
                          color: '#68BBE3', 
                          cursor: 'pointer' ,
                          fontSize: '15px'
                        }}
                      >
                        Terms & Conditions
                      </span>.
                    </label>
                  </MDBCol>

                  
                  <MDBCol md="2" className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                        fontWeight: 'bold',
                        width: '100%',
                        borderRadius: '30px',
                        backgroundColor: 'white',
                        border: 'solid',
                        borderColor: 'rgb(255, 165, 0)',
                        borderWidth: '3px',
                        padding: '10px 5px',
                        color: 'rgb(255, 165, 0)',
                      }}
                      onClick={() => navigate('/services', { state: { email: user.email } })}
                    >
                      BACK
                    </button>
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
                      onClick={handlePreviewQuotation}
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

      <QuotationPreviewModal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleQuotationSubmit}
        bookingDetails={bookingDetails}
    />
    </div>
    </>
  );
}

export default HotelDetails;
