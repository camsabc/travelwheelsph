import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import axios from 'axios';

function UserDetails({ user, onBack }) {
  const [toast, setToast] = useState(null);
  const [quotations, setQuotations] = useState([]); // State to hold quotations
  const [showQuotations, setShowQuotations] = useState(false); // State to toggle views
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for fetching quotations

  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  // Fetch quotations when the component loads
  useEffect(() => {
    const fetchQuotations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/api/quotations/get-all-quotations-by-email/${user.email}`)
        const data = await response.json();
        setQuotations(data);
      } catch (error) {
        console.error('Error fetching quotations:', error);
        setError('Failed to fetch quotations.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [user.email]);


  if (showQuotations) {
    return (
      <div className="quotations-list" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <h2 style={{ fontWeight: 'bold', color: 'rgb(255, 165, 0)', marginBottom: '10px' }}>QUOTATION HISTORY</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && quotations.length > 0 ? (
          <ul style={{ padding: '0', margin: '0' }}>
            {quotations.map((quotation, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '10px',
                  padding: '10px 10px 10px 0', // Remove left padding
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#F6E7AA',
                }}
              >
                <p style={{ margin: '15px 0', paddingLeft: '15px', fontSize: '20px' }}>
                  <strong>Quotation #{quotation.num}</strong>
                </p>
                <p style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <strong>Service Type:</strong> {quotation.type}
                </p>
                <p style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <strong>Travel Date:</strong> {formatDate(quotation.startDate)} - {formatDate(quotation.endDate)}
                </p>
                <p style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <strong>Number of Pax:</strong> {quotation.numOfPerson}
                </p>
                <p style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <strong>Pickup Location:</strong> {quotation.pickupLocation}
                </p>
                <p style={{ margin: '2px 0', paddingLeft: '15px', marginBottom: '20px' }}>
                  <strong>Dropoff Location:</strong> {quotation.dropOffLocation}
                </p>
                <p style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <strong>Remarks:</strong> {quotation.remarks}
                </p>
                <p style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <strong>Status:</strong> {quotation.status}
                </p>
              </div>
            ))}
          </ul>
        ) : (
          !loading && <p>No quotations found.</p>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <MDBBtn
            style={{ backgroundColor: 'rgb(255, 165, 0)', borderColor: 'rgb(255, 165, 0)', color: '#fff' }}
            onClick={() => setShowQuotations(false)}
          >
            Back to User Details
          </MDBBtn>
        </div>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  return (
    <div className="user-details" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2 style={{ fontWeight: 'bold', color: 'rgb(255, 165, 0)', marginBottom: '10px' }}>USER DETAILS</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', paddingRight: '10px' }}>
          <p style={{ fontWeight: 'bold', lineHeight: '0.7', paddingTop: '40px' }}>GENERAL INFORMATION</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Name: {`${user.firstname} ${user.lastname}`}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Email: {user.email}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Contact Number: {user.contactNumber}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5', paddingTop: '30px', paddingBottom: '5px' }}>
            Number of Quotation Transactions: {quotations.length} Quotations
          </p>

          <button
            style={{
              backgroundColor: '#3D84B9',
              color: '#fff',
              padding: '7px 12px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '4px',
            }}
            onClick={() => setShowQuotations(true)}
          >
            View All Quotation History
          </button>

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
