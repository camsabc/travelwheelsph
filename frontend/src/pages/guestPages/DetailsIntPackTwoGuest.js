import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import flightsbg from '../../images/flightsbg.jpg';
import logo from '../../images/header.jpg';
import Toast from '../../components/Toast';
import ChatbotGuest from './ChatbotGuest';

function DetailsIntPackTwoGuest() {
  const navigate = useNavigate();
  const [backgroundImage] = useState(flightsbg);
  const { id } = useParams();
  const location = useLocation();
  const email = location.state?.email;
  const [user, setUser] = useState(null);
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [displayDiv, setDisplayDiv] = useState(1); // Default div
  const [displayDivSub, setDisplayDivSub] = useState(1); // Default div

  const [toast, setToast] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isPopulateChecked, setIsPopulateChecked] = useState(false);
    const [passengers, setPassengers] = useState([]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const [children, setChildren] = useState([{ firstname: '' }]);
  const [seniors, setSeniors] = useState([{ firstname: '' }]);
  const [adults, setAdults] = useState([{ firstname: '' }]);


  const addChildPassenger = () => {
    const newPassenger = { firstname: '' };
    setChildren([...children, newPassenger]);
  };

  const addSeniorPassenger = () => {
    const newPassenger = { firstname: '' };
    setSeniors([...seniors, newPassenger]);
  };

  const addAdultPassenger = () => {
    const newPassenger = { firstname: '' };
    setAdults([...adults, newPassenger]);
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
    type: 'Tour Packages - International',
    passengers: []
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

  // Handlers for buttons to change div
  const handleButtonClick = (divNumber) => setDisplayDiv(divNumber);
  const handleButtonClickSub = (divNumberSub) => setDisplayDivSub(divNumberSub);

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

        const packResponse = await fetch(`https://travelwheelsph.onrender.com/api/packs/get-pack-by-id/${id}`);
        const packData = await packResponse.json();
        if (packData.error) {
          setError(packData.error);
          return;
        }
        setPack(packData);
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
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  fontWeight: 'bold',
                  width: '100%',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: 'rgb(255, 165, 0)',
                  padding: '5x 20px',
                  fontSize: '14px'
                }}
                onClick={() => navigate('/login')}
              >
                Log In / Sign up
              </button>
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
          {pack.name} {pack.duration}
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
              <MDBTypography className="text-center mb-4" style={{ color: 'rgb(255, 165, 0)', fontSize: '18px' }}>
                <span
                  style={{ fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate('/login')}
                > Sign in </span>{' '}or{' '}
                <span
                  style={{ fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline'}}
                  onClick={() => navigate('/signup')}
                > Sign up </span>{' '}here to request a quotation!
              </MDBTypography>
              <MDBTypography tag="h5" className="text-center mb-4">
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
                        onClick={() => navigate('/terms-and-conditions-guest')}
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
                      onClick={() => navigate('/services-guest')}
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
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <ChatbotGuest />
    </>
  );
}

export default DetailsIntPackTwoGuest;
