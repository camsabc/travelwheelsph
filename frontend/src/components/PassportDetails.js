import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography, MDBInput, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
} from 'mdb-react-ui-kit';


import passportbg from '../images/passportbg.jpg';
import logo from '../images/header.jpg';

import Toast from './Toast'; 


function PassportDetails() {
  const navigate = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState(passportbg);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { email } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [toast, setToast] = useState(null);
  const [isPopulateChecked, setIsPopulateChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedService, setSelectedService] = useState('pickup');
  
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
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

    gender: '',
    civilStatus: '',
    birthDate: '',
    countryBirth: '',
    provinceBirth: '',
    municipalityBirth: '',

    firstnameFather: '',
    middlenameFather: '',
    lastnameFather: '',
    countryCitizenshipFather: '',

    firstnameMother: '',
    middlenameMother: '',
    lastnameMother: '',
    countryCitizenshipMother: '',

    firstnameSpouse: '',
    middlenameSpouse: '',
    lastnameSpouse: '',

    applicationType: '',

    oldPassportNumber: '',
    dateIssued: '',
    issuingAuthority: '',

    foreignPassportHolder: '',
    emergencyContactPerson: '',
    contactNumberForeign: '',

    province: '',
    city: '',
    occupation: '',
    officeNumber: '',
    officeDetails: '',

    fullAddress: '',
    landmark: '',

    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Passport Appointment',
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
                          <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Other Details</p>
                          <p style={{ marginBottom: '5px' }}>Gender: {bookingDetails.gender} </p>
                          <p style={{ marginBottom: '5px' }}>Civil Status: {bookingDetails.civilStatus} </p>
                          <p style={{ marginBottom: '5px' }}>Birthdate: {bookingDetails.birthDate}</p>
                          <p style={{ marginBottom: '5px' }}>Country Birth: {bookingDetails.countryBirth}</p>
                          <p style={{ marginBottom: '5px' }}>Province Birth: {bookingDetails.provinceBirth}</p>
                          <p style={{ marginBottom: '5px' }}>Municipality Birth: {bookingDetails.municipalityBirth}</p>

                          <p style={{ marginBottom: '5px' }}>Last Name of Father: {bookingDetails.lastnameFather}</p>
                          <p style={{ marginBottom: '5px' }}>First Name of Father: {bookingDetails.firstnameFather}</p>
                          <p style={{ marginBottom: '5px' }}>Middle Name of Father: {bookingDetails.middlenameFather}</p>
                          <p style={{ marginBottom: '5px' }}>Citizenship of Father: {bookingDetails.countryCitizenshipFather}</p>

                          <p style={{ marginBottom: '5px' }}>Last Name of Mother: {bookingDetails.lastnameMother}</p>
                          <p style={{ marginBottom: '5px' }}>First Name of Mother: {bookingDetails.firstnameMother}</p>
                          <p style={{ marginBottom: '5px' }}>Middle Name of Mother: {bookingDetails.middlenameMother}</p>
                          <p style={{ marginBottom: '5px' }}>Citizenship of Mother: {bookingDetails.countryCitizenshipMother}</p>

                          <p style={{ marginBottom: '5px' }}>Last Name of Spouse: {bookingDetails.lastnameSpouse}</p>
                          <p style={{ marginBottom: '5px' }}>First Name of Spouse: {bookingDetails.firstnameSpouse}</p>
                          <p style={{ marginBottom: '5px' }}>Middle Name of Spouse: {bookingDetails.middlenameSpouse}</p>

                          <p style={{ marginBottom: '5px' }}>Old Passport of Number: {bookingDetails.oldPassportNumber}</p>
                          <p style={{ marginBottom: '5px' }}>Issuing Authority: {bookingDetails.issuingAuthority}</p>
                          <p style={{ marginBottom: '5px' }}>Date Issued: {bookingDetails.dateIssued}</p>

                          <p style={{ marginBottom: '5px' }}>Foreign Passport Holder: {bookingDetails.foreignPassportHolder}</p>
                          <p style={{ marginBottom: '5px' }}>Emergency Contact Person: {bookingDetails.emergencyContactPerson}</p>
                          <p style={{ marginBottom: '5px' }}>Contact Number Foreign: {bookingDetails.contactNumberForeign}</p>

                          <p style={{ marginBottom: '5px' }}>Province: {bookingDetails.province}</p>
                          <p style={{ marginBottom: '5px' }}>City: {bookingDetails.city}</p>
                          <p style={{ marginBottom: '5px' }}>Occupation: {bookingDetails.occupation}</p>
                          <p style={{ marginBottom: '5px' }}>Office Details: {bookingDetails.officeDetails}</p>
                          <p style={{ marginBottom: '5px' }}>Office Number: {bookingDetails.officeNumber}</p>

                          <p style={{ marginBottom: '5px' }}>Selected Service: {bookingDetails.selectedService}</p>
                          
                        </MDBCol>

                        </MDBRow>


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
                onClick={() =>  navigate('/services', { state: { email: user.email }})}
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
            Hi, {user.firstname}
          </span>
        </MDBNavbarNav>
      </MDBNavbar>
    </MDBContainer>
  </div>
  
    <div className="d-flex flex-column min-vh-100"  style={{
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
        PASSPORT APPOINTMENT
      </MDBTypography>

      <div className="flex-grow-1 d-flex align-items-center justify-content-center"
     
      >
        <MDBCard style={{ maxWidth: '900px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
          <MDBCardBody>

          <MDBTypography tag="h5" className="text-start mb-1 mt-3" style={{paddingLeft: "20px"}}>
            PHP 1,800 ( incl. of passport fee, admin fee & service change, courier Air21 delivery)
          </MDBTypography>
          <MDBTypography tag="h5" className="text-start mb-1 mt-3" style={{paddingLeft: "20px"}}>
            STEPS
          </MDBTypography>
                    <ol style={{paddingLeft: "50px", fontWeight: "bold", paddingBottom: "10px"}}>
                        <li> Provide the Personal details, (New passport: PSA copy / Renewal: Old Passport copy) </li>
                        <li> Choose a DFA Branch </li>
                        <li> Pay 1800 via Bank Deposit or G-Cash/Maya </li>
                    </ol>





            <MDBTypography tag="h5" className="text-center mt-5 mb-5">Kindly complete the details below:</MDBTypography>
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


              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>General Information</MDBTypography>

              <MDBRow>
                <MDBCol md="6">
                <label htmlFor="gender" style={{ color: 'black', paddingLeft: '12px' }}>
                    Gender <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    value={bookingDetails.gender}
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
                <label htmlFor="civilStatus" style={{ color: 'black', paddingLeft: '12px' }}>
                    Civil Status <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="civilStatus"
                    name="civilStatus"
                    type="text"
                    value={bookingDetails.civilStatus}
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
                <label htmlFor="birthDate" style={{ color: 'black', paddingLeft: '12px' }}>
                    Birth Date <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={bookingDetails.birthDate}
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
                <label htmlFor="countryBirth" style={{ color: 'black', paddingLeft: '12px' }}>
                    Country Birth <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="countryBirth"
                    name="countryBirth"
                    type="text"
                    value={bookingDetails.countryBirth}
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
                <label htmlFor="provinceBirth" style={{ color: 'black', paddingLeft: '12px' }}>
                    Province Birth <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="provinceBirth"
                    name="provinceBirth"
                    type="text"
                    value={bookingDetails.provinceBirth}
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
                <label htmlFor="municipalityBirth" style={{ color: 'black', paddingLeft: '12px' }}>
                    Municipality Birth <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="municipalityBirth"
                    name="municipalityBirth"
                    type="text"
                    value={bookingDetails.municipalityBirth}
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

              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Father Information</MDBTypography>

              <MDBRow>
                <MDBCol md="6">
                <label htmlFor="lastnameFather" style={{ color: 'black', paddingLeft: '12px' }}>
                    Last Name of Father <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="lastnameFather"
                    name="lastnameFather"
                    type="text"
                    value={bookingDetails.lastnameFather}
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
                <label htmlFor="firstnameFather" style={{ color: 'black', paddingLeft: '12px' }}>
                    First Name of Father <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="firstnameFather"
                    name="firstnameFather"
                    type="text"
                    value={bookingDetails.firstnameFather}
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
                <label htmlFor="middlenameFather" style={{ color: 'black', paddingLeft: '12px' }}>
                    Middle Name of Father <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="middlenameFather"
                    name="middlenameFather"
                    type="text"
                    value={bookingDetails.middlenameFather}
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
                <label htmlFor="countryCitizenshipFather" style={{ color: 'black', paddingLeft: '12px' }}>
                    Citizenship of Father <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="countryCitizenshipFather"
                    name="countryCitizenshipFather"
                    type="text"
                    value={bookingDetails.countryCitizenshipFather}
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



              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Mother Information</MDBTypography>

              <MDBRow>
                <MDBCol md="6">
                <label htmlFor="lastnameMother" style={{ color: 'black', paddingLeft: '12px' }}>
                    Last Name of Mother <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="lastnameMother"
                    name="lastnameMother"
                    type="text"
                    value={bookingDetails.lastnameMother}
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
                <label htmlFor="firstnameMother" style={{ color: 'black', paddingLeft: '12px' }}>
                    First Name of Mother <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="firstnameMother"
                    name="firstnameMother"
                    type="text"
                    value={bookingDetails.firstnameMother}
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
                <label htmlFor="middlenameMother" style={{ color: 'black', paddingLeft: '12px' }}>
                    Middle Name of Mother <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="middlenameMother"
                    name="middlenameMother"
                    type="text"
                    value={bookingDetails.middlenameMother}
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
                <label htmlFor="countryCitizenshipMother" style={{ color: 'black', paddingLeft: '12px' }}>
                    Citizenship of Mother <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="countryCitizenshipMother"
                    name="countryCitizenshipMother"
                    type="text"
                    value={bookingDetails.countryCitizenshipMother}
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




               <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Spouse Information</MDBTypography>

                <MDBRow>
                <MDBCol md="6">
                <label htmlFor="lastnameSpouse" style={{ color: 'black', paddingLeft: '12px' }}>
                    Last Name of Spouse <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="lastnameSpouse"
                    name="lastnameSpouse"
                    type="text"
                    value={bookingDetails.lastnameSpouse}
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
                <label htmlFor="firstnameSpouse" style={{ color: 'black', paddingLeft: '12px' }}>
                    First Name of Spouse <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="firstnameSpouse"
                    name="firstnameSpouse"
                    type="text"
                    value={bookingDetails.firstnameSpouse}
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
            <label htmlFor="middlenameSpouse" style={{ color: 'black', paddingLeft: '12px' }}>
                    MIddle Name of Spouse <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="middlenameSpouse"
                    name="middlenameSpouse"
                    type="text"
                    value={bookingDetails.middlenameSpouse}
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














            <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>Application Type</MDBTypography>

            <MDBRow>
            <MDBCol md="6" style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <input
                  type="radio"
                  name="applicationType"
                  value="newPassport"
                  checked={bookingDetails.applicationType === 'newPassport'}
                  onChange={handleChange}
                  style={{
                    accentColor: 'rgb(255, 165, 0)', 
                    marginRight: '8px'
                  }}
                />
                New Passport
              </label>
            </MDBCol>
            <MDBCol md="6" style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="applicationType"
                  value="renewalPassport"
                  checked={bookingDetails.applicationType === 'renewalPassport'}
                  onChange={handleChange}
                  style={{
                    accentColor: 'rgb(255, 165, 0)',  
                    marginRight: '8px'
                  }}
                />
                Renewal Passport
              </label>
            </MDBCol>
          </MDBRow>




            <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>If Renewal, fill out details below:</MDBTypography>

            <MDBRow>
            <MDBCol md="6">
            <label htmlFor="oldPassportNumber" style={{ color: 'black', paddingLeft: '12px' }}>
                    Old Passport Number <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="oldPassportNumber"
                    name="oldPassportNumber"
                    type="text"
                    value={bookingDetails.oldPassportNumber}
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
            <label htmlFor="dateIssued" style={{ color: 'black', paddingLeft: '12px' }}>
                    Date Issued <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="dateIssued"
                    name="dateIssued"
                    type="date"
                    value={bookingDetails.dateIssued}
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
            <label htmlFor="issuingAuthority" style={{ color: 'black', paddingLeft: '12px' }}>
              Issuing Authority <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="issuingAuthority"
                    name="issuingAuthority"
                    type="text"
                    value={bookingDetails.issuingAuthority}
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


            <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{fontWeight: 'bold'}}>If Foreigner, fill out details below:</MDBTypography>

            <MDBRow>
            <MDBCol md="6">
            <label htmlFor="foreignPassportHolder" style={{ color: 'black', paddingLeft: '12px' }}>
            Foreign Passport Holder<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="foreignPassportHolder"
                    name="foreignPassportHolder"
                    type="text"
                    value={bookingDetails.foreignPassportHolder}
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
            <label htmlFor="emergencyContactPerson" style={{ color: 'black', paddingLeft: '12px' }}>
              Emergency Contact Person<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="emergencyContactPerson"
                    name="emergencyContactPerson"
                    type="text"
                    value={bookingDetails.emergencyContactPerson}
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
            <label htmlFor="contactNumberForeign" style={{ color: 'black', paddingLeft: '12px' }}>
              Contact Number Foreign <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="contactNumberForeign"
                    name="contactNumberForeign"
                    type="text"
                    value={bookingDetails.contactNumberForeign}
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



            <MDBTypography tag="h6" className="text-start mt-4 mb-3" style={{fontWeight: 'bold'}}>Complete Address</MDBTypography>

            <MDBRow>
            <MDBCol md="6">
            <label htmlFor="province" style={{ color: 'black', paddingLeft: '12px' }}>
                    Province <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="province"
                    name="province"
                    type="text"
                    value={bookingDetails.province}
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
            <label htmlFor="city" style={{ color: 'black', paddingLeft: '12px' }}>
                    City <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={bookingDetails.city}
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
            <label htmlFor="occuputation" style={{ color: 'black', paddingLeft: '12px' }}>
                    Occuputation <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="occuputation"
                    name="occuputation"
                    type="text"
                    value={bookingDetails.occuputation}
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
            <label htmlFor="officeNumber" style={{ color: 'black', paddingLeft: '12px' }}>
              Office Number<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="officeNumber"
                    name="officeNumber"
                    type="text"
                    value={bookingDetails.officeNumber}
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
            <label htmlFor="officeDetails" style={{ color: 'black', paddingLeft: '12px' }}>
              Office Details <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="officeDetails"
                    name="officeDetails"
                    type="text"
                    value={bookingDetails.officeDetails}
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









      {/* Service Selection: Pickup or Delivery */}
      <MDBTypography tag="h6" className="text-start mt-4 mb-3" style={{ fontWeight: 'bold' }}>
        Select Service Type
      </MDBTypography>

      <MDBRow className="mb-4">
        <MDBCol md="6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="serviceType"
              id="pickup"
              value="pickup"
              checked={selectedService === 'pickup'}
              onChange={handleServiceChange}
            />
            <label className="form-check-label" htmlFor="pickup">
              Pickup
            </label>
          </div>
        </MDBCol>
        <MDBCol md="6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="serviceType"
              id="delivery"
              value="delivery"
              checked={selectedService === 'delivery'}
              onChange={handleServiceChange}
            />
            <label className="form-check-label" htmlFor="delivery">
              Delivery
            </label>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Conditionally Render Delivery Address Fields */}
      {selectedService === 'delivery' && (
        <>
          <MDBTypography tag="h6" className="text-start mt-4 mb-3" style={{ fontWeight: 'bold' }}>
            Courier Delivery Address
          </MDBTypography>

          <MDBRow>
            <MDBCol md="6">
              <label htmlFor="fullAddress" style={{ color: 'black', paddingLeft: '12px' }}>
                Full Address <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="fullAddress"
                name="fullAddress"
                type="text"
                value={bookingDetails.fullAddress}
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
              <label htmlFor="landmark" style={{ color: 'black', paddingLeft: '12px' }}>
                Landmark <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="landmark"
                name="landmark"
                type="text"
                value={bookingDetails.landmark}
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
        </>
      )}










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

                        !bookingDetails.gender ||
                        !bookingDetails.civilStatus ||
                        !bookingDetails.birthDate ||
                        !bookingDetails.countryBirth ||
                        !bookingDetails.provinceBirth ||
                        !bookingDetails.municipalityBirth ||

                        !bookingDetails.firstnameFather ||
                        !bookingDetails.middlenameFather ||
                        !bookingDetails.lastnameFather ||
                        !bookingDetails.countryCitizenshipFather ||

                        !bookingDetails.firstnameMother ||
                        !bookingDetails.middlenameMother ||
                        !bookingDetails.lastnameMother ||
                        !bookingDetails.countryCitizenshipMother ||

                        !bookingDetails.firstnameSpouse ||
                        !bookingDetails.middlenameSpouse ||
                        !bookingDetails.lastnameSpouse ||

                        !bookingDetails.applicationType ||

                        !bookingDetails.oldPassportNumber ||
                        !bookingDetails.dateIssued ||
                        !bookingDetails.issuingAuthority ||

                        !bookingDetails.foreignPassportHolder ||
                        !bookingDetails.emergencyContactPerson ||
                        !bookingDetails.contactNumberForeign ||

                        !bookingDetails.province ||
                        !bookingDetails.city ||
                        !bookingDetails.occuputation ||
                        !bookingDetails.officeNumber ||
                        !bookingDetails.officeDetails

                      } 
                    >
                      REQUEST QUOTATION
                    </button>
                  </MDBCol>
                </MDBRow>


            </form>
          </MDBCardBody>
        </MDBCard>
      </div>
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

export default PassportDetails;
