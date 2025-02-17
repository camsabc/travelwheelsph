import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
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
  const [selectedFile, setSelectedFile] = useState(null);

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


  const handleDownload = async () => {
    try {
      const response = await fetch(booking.payment);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = booking.payment.split('/').pop(); // Extracts filename from URL
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
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

// Handle file selection without uploading immediately
const handleFileChange = (event) => {
  const file = event.target.files[0];
  setSelectedFile(file);
};

// Handle file upload when button is clicked
const handleFileUpload = async () => {
  if (!selectedFile) {
    showToast('Please select a file first.', 'error');
    return;
  }

  setLoading(true);
  const data = new FormData();
  data.append('file', selectedFile);
  data.append('upload_preset', 'travelwheels_upload');
  data.append('cloud_name', 'dnazfwgby');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dnazfwgby/upload', { method: 'POST', body: data });
    const uploadedFile = await res.json();
    if (!uploadedFile.secure_url) throw new Error('Upload failed');

    showToast('File uploaded successfully!', 'success');

    // You can store the uploaded file URL somewhere or enable further actions
    console.log('Uploaded File URL:', uploadedFile.secure_url);
    
    setSelectedFile(null); // Reset file selection after upload

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

      {!isBooking && (
                <>
                  <MDBTypography tag="h5" style={{ paddingTop: '30px', color: buttonColor, fontWeight: 'bold', textAlign: 'start', paddingBottom: '10px' }}>
                    PROOF OF PAYMENT
                  </MDBTypography>
                  
                  <div style={{ textAlign: 'start' }}>
                    <embed
                      src={booking.payment}
                      type="application/pdf"
                      width="100%"
                      height="500px"
                      style={{ border: '1px solid #ddd', borderRadius: '5px' }}
                    />
                  </div>

                  <div className="text-center mt-2" style={{ display: 'flex', justifyContent: 'flex-start' }} >
                  <MDBBtn color="success" onClick={handleDownload}>
                    <i className="fas fa-download"></i> Download File
                  </MDBBtn>
                  </div>
                </>
              )}

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




{!isBooking && booking.status !== "PAYMENT SENT" && (
  <div style={{ display: 'flex', alignItems: 'center', margin: '20px 5px', maxWidth: '600px' }}>
    <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '15px', marginTop: '12px' }}>
      Upload Quote Here:
    </p>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '3px solid rgb(255, 165, 0)',
        padding: '5px 10px',
        borderRadius: '15px',
        backgroundColor: '#f9f9f9',
        flex: 1
      }}
    >
      <input
        type="file"
        className="form-control"
        accept="image/*, .pdf"
        onChange={handleFileChange}
        style={{ maxWidth: '300px' }}
      />
    </div>
          {/* Upload Button */}
          {!isBooking && selectedFile && (
          <MDBBtn
            style={{
              backgroundColor: buttonColor,
              borderColor: buttonColor,
              color: '#fff',
              height: '50px',
              marginLeft: '20px',
              borderRadius: '12px'
            }}
            onClick={handleFileUpload}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </MDBBtn>
      )}
  </div>
)}



{!isBooking && booking.status === "PAYMENT SENT" && (
  <div style={{ display: 'flex', alignItems: 'center', margin: '20px 5px', maxWidth: '600px' }}>
    <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '15px', marginTop: '12px' }}>
      Upload AR Here:
    </p>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '3px solid rgb(255, 165, 0)',
        padding: '5px 10px',
        borderRadius: '15px',
        backgroundColor: '#f9f9f9',
        flex: 1
      }}
    >
      <input
        type="file"
        className="form-control"
        accept="image/*, .pdf"
        onChange={handleFileChange}
        style={{ maxWidth: '300px' }}
      />
    </div>

          {/* Upload Button */}
          {!isBooking && selectedFile && (
          <MDBBtn
            style={{
              backgroundColor: buttonColor,
              borderColor: buttonColor,
              color: '#fff',
              height: '50px',
              marginLeft: '20px',
              borderRadius: '12px'
            }}
            onClick={handleFileUpload}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </MDBBtn>
      )}
  </div>
)}



      





        </div>

        {/* Back button on the right */}
        <MDBBtn
          style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff', width: '90px', height: '50px', borderRadius: '15px', marginTop: '25px' }}
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
