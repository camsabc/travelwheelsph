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
import flightsbg from '../images/flightsbg.jpg';
import logo from '../images/header.jpg';
import Toast from '../components/Toast';

function DetailsIntPackTwo() {
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

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const [children, setChildren] = useState([{ firstname: '' }]);
  const [seniors, setSeniors] = useState([{ firstname: '' }]);
  const [adults, setAdults] = useState([{ firstname: '' }]);

  const handlePassengerChange = (type, index, e) => {
    const { name, value } = e.target;  // Destructure to get the input name and value
  
    let updatedPassengers;
    // Check which type (child, senior, or adult) and clone the corresponding array
    if (type === 'child') {
      updatedPassengers = [...children];
    } else if (type === 'senior') {
      updatedPassengers = [...seniors];
    } else {
      updatedPassengers = [...adults];
    }
  
    // Update the appropriate field (firstname or age) based on the name attribute
    if (name === 'firstname') {
      updatedPassengers[index].firstname = value;
    } else if (name === 'age') {
      updatedPassengers[index].age = value;
    }
  
    // Update the state based on the type
    if (type === 'child') setChildren(updatedPassengers);
    else if (type === 'senior') setSeniors(updatedPassengers);
    else setAdults(updatedPassengers);
  };
  

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

  const deleteChildPassenger = (index) => {
    const newChildren = children.filter((_, i) => i !== index);
    setChildren(newChildren);
  };

  const deleteSeniorPassenger = (index) => {
    const newSenior = seniors.filter((_, i) => i !== index);
    setChildren(newSenior);
  };

  const deleteAdultPassenger = (index) => {
    const newAdult = adults.filter((_, i) => i !== index);
    setChildren(newAdult);
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
                Hi, {user ? user.firstname : 'Guest'}
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
              </MDBRow>
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

            <MDBRow>
            <MDBCol md="6">
            <label htmlFor="withChild" style={{ color: 'black', paddingLeft: '12px' }}>
                Traveling with a child? (Yes or No) 
                </label>
                <input
                  id="withChild"
                  name="withChild"
                  type="text"
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
              <label htmlFor="childNum" style={{ color: 'black', paddingLeft: '12px' }}>
                If yes, how many?
                </label>
                <input
                  id="childNum"
                  name="childNum"
                  type="number"
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





            

            {/* Render Child Passengers */}
            {children.map((passenger, index) => (
              <MDBRow key={index}>

                <MDBCol md="6">
                  <label htmlFor={`child-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                    Child's Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id={`child-${index}`}
                    value={passenger.firstname}
                    onChange={(e) => handlePassengerChange('child', index, e)}
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
                    required
                  />
                </MDBCol>

                <MDBCol md="3"> {/* Adjusted to leave space for the age input and trash icon */}
                  <label htmlFor={`child-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                    Child's Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id={`age-${index}`}
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange('child', index, e)}
                    className="form-control"
                    style={{
                      padding: '10px',
                      backgroundColor: 'transparent',
                      border: '2px solid rgb(250, 207, 32)',
                      borderRadius: '15px',
                      width: '100%',
                      marginBottom: '10px',
                    }}
                    required
                  />
                </MDBCol>

                <MDBCol md="3" className="d-flex justify-content-between align-items-center">
                  {/* Add More Button */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      fontWeight: 'bold',
                      width: '70%',
                      borderRadius: '30px',
                      backgroundColor: 'rgb(255, 165, 0)',
                      border: 'none',
                      padding: '10px 20px',
                      marginTop: '15px',
                    }}
                    onClick={addChildPassenger}
                  >
                    ADD MORE
                  </button>

                  {/* Trash Icon - Delete Passenger */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{
                      borderRadius: '50%',
                      width: '35px',
                      height: '35px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      border: 'none',
                      marginTop: '15px',
                    }}
                    onClick={() => deleteChildPassenger(index)} // Delete passenger
                  >
                    <i className="fas fa-trash" style={{ fontSize: '18px', color: '#ff4747' }}></i>
                  </button>
                </MDBCol>
              </MDBRow>
            ))}



<MDBRow>
            <MDBCol md="6">
            <label htmlFor="withSenior" style={{ color: 'black', paddingLeft: '12px' }}>
                Traveling with a senior? (Yes or No) 
                </label>
                <input
                  id="withSenior"
                  name="withSenior"
                  type="text"
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
              <label htmlFor="seniorNum" style={{ color: 'black', paddingLeft: '12px' }}>
                If yes, how many?
                </label>
                <input
                  id="seniorNum"
                  name="seniorNum"
                  type="number"
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


                
            {/* Render Seniors Passengers */}
            {seniors.map((passenger, index) => (
              <MDBRow key={index}>

                <MDBCol md="6">
                  <label htmlFor={`senior-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                    Senior's Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id={`senior-${index}`}
                    value={passenger.firstname}
                    onChange={(e) => handlePassengerChange('senior', index, e)}
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
                    required
                  />
                </MDBCol>

                <MDBCol md="3"> {/* Adjusted to leave space for the age input and trash icon */}
                  <label htmlFor={`senior-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                    Senior's Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id={`age-${index}`}
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange('senior', index, e)}
                    className="form-control"
                    style={{
                      padding: '10px',
                      backgroundColor: 'transparent',
                      border: '2px solid rgb(250, 207, 32)',
                      borderRadius: '15px',
                      width: '100%',
                      marginBottom: '10px',
                    }}
                    required
                  />
                </MDBCol>

                <MDBCol md="3" className="d-flex justify-content-between align-items-center">
                  {/* Add More Button */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      fontWeight: 'bold',
                      width: '70%',
                      borderRadius: '30px',
                      backgroundColor: 'rgb(255, 165, 0)',
                      border: 'none',
                      padding: '10px 20px',
                      marginTop: '15px',
                    }}
                    onClick={addSeniorPassenger}
                  >
                    ADD MORE
                  </button>

                  {/* Trash Icon - Delete Passenger */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{
                      borderRadius: '50%',
                      width: '35px',
                      height: '35px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      border: 'none',
                      marginTop: '15px',
                    }}
                    onClick={() => deleteSeniorPassenger(index)} // Delete passenger
                  >
                    <i className="fas fa-trash" style={{ fontSize: '18px', color: '#ff4747' }}></i>
                  </button>
                </MDBCol>
              </MDBRow>
            ))}











            {/* Render Child Passengers */}
            {adults.map((passenger, index) => (
              <MDBRow key={index}>

                <MDBCol md="6">
                  <label htmlFor={`adult-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                    Adult's Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id={`adult-${index}`}
                    value={passenger.firstname}
                    onChange={(e) => handlePassengerChange('adult', index, e)}
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
                    required
                  />
                </MDBCol>

                <MDBCol md="3"> {/* Adjusted to leave space for the age input and trash icon */}
                  <label htmlFor={`adult-${index}`} style={{ color: 'black', paddingLeft: '12px' }}>
                    Adult's Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id={`age-${index}`}
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange('adult', index, e)}
                    className="form-control"
                    style={{
                      padding: '10px',
                      backgroundColor: 'transparent',
                      border: '2px solid rgb(250, 207, 32)',
                      borderRadius: '15px',
                      width: '100%',
                      marginBottom: '10px',
                    }}
                    required
                  />
                </MDBCol>

                <MDBCol md="3" className="d-flex justify-content-between align-items-center">
                  {/* Add More Button */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      fontWeight: 'bold',
                      width: '70%',
                      borderRadius: '30px',
                      backgroundColor: 'rgb(255, 165, 0)',
                      border: 'none',
                      padding: '10px 20px',
                      marginTop: '15px',
                    }}
                    onClick={addAdultPassenger}
                  >
                    ADD MORE
                  </button>

                  {/* Trash Icon - Delete Passenger */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{
                      borderRadius: '50%',
                      width: '35px',
                      height: '35px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      border: 'none',
                      marginTop: '15px',
                    }}
                    onClick={() => deleteAdultPassenger(index)} // Delete passenger
                  >
                    <i className="fas fa-trash" style={{ fontSize: '18px', color: '#ff4747' }}></i>
                  </button>
                </MDBCol>
              </MDBRow>
            ))}










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
                      !bookingDetails.endDate
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
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

export default DetailsIntPackTwo;