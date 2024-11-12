import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';
import logo from '../images/header.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Toast from '../components/Toast';
import {
  MDBContainer,
  MDBCardImage,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confpassword: ''
  });

  const [toast, setToast] = useState(null); // Toast state
  const showToast = (message, type) => {
    console.log('Toast triggered:', message, type); // Debug
    setToast({ message, type });
  };

  const [profileImage, setProfileImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [originalEmail, setOriginalEmail] = useState(email); // Track the original email
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setLoading(false);
          } else {
            setUser(data);
            setProfileData({
              firstname: data.firstname || '',
              lastname: data.lastname || '',
              email: data.email || '',
              phone: data.phone || '',
              password: '',
              confpassword: ''
            });
            setLoading(false);
          }
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          setError('Failed to fetch data.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [email]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleUploadClick = () => {
    // Logic to trigger the hidden file input
  };

  const sendOtp = async (newEmail, userId) => {
    try {
      const response = await axios.post('http://localhost:3000/new-email-otp', {
        newEmail,
        userId,
        firstname: user.firstname
      });

      if (response.status === 201) {
        showToast('An OTP has been sent to your email.', 'success');
        navigate('/change-email-otp', { state: { newEmail, email: user.email, firstname: user.firstname, userId } });
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === 'User already exists') {
        setErrors({ email: 'This email is already registered. Please use a different email.' });
      } else {
        showToast('An error occurred while submitting the form.', 'error');
      }
    }
  };


  const handleEdit = async () => {

    const userId = user._id; 

    if (profileData.password !== profileData.confpassword) {
      setError('Passwords do not match.');
      return;
    }

    // Check if the email has changed
    if (originalEmail !== profileData.email) {
      await sendOtp(profileData.email, userId);
      return; // Stop here to await OTP verification
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/edit-user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        alert('Profile updated successfully!');
        navigate('/profile', { state: { email: updatedData.email } });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating the profile.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: profileData.email, otp }),
      });

      if (response.ok) {
        // Proceed with updating the profile after successful OTP verification
        handleEdit();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to verify OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('An error occurred while verifying OTP.');
    }
  };























  return (
    <>
      <div className="bg-white py-2 mb-1" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
          <MDBCardImage
            src={logo}
            style={{ width: '200px', cursor: 'pointer' }}
            alt="Header Logo"
            onClick={() => navigate('/home-user', { state: { email: user.email } })}
          />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => navigate('/services', { state: { email: user.email } })}>Services</span>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email } })}>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry', { state: { email: user.email } })}>Inquiry</MDBNavbarLink>
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

      <div className="edit-profile-container">
        <h1 className="edit-profile-title">Edit Profile</h1>
        <hr className="title-line" />

        <div className="profile-photo-section">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="profile-img"
            />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} size="6x" className="profile-icon" />
          )}
          <div className="photo-buttons">
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <button className="upload-photo-btn" onClick={handleUploadClick}>
              Upload Photo
            </button>
            <button className="remove-photo-btn" onClick={() => setProfileImage(null)}>
              Remove Photo
            </button>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); isOtpSent ? verifyOtp() : handleEdit(); }} className="edit-profile-form">
          <div className="account-details-container">
            <h3>Account Details</h3>
            <div className="form-grid">
              <input
                type="text"
                name="firstname"
                value={profileData.firstname}
                onChange={handleChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastname"
                value={profileData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleChange}
                placeholder="New Password"
              />
              <input
                type="password"
                name="confpassword"
                value={profileData.confpassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              {isOtpSent && (
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP sent to your new email"
                />
              )}
            </div>

            <div className="button-container">
              <button type="submit" className="save-button">SAVE</button>
              <button type="button" className="cancel-button" onClick={() => navigate('/profile')}>CANCEL</button>
            </div>
          </div>
        </form>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </>
  );
};

export default EditProfile;
