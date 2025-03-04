import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  MDBCardImage
} from 'mdb-react-ui-kit';
import flightsbg from '../images/flightsbg.jpg';
import logo from '../images/header.jpg';
import Toast from '../components/Toast';
import Chatbot from "../components/Chatbot";

function Feedback() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { id, email } = location.state || {}; 
  const [quotationDetails, setQuotationDetails] = useState(null);
  const [quotations, setQuotations] = useState([]); 
  const [backgroundImage] = useState(flightsbg);
  const [toast, setToast] = useState(null);

  // Default feedback data with initial values
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    service: 'Default Service',
    duration: '',
    startDate: '',
    remarkLike: '',
    remarkImprove: '',
    rateBookingExperience: 0,
    rateCustomerService: 0,
    rateOverallExperience: 0,
    ratePricing: 0,
    reco: '' 
  });
  
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleRatingBookExpChange = (value) => {
    setFeedbackData(prev => ({ ...prev, rateBookingExperience: value }));
  };

  const handleRatingCustSerChange = (value) => {
    setFeedbackData(prev => ({ ...prev, rateCustomerService: value }));
  };

  const handleRatingOveExpChange = (value) => {
    setFeedbackData(prev => ({ ...prev, rateOverallExperience: value }));
  };

  const handleRatingPriChange = (value) => {
    setFeedbackData(prev => ({ ...prev, ratePricing: value }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/feedbacks/create-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
        });

        const result = await response.json();

        if (result.error) {
            setError(result.error);
            return;
        }

        showToast('Feedback created successful!', 'success');
        navigate('/home-user', { state: { email: user.email }})
    } catch (err) {
        console.error('Error creating feedback:', err);
        setError('Failed to submit feedback request.');
    }
};
  

  useEffect(() => {
    if (email) {
      fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setLoading(false);
          } else {
            setUser(data);
            // Set feedback name by concatenating firstName and lastName
            const fullName = `${data.firstname} ${data.lastname}`;
            setFeedbackData(prev => ({
              ...prev,
              name: fullName
            }));
            return fetch(`https://travelwheelsph.onrender.com/api/quotations/get-all-quotations-by-email/${email}`);
          }
        })
        .then(response => response && response.json())
        .then(data => {
          if (data && data.error) {
            setError(data.error);
          } else if (data) {
            setQuotations(data);
            if (id) {
              return fetch(`https://travelwheelsph.onrender.com/api/quotations/get-quotation-by-id/${id}`);
            }
          }
          setLoading(false);
        })
        .then(response => response && response.json())
        .then(data => {
          if (data && data.error) {
            setError(data.error);
          } else if (data) {
            console.log(data);
            setQuotationDetails(data);
            setFeedbackData(prev => ({
              ...prev,
              service: data.type,
             
            }));
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
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
                <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>
                  Promos
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry')}>
                  Inquiry
                </MDBNavbarLink>
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
          Submit your Feedback
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
              <MDBTypography tag="h6" className="text-start mb-4" style={{ color: 'red' }}>
                Fields with asterisks (*) are required
              </MDBTypography>

              <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{ fontWeight: 'bold' }}>
                  General Information
                </MDBTypography>

              <form>
                <MDBRow>
                  <MDBCol md="6">
                    <label htmlFor="name" style={{ color: 'black', paddingLeft: '12px' }}>
                      Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={feedbackData.name}
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
                      readOnly
                    />
                  </MDBCol>
                  <MDBCol md="6">
                    <label htmlFor="service" style={{ color: 'black', paddingLeft: '12px' }}>
                      Service <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id="service"
                      name="service"
                      type="text"
                      value={feedbackData.service}
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
                      readOnly
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="6">
                    <label htmlFor="duration" style={{ color: 'black', paddingLeft: '12px' }}>
                      Duration
                    </label>
                    <input
                      id="duration"
                      name="duration"
                      type="text"
                      value={feedbackData.duration}
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
                    <label style={{ color: 'black', paddingLeft: '12px', paddingTop: '20px' }}>
                      Would you recommend this? <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingTop: '5px' }}>
                      <label style={{ marginRight: '20px', paddingLeft: '20px' }}>
                        <input 
                          type="radio" 
                          name="reco" 
                          value="Yes"
                          checked={feedbackData.reco === 'Yes'}
                          onChange={handleChange}
                          required
                        />{' '}
                        Yes
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="reco" 
                          value="No"
                          checked={feedbackData.reco === 'No'}
                          onChange={handleChange}
                          required
                        />{' '}
                        No
                      </label>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{ fontWeight: 'bold' }}>
                  Ratings
                </MDBTypography>

                <MDBRow>
                <MDBCol md="6">
                  <label style={{ color: 'black', marginBottom: '-5px', display: 'block'}}>
                    Rate your booking experience <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', paddingLeft: '5px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: '2.5rem',
                          color: feedbackData.rateBookingExperience >= star ? '#ffc107' : '#e4e5e9',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleRatingBookExpChange(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </MDBCol>

                  <MDBCol md="6">
                  <label style={{ color: 'black', marginBottom: '-5px', display: 'block' }}>
                    Rate our customer service <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', paddingLeft: '5px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: '2.5rem',
                          color: feedbackData.rateCustomerService >= star ? '#ffc107' : '#e4e5e9',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleRatingCustSerChange(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </MDBCol>
                  
                </MDBRow>



                <MDBRow>
                <MDBCol md="6">
                  <label style={{ color: 'black', marginBottom: '-5px', display: 'block', marginTop: '10px'  }}>
                    Rate the pricing and value <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', paddingLeft: '5px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: '2.5rem',
                          color: feedbackData.ratePricing >= star ? '#ffc107' : '#e4e5e9',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleRatingPriChange(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </MDBCol>

                <MDBCol md="6">
                  <label style={{ color: 'black', marginBottom: '-5px', display: 'block', marginTop: '10px' }}>
                    Rate your overall experience <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', paddingLeft: '5px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: '2.5rem',
                          color: feedbackData.rateOverallExperience >= star ? '#ffc107' : '#e4e5e9',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleRatingOveExpChange(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </MDBCol>
                  
                </MDBRow>








<MDBTypography tag="h6" className="text-start mb-3 mt-4" style={{ fontWeight: 'bold' }}>
                  Other remarks/requests:
                </MDBTypography>

                <MDBRow>
                  <MDBCol md="12">
                  <label style={{ color: 'black', marginBottom: '10px', display: 'block'}}>
                    What did you like most with out service?
                  </label>
                    <input
                      id="remarkLike"
                      name="remarkLike"
                      type="text"
                      value={feedbackData.remarkLike}
                      placeholder="Remarks"
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


                <MDBRow>
                  <MDBCol md="12">
                  <label style={{ color: 'black', marginBottom: '10px', display: 'block', marginTop: '10px'}}>
                    What areas do you think we can improve?
                  </label>
                    <input
                      id="remarkImprove"
                      name="remarkImprove"
                      type="text"
                      value={feedbackData.remarkImprove}
                      placeholder="Remarks"
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
                      onClick={handleFeedbackSubmit}
                      disabled={!feedbackData.name || !feedbackData.service || !feedbackData.reco}
                    >
                      SUBMIT FEEDBACK
                    </button>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Chatbot user={user}/>
    </>
  );
}

export default Feedback;

