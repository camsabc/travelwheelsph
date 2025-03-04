import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
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

function DetailsIntPackOneGuest() {
  const navigate = useNavigate();
  const [backgroundImage] = useState(flightsbg);
  const { id } = useParams();
  const location = useLocation();
  const email = location.state?.email;
  const [user, setUser] = useState(null);
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passengers, setPassengers] = useState([]);

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
              paddingLeft: '40px'
            }}
          >


          <MDBTypography
              className="text-start mt-1"
              style={{
                fontWeight: 'bolder',
                color: '#FFA500',
                fontSize: '24px',
              }}
            >
              ITIRENARY
            </MDBTypography>

            {/* Buttons for changing div */}
            <div className="text-start mb-0 mt-0" style={{  }}>
              <button
                type="button"
                style={{
                  fontWeight: displayDiv === 1 ? 'bold' : 'normal',
                  width: '10%',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  border: 'solid',
                  borderColor: '#FFA500',
                  padding: '7px 10px',
                  color: 'black',
                  fontSize: '12px'
                }}
                onClick={() => handleButtonClick(1)}
              >
                Day 1
              </button>

              <button
                type="button"
                style={{
                  fontWeight: displayDiv === 2 ? 'bold' : 'normal',
                  width: '10%',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  border: 'solid',
                  borderColor: '#FFA500',
                  padding: '7px 10px',
                  color: 'black',
                  fontSize: '12px',
                  marginLeft: '10px'
                }}
                onClick={() => handleButtonClick(2)}
              >
                Day 2
              </button>

              <button
                type="button"
                style={{
                  fontWeight: displayDiv === 3 ? 'bold' : 'normal',
                  width: '10%',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  border: 'solid',
                  borderColor: '#FFA500',
                  padding: '7px 10px',
                  color: 'black',
                  fontSize: '12px',
                  marginLeft: '10px'
                }}
                onClick={() => handleButtonClick(3)}
              >
                Day 3
              </button>

              <button
                type="button"
                style={{
                  fontWeight: displayDiv === 4 ? 'bold' : 'normal',
                  width: '10%',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  border: 'solid',
                  borderColor: '#FFA500',
                  padding: '7px 10px',
                  color: 'black',
                  fontSize: '12px',
                  marginLeft: '10px'
                }}
                onClick={() => handleButtonClick(4)}
              >
                Day 4
              </button>
            </div>





            <MDBTypography
              className="d-flex align-items-center text-start mt-3"
              style={{
                fontWeight: 'bolder',
                color: '#FFA500',
                fontSize: '20px',
                marginBottom: '5px' 
              }}
            >
              <MDBIcon
                icon="circle-exclamation"
                style={{ color: '#FFA500', marginRight: '8px' }}
              /> 
              NOTE
            </MDBTypography>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                <p style={{ fontSize: '12px', margin: 0 }}> Daily itinerary time schedule and sequence may change at all times depending on local conditions. </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                <p style={{ fontSize: '12px', margin: 0 }}> Duration of stay on each tourist spot is just estimated and subject to change without prior notice depending on local condition. </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                <p style={{ fontSize: '12px', margin: 0 }}> Buying product at mandatory stop shop is not required. </p>
              </div>
            </div>






            <MDBTypography
              className="d-flex align-items-center text-start mt-5"
              style={{
                fontWeight: 'bolder',
                color: '#FFA500',
                fontSize: '24px',
                marginBottom: '5px' 
              }}
            >
              INCLUSIONS
            </MDBTypography>

            <MDBRow>
              <MDBCol md="6">
              <MDBTypography
                className="d-flex align-items-center text-start mt-1"
                style={{
                  fontWeight: 'bolder',
                  color: '#FFA500',
                  fontSize: '20px',
                  marginBottom: '5px' 
                }}
              >
                <MDBIcon
                  icon="plane"
                  style={{ color: '#FFA500', marginRight: '8px' }}
                /> 
                Flight
              </MDBTypography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> BR262 | MNL - TPE | 5:45 - 8:05 </p>
                </div>
              </MDBCol>

              <MDBCol md="6">
              <MDBTypography
                className="d-flex align-items-center text-start mt-1"
                style={{
                  fontWeight: 'bolder',
                  color: '#FFA500',
                  fontSize: '20px',
                  marginBottom: '5px' 
                }}
              >
                <MDBIcon
                  icon="hotel"
                  style={{ color: '#FFA500', marginRight: '8px' }}
                /> 
                Hotel
              </MDBTypography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Golden Pacific Hotel Taichung </p>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow className='mt-4'>
              <MDBCol md="6">
              <MDBTypography
                className="d-flex align-items-center text-start mt-1"
                style={{
                  fontWeight: 'bolder',
                  color: '#FFA500',
                  fontSize: '20px',
                  marginBottom: '5px' 
                }}
              >
                <MDBIcon
                  icon="utensils"
                  style={{ color: '#FFA500', marginRight: '8px' }}
                /> 
                Meals
              </MDBTypography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> 3 Breakfast at the hotel  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> 1 breakfast at the local restaurant </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> 4 Lunch at the local restaurant </p>
                </div>
              </MDBCol>

              <MDBCol md="6">
              <MDBTypography
                className="d-flex align-items-center text-start mt-1"
                style={{
                  fontWeight: 'bolder',
                  color: '#FFA500',
                  fontSize: '20px',
                  marginBottom: '5px' 
                }}
              >
                <MDBIcon
                  icon="car"
                  style={{ color: '#FFA500', marginRight: '8px' }}
                /> 
                Transfer
              </MDBTypography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> All transfers included as per itinerary </p>
                </div>
              </MDBCol>
            </MDBRow>


            <MDBRow className='mt-4'>
              <MDBCol md="12">
              <MDBTypography
                className="d-flex align-items-center text-start mt-1"
                style={{
                  fontWeight: 'bolder',
                  color: '#FFA500',
                  fontSize: '20px',
                  marginBottom: '5px' 
                }}
              >
                <MDBIcon
                  icon="route"
                  style={{ color: '#FFA500', marginRight: '8px' }}
                /> 
                Tours
              </MDBTypography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Chungshe Flower Garden </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Sun Moon Lake (included cruise ship) </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Tea Garden </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Painted Animation Lane or National Taiwan Museum of Fine Arts (outside view) </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Night Market </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Hotel (Golden Pacific Hotel Taichung or similar) </p>
                </div>
              </MDBCol>
            </MDBRow>



            <MDBRow className='mt-4'>
              <MDBCol md="12">
              <MDBTypography
                className="d-flex align-items-center text-start mt-1"
                style={{
                  fontWeight: 'bolder',
                  color: '#FFA500',
                  fontSize: '20px',
                  marginBottom: '5px' 
                }}
              >
                <MDBIcon
                  icon="map-location-dot"
                  style={{ color: '#FFA500', marginRight: '8px' }}
                /> 
                Guide
              </MDBTypography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> English-speaking Tour Guide </p>
                </div>
              </MDBCol>
            </MDBRow>





            <MDBTypography
              className="d-flex align-items-center text-start mt-5"
              style={{
                fontWeight: 'bolder',
                color: '#FFA500',
                fontSize: '24px',
                marginBottom: '5px' 
              }}
            >
              EXLUSIONS
            </MDBTypography>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MDBIcon icon="xmark" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                <p style={{ fontSize: '16px', margin: 0 }}> Expenses of a personal nature like telephone calls, mini bar, etc. </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MDBIcon icon="xmark" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                <p style={{ fontSize: '16px', margin: 0 }}> Extra Baggage allowance </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MDBIcon icon="xmark" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                <p style={{ fontSize: '16px', margin: 0 }}> Philippines Travel Tax: USD31/PAX (collected with tour fee) </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MDBIcon icon="xmark" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                <p style={{ fontSize: '16px', margin: 0 }}> Tips for driver and guide: USD20/PAX (collected with tour fee) </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MDBIcon icon="xmark" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                <p style={{ fontSize: '16px', margin: 0 }}> Single supplement: USD129/PAX (collected with tour fee) </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MDBIcon icon="xmark" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                <p style={{ fontSize: '16px', margin: 0 }}> Covid-19 test if needed </p>
              </div>
            </div>


            <MDBRow className='mt-4'>
              <MDBCol md="12">
              <MDBTypography
                className="d-flex align-items-center text-start mt-1"
                style={{
                  fontWeight: 'bolder',
                  color: '#FFA500',
                  fontSize: '20px',
                  marginBottom: '5px' 
                }}
              >
                <MDBIcon
                  icon="check-circle"
                  style={{ color: '#FFA500', marginRight: '8px' }}
                /> 
                Booking Condition
              </MDBTypography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> USD 300/PAX booking deposit should be made within 3 days upon conformation (non-refundable) </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Full payment should be made at least 40 days prior to departure
                  </p>
                </div>
              </MDBCol>
            </MDBRow>


            
            <MDBRow className='mt-4'>
              <MDBCol md="12">
              <MDBTypography
                className="d-flex align-items-center text-start mt-1"
                style={{
                  fontWeight: 'bolder',
                  color: '#FFA500',
                  fontSize: '20px',
                  marginBottom: '5px' 
                }}
              >
                <MDBIcon
                  icon="circle-exclamation"
                  style={{ color: '#FFA500', marginRight: '8px' }}
                /> 
                Important Notice
              </MDBTypography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Itinerary is subject to change without prior notice </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Subject to weather conditions </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> All room bookings are based on twin sharing by default, no guarantee for triple room </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> In case above hotels are not available at your requested time, they will be replaced by similar ones </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MDBIcon icon="check" style={{ color: '#FFA500', marginRight: '8px', paddingBottom: '25px' }}/> 
                  <p style={{ fontSize: '16px', margin: 0 }}> Please note that the above rate is with shops visiting, please kindly explain to paxs that they will visit: Tea Garden, Cake Shop, Jade Handicraft, Duty Free Shop or Cosmetic Shop </p>
                </div>

              </MDBCol>
            </MDBRow>

            <MDBRow className='mt-5 mb-2'>
              <MDBCol md="8">
              </MDBCol>
              <MDBCol md="4">
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
                    onClick={() => navigate(`/pack-int-two-guest/${id}`)}
                  >
                    NEXT
                  </button>
              </MDBCol>
            </MDBRow>






 

          </MDBCard>
        </MDBContainer>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <ChatbotGuest />
    </>
  );
}

export default DetailsIntPackOneGuest;
