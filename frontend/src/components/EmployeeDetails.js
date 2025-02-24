import React, { useState } from 'react';
import { MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import axios from 'axios';

function EmployeeDetails({ user, onBack }) {
  const [toast, setToast] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };


  const updateServiceRole = async (email, newRole) => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/users/update-service-role', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, serviceHandle: newRole }),
      });
      if (!response.ok) {
        throw new Error('Failed to update service role');
      }
      showToast(`Service handle will be updated to ${newRole}`, 'success');
      navigate('/admin', { state: { name: "Admin" } });
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };
  
  
  const deleteStaffAccount = async (email) => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/users/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete staff account');
      }
      showToast('Staff account will now be deleted!', 'success');
      navigate('/admin', { state: { name: "Admin" } });
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };
  

  return (
    <div
      className="user-details"
      style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', position: 'relative' }}
    >
      <h2 style={{ fontWeight: 'bold', color: 'rgb(255, 165, 0)', marginBottom: '10px' }}>
        EMPLOYEE DETAILS
      </h2>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', paddingRight: '10px' }}>
          <p style={{ fontWeight: 'bold', lineHeight: '0.7', paddingTop: '40px' }}>GENERAL INFORMATION</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>
            Name: {`${user.firstname} ${user.lastname}`}
          </p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Email: {user.email}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>
            Contact Number: {user.contactNumber}
          </p>
          <p
            style={{
              fontWeight: 'bold',
              lineHeight: '0.5',
              paddingTop: '30px',
            }}
          >
            Service Handle: {user.serviceHandle}
          </p>

          {/* Dropdown to update service role */}
          <MDBDropdown>
            <MDBDropdownToggle
              style={{
                borderRadius: '5px',
                padding: '10px',             
                backgroundColor: 'rgb(255, 165, 0)',
                borderColor: 'rgb(255, 165, 0)',
                width: '250px'
            }}
            >
              Change Service Role
            </MDBDropdownToggle>
            <MDBDropdownMenu style={{paddingLeft: '7px', paddingRight: '7px'}}>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'Car Rental')}>
                Car Rental
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'Transfer')}>
                Transfer
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'Passport Appointment')}>
                Passport Appointment
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'Flights')}>
                 Flights
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'Hotel Reservation')}>
                Hotel Reservation
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'MICE')}>
                MICE
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'Travel Insurance')}>
                Travel Insurance
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'Tour Packages - Domestic')}>
                Tour Packages - Domestic
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'Tour Packages - International')}>
                Tour Packages - International
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => updateServiceRole(user.email, 'Educational Tour')}>
                Educational Tour
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>



          

          <p style={{ fontWeight: 'bold', lineHeight: '0.5', paddingTop: '50px' }}>
            Account Status: {user.accountStatus}
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '35px'
        }}
      >
        {/* Delete Staff Account Button on lower left */}
        <MDBBtn
          style={{ backgroundColor: 'red', borderColor: 'red', color: '#fff' }}
          onClick={() => {deleteStaffAccount(user.email)}}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete Staff Account'}
        </MDBBtn>

        <MDBBtn
          style={{
            backgroundColor: 'rgb(255, 165, 0)',
            borderColor: 'rgb(255, 165, 0)',
            color: '#fff'
          }}
          onClick={onBack}
        >
          Back
        </MDBBtn>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default EmployeeDetails;
