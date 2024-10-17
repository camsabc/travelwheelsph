import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditProfile.css';
import logo from '../images/header.jpg';

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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [profileImage, setProfileImage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    setProfileImage(e.target.files[0]);
  };



  const handleUploadClick = () => {

  };

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

    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Profile</h1>
      <hr className="title-line" />

      <div className="profile-photo-section">
        <img
          src={profileImage ? URL.createObjectURL(profileImage) : '/path/to/default-image.jpg'}
          alt="Profile"
          className="profile-img"
        />
        <div className="photo-buttons">
          {/* Hidden file input for image upload */}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <button className="upload-photo-btn" onClick={handleUploadClick}>
            Upload Photo
          </button>
          <button className="remove-photo-btn" onClick={() => {}}>
            Remove Photo
          </button>
        </div>
      </div>

      <form onSubmit={() => {}} className="edit-profile-form">
        <div className="account-details-container">
          <h3>Account Details</h3>
          <div className="form-grid">
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
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
          </div>

          <div className="button-container">
            <button type="submit" className="save-button">SAVE</button>
            <button type="button" className="cancel-button">CANCEL</button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default EditProfile;
