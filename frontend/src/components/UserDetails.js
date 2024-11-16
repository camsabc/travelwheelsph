import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import axios from 'axios'; // Or Firebase/Firestore if using that

function UserDetails({ user, onBack }) {
  const [toast, setToast] = useState(null);
  const [quotations, setQuotations] = useState([]);  // State to hold quotations
  const buttonColor = 'rgb(255, 165, 0)'; 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (user.email) {
      fetch(`https://travelwheelsph.onrender.com/api/quotations/get-all-quotations-by-email/${user.email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setQuotations(data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching quotations:', err);
          setError('Failed to fetch quotations.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user.email]);

  return (
    <div className="user-details" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2 style={{ fontWeight: 'bold', color: 'rgb(255, 165, 0)', marginBottom: '10px' }}>USER DETAILS</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* First Column */}
        <div style={{ flex: '1', paddingRight: '10px' }}>
          <p style={{ fontWeight: 'bold', lineHeight: '0.7', paddingTop: '40px' }}>GENERAL INFORMATION</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Name: {`${user.firstname} ${user.lastname}`}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Email: {user.email}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Contact Number: {user.contactNumber}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5', paddingTop: '30px', paddingBottom: '5px' }}>Number of Quotation Transactions: {quotations.length} Quotations</p>

          <btn
            style={{ backgroundColor: '#3D84B9',  color: '#fff', padding: '7px 12px', fontWeight: 'bold' }}
            onClick={() => {}}
            >
            View All Quotation History
            </btn>

            <p style={{ fontWeight: 'bold', lineHeight: '0.5', paddingTop: '50px' }}>Account: Active</p>
        </div>
      </div>


      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '35px' }}>
        <MDBBtn
          style={{ backgroundColor: 'rgb(255, 165, 0)', borderColor: 'rgb(255, 165, 0)', color: '#fff' }}
          onClick={onBack}
        >
          Back
        </MDBBtn>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default UserDetails;
