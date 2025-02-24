import React, { useState } from 'react';
import { MDBTypography, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Toast from './Toast';

function CreateStaffAccount({ key, onBack }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    serviceHandle: 'Car Rental' 
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    
    // Remove confirmPassword field before sending
    const { confirmPassword, ...submitData } = formData;

    setLoading(true);
    try {
      const response = await axios.post('https://travelwheelsph.onrender.com/api/users/create-staff-account', submitData);
      if (response.status === 201) {
        showToast('Staff account created successfully', 'success');
        onBack();
      }
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'Failed to create staff account';
      showToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-staff-account" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <MDBTypography tag="h2" className="text-start" style={{ fontWeight: 'bold', color: 'rgb(255, 165, 0)', marginBottom: '20px' }}>
        CREATE STAFF ACCOUNT
      </MDBTypography>
      <form onSubmit={handleSubmit}>
        <MDBRow className="mb-2">
          <MDBCol md="6">
            <label htmlFor="firstname" style={{ color: 'black', paddingLeft: '12px' }}>
              First Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={formData.firstname}
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
            <label htmlFor="lastname" style={{ color: 'black', paddingLeft: '12px' }}>
              Last Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={formData.lastname}
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

        <MDBRow className="mb-2">
          <MDBCol md="6">
            <label htmlFor="email" style={{ color: 'black', paddingLeft: '12px' }}>
              Email <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
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
            <label htmlFor="contactNumber" style={{ color: 'black', paddingLeft: '12px' }}>
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="text"
              value={formData.contactNumber}
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
        </MDBRow>

        {/* Service Role Dropdown */}
        <MDBRow className="mb-2">
          <MDBCol md="6">
            <label htmlFor="serviceHandle" style={{ color: 'black', paddingLeft: '12px' }}>
              Service Role <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              id="serviceHandle"
              name="serviceHandle"
              value={formData.serviceHandle}
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
            >
              <option value="Car Rental">Car Rental</option>
              <option value="Transfer">Transfer</option>
              <option value="Hotel Booking">Hotel Booking</option>
              <option value="Passport Appointment">Passport Appointment</option>
              <option value="Hotel Reservation">Hotel Reservation</option>
              <option value="MICE">MICE</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Travel Insurance">Travel Insurance</option>
              <option value="Tour Packages - Domestic">Tour Packages - Domestic</option>
              <option value="Tour Packages - International">Tour Packages - International</option>
              <option value="Educational Tour">Educational Tour</option>
            </select>
          </MDBCol>
        </MDBRow>

        {/* Password and Confirm Password */}
        <MDBRow className="mb-3">
          <MDBCol md="6">
            <label htmlFor="password" style={{ color: 'black', paddingLeft: '12px' }}>
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
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
            <label htmlFor="confirmPassword" style={{ color: 'black', paddingLeft: '12px' }}>
              Confirm Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
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

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <MDBBtn
            style={{ backgroundColor: 'rgb(255, 165, 0)', borderColor: 'rgb(255, 165, 0)', color: '#fff', marginRight: '10px' }}
            onClick={onBack}
          >
            Back
          </MDBBtn>
          <MDBBtn
            type="submit"
            color="success"            
            disabled={
                formData.confirmPassword != formData.password ||
                !formData.lastname ||
                !formData.firstname ||
                !formData.contactNumber
            }>
            {loading ? 'Creating...' : 'Create Account'}
          </MDBBtn>
        </div>
      </form>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default CreateStaffAccount;
