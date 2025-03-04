import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import ride1 from '../images/ride1.jpg';
import ride2 from '../images/ride2.jpg';
import ride3 from '../images/ride3.jpg';
import bg from '../images/bg.jpg';
import Toast from '../components/Toast';
import Chatbot from "../components/Chatbot";

function DetailsRide() {
  const [user, setUser] = useState(null);
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const [passengers, setPassengers] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    contactNumber: '',
    startDate: '',
    endDate: '',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: '',
    dropoffTime: '',
    pickupLocation: '',
    dropOffLocation: '',
    numOfPerson: '',
    vehicleName: '',
    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Car Rental',
    passengers: []
  });

  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [toast, setToast] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isPopulateChecked, setIsPopulateChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    console.log(bookingDetails)
    setIsChecked(e.target.checked);
  };

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  const getImageForRide = (picsValue) => {
    switch (picsValue) {
      case 1:
        return ride1;
      case 2:
        return ride2;
      case 3:
        return ride3;
      default:
        return null;
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
                          <p style={{ marginBottom: '5px' }}>Pickup Date: {bookingDetails.pickupDate}</p>
                          <p style={{ marginBottom: '5px' }}>Dropoff Date: {bookingDetails.dropoffDate}</p>
                          <p style={{ marginBottom: '5px' }}>Pickup Time: {bookingDetails.pickupTime}</p>
                          <p style={{ marginBottom: '5px' }}>Dropoff Time: {bookingDetails.dropoffTime}</p>
                          <p style={{ marginBottom: '5px' }}>Pickup Location: {bookingDetails.pickupLocation}</p>
                          <p style={{ marginBottom: '5px' }}>Dropoff Location: {bookingDetails.dropOffLocation}</p>
                          <p style={{ marginBottom: '5px' }}>Selected Vehicle: {bookingDetails.vehicleName}</p>
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
      try {
        if (email) {
          const userResponse = await fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`);
          const userData = await userResponse.json();
          if (userData.error) {
            setError(userData.error);
            return;
          }
          setUser(userData);
          setBookingDetails(prevDetails => ({
            ...prevDetails,
            firstname: userData.firstname,
            middlename: userData.middlename,
            lastname: userData.lastname,
            email: userData.email
          }));
        }

        const rideResponse = await fetch(`https://travelwheelsph.onrender.com/api/rides/get-ride-by-id/${id}`);
        const rideData = await rideResponse.json();
        if (rideData.error) {
          setError(rideData.error);
          return;
        }
        setRide(rideData);
        setBookingDetails(prevDetails => ({
          ...prevDetails,
          vehicleName: rideData.name,
        }));

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, email]);



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
        middlename: user.middlename || '',
        lastname: user.lastname,
        email: user.email,
        contactNumber: user.contactNumber || '', 
      }));
    }
  };

  const populateCheckboxHandler = (e) => {
    setIsPopulateChecked(e.target.checked);
    if (e.target.checked) {
      populateUserData(); 
    } else {
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        contactNumber: '',
      }));
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

        showToast('Booking created successful!', 'success');
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

        showToast('Quotation created successful!', 'success');
        navigate('/request-quotation', { state: { email: user.email }})
    } catch (err) {
        console.error('Error creating quotation:', err);
        setError('Failed to submit quotation request.');
    }
};



  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
<div
  className="d-flex flex-column min-vh-100"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundColor: '#eee',
  }}
>



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
      <MDBTypography 
        tag="h1" 
        className="text-center mb-3 mt-4" 
        style={{
            fontWeight: 'bolder', 
            color: 'white', 
            fontSize: '60px', 
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
        }}
        >
        CAR RENTALS
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
              <label htmlFor="pickupDate" style={{ color: 'black', paddingLeft: '12px' }}>
                    Pickup Date <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="pickupDate"
                    name="pickupDate"
                    type="date"
                    value={bookingDetails.pickupDate}
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
                <label htmlFor="dropoffDate" style={{ color: 'black', paddingLeft: '12px' }}>
                    Dropoff Date <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="dropoffDate"
                    name="dropoffDate"
                    type="date"
                    value={bookingDetails.dropoffDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                    min={bookingDetails.pickupDate || new Date().toISOString().split("T")[0]}
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
                <label htmlFor="pickupTime" style={{ color: 'black', paddingLeft: '12px' }}>
                  Pickup Time <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  id="pickupTime"
                  name="pickupTime"
                  type="time"
                  value={bookingDetails.pickupTime}
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
                    marginBottom: '10px',
                  }}
                />
              </MDBCol>
                <MDBCol md="6">
                  <label htmlFor="dropoffTime" style={{ color: 'black', paddingLeft: '12px' }}>
                    Dropoff Time <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="dropoffTime"
                    name="dropoffTime"
                    type="time"
                    value={bookingDetails.dropoffTime}
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
                      marginBottom: '10px',
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
                  <label htmlFor="vehicleName" style={{ color: 'black', paddingLeft: '12px' }}>
                    Selected Vehicle <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="vehicleName"
                    name="vehicleName"
                    type="text"
                    value={bookingDetails.vehicleName}
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
                        !bookingDetails.pickupTime ||
                        !bookingDetails.pickupDate ||
                        !bookingDetails.dropoffTime ||
                        !bookingDetails.dropoffDate ||

                        !bookingDetails.pickupLocation ||
                        !bookingDetails.dropOffLocation ||
                        !bookingDetails.numOfPerson ||
                        !bookingDetails.vehicleName 
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
      <Chatbot user={user}/>

        
      <QuotationPreviewModal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleQuotationSubmit}
        bookingDetails={bookingDetails}
    />
    </div>
  );
}

export default DetailsRide;
