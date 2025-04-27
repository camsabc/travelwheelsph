import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTypography
} from 'mdb-react-ui-kit';

function PromoQuote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { promo, inclusions } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    numberOfPeople: '',
    specialRequests: '',
    pickupLocation: '',
    dropOffLocation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://travelwheelsph.onrender.com//api/quotations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          promoId: promo._id,
          promoName: promo.name,
          promoPrice: promo.price,
          promoDuration: promo.duration,
          promoInclusions: inclusions,
          status: 'pending'
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
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <MDBContainer className="py-5">
        <MDBCard>
          <MDBCardBody className="p-5">
            <MDBTypography tag="h2" className="text-center mb-4" style={{ color: 'rgb(255, 165, 0)' }}>
              Request Quote for {promo?.name}
            </MDBTypography>

            <MDBRow className="mb-4">
              <MDBCol>
                <div className="border p-3 rounded">
                  <h5>Package Details:</h5>
                  <p>Price: {promo?.price}</p>
                  <p>Duration: {promo?.duration}</p>
                  <h6>Inclusions:</h6>
                  <ul>
                    {inclusions?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </MDBCol>
            </MDBRow>

            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol md="6" className="mb-4">
                  <MDBInput
                    label="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-4">
                  <MDBInput
                    label="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6" className="mb-4">
                  <MDBInput
                    type="email"
                    label="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-4">
                  <MDBInput
                    label="Phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6" className="mb-4">
                  <MDBInput
                    type="date"
                    label="Start Date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-4">
                  <MDBInput
                    type="date"
                    label="End Date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput
                    type="number"
                    label="Number of People"
                    required
                    value={formData.numberOfPeople}
                    onChange={(e) => setFormData({...formData, numberOfPeople: e.target.value})}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput
                    type="textarea"
                    label="Special Requests"
                    rows={4}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-4">
                <MDBCol md="6" className="mb-4">
                  <MDBInput
                    label="Pickup Location"
                    required
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-4">
                  <MDBInput
                    label="Drop Off Location"
                    required
                    value={formData.dropOffLocation}
                    onChange={(e) => setFormData({...formData, dropOffLocation: e.target.value})}
                  />
                </MDBCol>
              </MDBRow>

              <div className="d-flex justify-content-end gap-2">
                <MDBBtn 
                  color="light"
                  onClick={() => navigate(-1)}
                >
                  Back
                </MDBBtn>
                <MDBBtn 
                  type="submit"
                  style={{ backgroundColor: 'rgb(255, 165, 0)', border: 'none' }}
                >
                  Submit Quote Request
                </MDBBtn>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default PromoQuote;
