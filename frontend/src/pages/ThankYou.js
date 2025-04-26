import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <MDBContainer className="py-5">
        <MDBCard className="text-center shadow">
          <MDBCardBody className="p-5">
            <MDBIcon 
              far 
              icon="check-circle" 
              size="4x" 
              className="mb-4"
              style={{ color: 'rgb(255, 165, 0)' }}
            />
            
            <MDBTypography tag="h2" className="mb-4" style={{ color: 'rgb(255, 165, 0)', fontWeight: 'bold' }}>
              Thank You for Your Request!
            </MDBTypography>

            <MDBTypography className="mb-4">
              Your quotation request has been successfully submitted. Our team will review your request and get back to you within 24-48 hours.
            </MDBTypography>

            <MDBTypography className="mb-4">
              Please check your email for updates regarding your quotation request.
            </MDBTypography>

            <MDBBtn
              onClick={() => navigate('/')}
              style={{
                backgroundColor: 'rgb(255, 165, 0)',
                border: 'none',
                borderRadius: '30px',
                padding: '12px 30px'
              }}
            >
              Back to Home
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default ThankYou;
