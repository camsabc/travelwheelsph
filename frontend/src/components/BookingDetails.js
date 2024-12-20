import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import Toast from './Toast'; 

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function BookingDetails({ booking, onBack }) {
  const buttonColor = 'rgb(255, 165, 0)'; 
  const isBooking = booking.db === 'booking';
  const detailsTitle = isBooking ? 'BOOKING DETAILS' : 'QUOTATION DETAILS';

  const [toast, setToast] = useState(null);
  const [adminNote, setAdminNote] = useState(booking.note || ''); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Asynchronous function to change booking status
  const changeBookingStatus = async (bookingId, status) => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/bookings/change-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId, status }),
      });
      if (!response.ok) {
        throw new Error('Failed to change status');
      }
      showToast('Status changed successfully!', 'success');
      navigate(`/admin`, { state: { name: "Admin" } });
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  // Asynchronous function to change quotation status
  const changeQuotationStatus = async (quotationId, status) => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/quotations/change-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quotationId, status }),
      });
      if (!response.ok) {
        throw new Error('Failed to change status');
      }
      showToast('Status changed successfully', 'success');
      navigate(`/admin`, { state: { name: "Admin" } });
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  const updateAdminNote = async (bookingId, note) => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/bookings/update-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId, note }),
      });
      if (!response.ok) {
        throw new Error('Failed to change status');
      }
      showToast('Status changed successfully!', 'success');
      navigate(`/admin`, { state: { name: "Admin" } });
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'travelwheels_upload');
    data.append('cloud_name', 'dnazfwgby');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dnazfwgby/upload', { method: 'POST', body: data });
      const uploadedFile = await res.json();
      if (!uploadedFile.secure_url) throw new Error('Upload failed');

      const response = await fetch(`https://travelwheelsph.onrender.com/api/quotations/${booking._id}/file`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: uploadedFile.secure_url }),
      });

      if (!response.ok) throw new Error('File update failed');
      showToast('File uploaded successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error uploading file. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="booking-details" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2 style={{ fontWeight: 'bold', color: buttonColor, marginBottom: '10px' }}>{detailsTitle}</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* First Column */}
        <div style={{ flex: '1', paddingRight: '10px' }}>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5', paddingBottom: '20px' }}>{isBooking ? 'Booking #' : 'Quotation #'}: {booking.num}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5', paddingBottom: '20px' }}>Service Type: {booking.type}</p>

          <p style={{ fontWeight: 'bold', lineHeight: '0.7' }}>GENERAL INFORMATION</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Name: {`${booking.firstname} ${booking.middlename} ${booking.lastname}`}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Email: {booking.email}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Contact Number: {booking.contactNumber}</p>

          <p style={{ fontWeight: 'bold', lineHeight: '0.5', paddingTop: '55px' }}>Status: {booking.status}</p>
        </div>

        {/* Second Column */}
        <div style={{ flex: '1', paddingLeft: '10px' }}>
          <p style={{ fontWeight: 'bold', lineHeight: '0.7', paddingTop: '40px' }}>TRAVEL INFORMATION</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Travel Date From: {formatDate(booking.startDate)}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Travel Date To: {formatDate(booking.endDate)}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Pickup Location: {booking.pickupLocation}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Dropoff Location: {booking.dropOffLocation}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Number of Persons: {booking.numOfPerson}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Remarks: {booking.remarks}</p>

          {/* Admin Note Section */}
          {isBooking && (
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Admin Note:</p>
              <textarea
                style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '4px', borderColor: '#ccc' }}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Add a note for the user here"
              />
              <MDBBtn
                style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff', marginTop: '10px' }}
                onClick={() => updateAdminNote(booking._id, adminNote)} // Updated line
              >
                Update Note
              </MDBBtn>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '35px' }}>
        {/* Buttons on the left */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {isBooking && (
            <>
              {/* Existing buttons for booking status changes */}
              <MDBBtn
                style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff' }}
                onClick={() => changeBookingStatus(booking._id, 'Payment Sent')}
              >
                Confirm Payment
              </MDBBtn>
              <MDBBtn
                style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff' }}
                onClick={() => changeBookingStatus(booking._id, 'Awaiting Payment')}
              >
                Confirm Booking
              </MDBBtn>
              <MDBBtn
                style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff' }}
                onClick={() => changeBookingStatus(booking._id, 'Payment Confirmed')}
              >
                AR Sent
              </MDBBtn>
              <MDBBtn
                style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff' }}
                onClick={() => changeBookingStatus(booking._id, 'Service Accomplished')}
              >
                Service Accomplished
              </MDBBtn>
              <MDBBtn
                style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff' }}
                onClick={() => changeBookingStatus(booking._id, 'Rejected')}
              >
                Reject
              </MDBBtn>
            </>
          )}

          {!isBooking && (
            <>
              {/* Existing button for quotation status changes */}
              <MDBBtn
                style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff', height: '50px', top: '7px' }}
                onClick={() => changeQuotationStatus(booking._id, 'Email Sent')}
              >
                Email Sent
              </MDBBtn>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center', 
                  border: '5px solid rgb(255, 165, 0)',
                  padding: '10px',
                  borderRadius: '15px',
                  maxWidth: '600px', 
                  margin: '0px 5px', 
                  backgroundColor: '#f9f9f9', 
                  marginLeft: '25px'
                }}
              >
                <p
                  style={{
                    fontWeight: 'bold', 
                    fontSize: '1.2rem', 
                    margin: '0 10px 0 0', 
                  }}
                >
                  ADMIN's NOTE
                </p>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*, .pdf"
                  onChange={handleFileUpload}
                  style={{
                    maxWidth: '300px',
                    marginLeft: '20px'
                  }}
                />
              </div>

            </>
          )}
        </div>

        {/* Back button on the right */}
        <MDBBtn
          style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff' }}
          onClick={onBack}
        >
          Back
        </MDBBtn>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default BookingDetails;
