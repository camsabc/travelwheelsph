import React, { useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../Feedback.css'
import Toast from '../../components/Toast';

import Modal from '../../components/Modal'; 

import logo from '../../images/header.jpg';

import {
  MDBContainer,
  MDBCardImage,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit';

const FeedbackGuest = () => {
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

  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmLogin = () => {
    navigate('/login')
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

  return (
      <>
        {/* HEADER */}
        <div className="bg-white py-2" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
        <MDBCardImage
    src={logo}
    style={{ width: '200px', cursor: 'pointer' }}
    alt="Header Logo"
    onClick={() => navigate('/')} 
  />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink 
                      onClick={() => navigate('/services-guest')}
                      style={{ margin: '0 25px' }}
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

              <span
                onClick={() => {navigate('/login')}}
                style={{
                  margin: '0 25px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, Guest
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

    <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogin}
       />
    </>
  );
};

export default FeedbackGuest;
