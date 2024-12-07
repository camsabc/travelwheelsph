import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Feedback.css'
import logo from '../images/header.jpg';
import Toast from '../components/Toast';

import {
    MDBContainer,
    MDBCardImage,
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink
  } from 'mdb-react-ui-kit';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    tour: '',
    duration: '',
    comment: '',
    rating: 0,
    image: ''
  });


  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleRatingChange = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.tour && formData.comment && formData.rating) {
      try {
        // Send feedback to the backend
        await axios.post('/api/feedback', formData);
        setFeedbacks([formData, ...feedbacks]);
        setFormData({
          name: '',
          tour: '',
          duration: '',
          comment: '',
          rating: 0,
          image: ''
        });
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    } else {
      showToast('Error occurred', 'error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          const userResponse = await fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`);
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <>
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
              <span style={{ cursor: 'pointer' }} onClick={ () => navigate('/services', { state: { email: user.email }})}>Services</span>
            </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry', { state: { email: user.email }})}>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                  onClick={ () => navigate('/profile', { state: { email: user.email } })}
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
    <div className="feedback-container">
      <h2 className='h2'>Submit Your Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tour"
          placeholder="Select Tour"
          value={formData.tour}
          onChange={handleChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Select Duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        ></textarea>

        {/* Star Rating */}
        <div className="rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <FontAwesomeIcon
              key={value}
              icon={faStar}
              className={value <= formData.rating ? 'filled' : 'empty'}
              onClick={() => handleRatingChange(value)}
            />
          ))}
        </div>

        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">Submit</button>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
    </>
  );
};

export default Feedback;
