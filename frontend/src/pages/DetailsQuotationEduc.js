import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBBtn,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter
} from 'mdb-react-ui-kit';
import flightsbg from '../images/flightsbg.jpg';
import logo from '../images/header.jpg';
import Toast from '../components/Toast';

function DetailsQuotationEduc() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);
  const { id } = useParams(); 
  const location = useLocation();
  const email = location.state?.email;
  const [user, setUser] = useState(null);
  const [educ, setEduc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [toast, setToast] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isPopulateChecked, setIsPopulateChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
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
    pickupLocation: '',
    dropoffLocation: '',
    numOfPersons: '',
    remarks: '',
    status: 'Pending',
    num: '',
    type: 'Educational Tour',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
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
                        <p style={{ marginBottom: '5px' }}>Package: Package #{educ.num} </p>

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
      try {
        if (email) {
          const userResponse = await fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`);
          const userData = await userResponse.json();
          if (userData.error) {
            setError(userData.error);
            return;
          }
          setUser(userData);
        }

        const educResponse = await fetch(`https://travelwheelsph.onrender.com/api/educs/get-educ-by-id/${id}`);
        const educData = await educResponse.json();
        if (educData.error) {
          setError(educData.error);
          return;
        }
        setEduc(educData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, email]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <MDBTypography tag="h2" style={{ fontWeight: 'bold', color: 'rgb(255, 165, 0)' }}>
          Loading...
        </MDBTypography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <MDBTypography tag="h4" style={{ fontWeight: 'bold', color: 'red' }}>
          {error}
        </MDBTypography>
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
                  onClick={() => navigate('/services', { state: { email: user.email } })}
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

      {/* Main Content Section */}
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
        <MDBTypography
          tag="h1"
          className="text-center mt-5"
          style={{
            fontWeight: 'bolder',
            color: 'white',
            fontSize: '60px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
          }}
        >
          PACKAGE {educ.num}
        </MDBTypography>

        <MDBContainer className="flex-grow-1 d-flex align-items-center justify-content-center">
          <MDBCard
            style={{
              maxWidth: '900px',
              width: '100%',
              marginBottom: '50px',
              backgroundColor: 'rgba(255, 255, 255)',
              padding: '20px',
              borderRadius: '15px',
            }}
          >
            <MDBCardBody>
              <MDBTypography tag="h5" className="text-center mb-5">
                Kindly complete the details below:
              </MDBTypography>
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
    <label htmlFor="vehicleName" style={{ color: 'black', paddingLeft: '12px' }}>
                    Package <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="vehicleName"
                    name="vehicleName"
                    type="text"
                    value={"Package " + educ.num}
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
      onClick={handlePreviewQuotation}
      disabled={
        !isChecked ||
        !bookingDetails.lastname ||
        !bookingDetails.firstname ||
        !bookingDetails.contactNumber

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

export default DetailsQuotationEduc;
