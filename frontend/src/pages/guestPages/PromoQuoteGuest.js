import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBBtn
} from 'mdb-react-ui-kit';

function PromoQuoteGuest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { promo } = location.state || {};
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    contactNumber: '',
    startDate: '',
    endDate: '',
    pickupLocation: '',
    dropOffLocation: '',
    numOfPerson: '',
    remarks: '',
    status: 'Pending',
    type: 'Promos'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert('Please agree to the Terms and Conditions');
      return;
    }

    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/quotations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          promoName: promo.name,
          promoPrice: promo.price,
          promoDuration: promo.duration,
          promoInclusions: promo.inclusions
        })
      });

      if (response.ok) {
        navigate('/thank-you');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  return (
    <MDBContainer className="py-5">
      <MDBCard>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="6">
              <img src={promo?.image} alt="Promo" className="img-fluid rounded" />
              <div className="mt-4">
                <h4>PROMO INCLUSIONS:</h4>
                <ul>
                  {promo?.inclusions?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </MDBCol>

            <MDBCol md="6">
              <MDBTypography className="text-center mb-4" style={{ color: 'rgb(255, 165, 0)' }}>
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/login')}>
                  Sign in
                </span>{' '}
                or{' '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/signup')}>
                  Sign up
                </span>{' '}
                here to request a quotation!
              </MDBTypography>

              <form onSubmit={handleSubmit}>
                <h5 className="mb-3">General Information</h5>
                <p className="text-danger">Fields with asterisks (*) are required</p>

                <MDBRow>
                  <MDBCol md="6" className="mb-3">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={formData.lastname}
                      onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                      style={{ borderColor: 'rgb(255, 165, 0)' }}
                    />
                  </MDBCol>
                  <MDBCol md="6" className="mb-3">
                    <label>First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={formData.firstname}
                      onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                      style={{ borderColor: 'rgb(255, 165, 0)' }}
                    />
                  </MDBCol>
                </MDBRow>

                {/* Add remaining form fields */}
                {/* ... */}

                <div className="mb-3">
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="me-2"
                  />
                  <label htmlFor="termsCheckbox">
                    By clicking this, you agree to our{' '}
                    <span
                      style={{ color: 'rgb(255, 165, 0)', cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => navigate('/terms')}
                    >
                      Terms and Conditions
                    </span>
                  </label>
                </div>

                <MDBBtn
                  type="submit"
                  style={{
                    backgroundColor: 'rgb(255, 165, 0)',
                    border: 'none',
                    width: '100%'
                  }}
                  disabled={!isChecked}
                >
                  REQUEST QUOTATION
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default PromoQuoteGuest;
