import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

function InquiryDetails({ inquiry, onBack }) {
  const [toast, setToast] = useState(null);
  const buttonColor = 'rgb(255, 165, 0)'; 
  const [adminNote, setAdminNote] = useState(inquiry.note || ''); 

  const navigate = useNavigate();

  const changeInquiryStatus = async (inquiryId, status) => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/inquiries/change-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inquiryId, status }),
      });
      if (!response.ok) {
        throw new Error('Failed to change status');
      }
      showToast('Status changed successfully!', 'success');
      navigate(`/admin`, { state: { name: "Admin", role: "admin"  } });
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  const updateAdminNote = async (inquiryId, note) => {

    changeInquiryStatus(inquiryId, 'Replied')

    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/inquiries/update-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inquiryId, note }),
      });
      if (!response.ok) {
        throw new Error('Failed to change status');
      }
      showToast('Status changed successfully!', 'success');
      navigate(`/admin`, { state: { name: "Admin", role: "admin" } });
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  return (
    <div className="inquiry-details" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2 style={{ fontWeight: 'bold', color: 'rgb(255, 165, 0)', marginBottom: '10px' }}>INQUIRY DETAILS</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* First Column */}
        <div style={{ flex: '1', paddingRight: '10px' }}>
          <p style={{ fontWeight: 'bold', lineHeight: '0.7', paddingTop: '40px' }}>INQUIRY INFORMATION</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Email: {inquiry.email}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Inquiry Date: {inquiry.date}</p>
          <p style={{ fontWeight: 'bold', lineHeight: '1.2' }}>Message: <br/> {inquiry.message}</p>
        </div>

        {/* Second Column */}
        <div style={{ flex: '1', paddingLeft: '10px' }}>
            <div style={{ marginTop: '40px' }}>
                <p style={{ fontWeight: 'bold', lineHeight: '0.5' }}>Admin Note:</p>
                <textarea
                    style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '4px', borderColor: '#ccc' }}
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Add a note for the user here"
                />
                <MDBBtn
                    style={{ backgroundColor: buttonColor, borderColor: buttonColor, color: '#fff', marginTop: '10px' }}
                    onClick={() => updateAdminNote(inquiry._id, adminNote)} // Updated line
                >
                Update Note
                </MDBBtn>
            </div>
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

export default InquiryDetails;
