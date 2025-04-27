import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBBtn,
  MDBCardImage,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit';
import flightsbg from '../../images/flightsbg.jpg';
import logo from '../../images/header.jpg';
import Toast from '../../components/Toast';

function PromoQuoteForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [promo, setPromo] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isPopulateChecked, setIsPopulateChecked] = useState(false);
  const [toast, setToast] = useState(null);

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

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await fetch(`https://travelwheelsph.onrender.com//api/promos/get-promo-by-id/${id}`);
        const data = await response.json();
        setPromo(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchPromo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://travelwheelsph.onrender.com//api/quotations/create-quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          promoId: id,
          promoName: promo.name,
          promoPrice: promo.price,
          promoDuration: promo.duration,
          promoInclusions: promo.inclusions
        })
      });

      if (response.ok) {
        setToast({ message: 'Quote requested successfully!', type: 'success' });
        navigate('/thank-you');
      }
    } catch (error) {
      setToast({ message: 'Error submitting quote', type: 'error' });
    }
  };

  return (
    <>
      <div className="bg-white py-2">
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
          <MDBCardImage src={logo} style={{ width: '200px', cursor: 'pointer' }} alt="Header Logo" onClick={() => navigate('/')} />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/services-guest')}>Services</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos-guest')} style={{ color: 'rgb(255, 165, 0)', fontWeight: 'bold' }}>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry-guest')}>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBBtn onClick={() => navigate('/login')} style={{ fontWeight: 'bold', borderRadius: '30px', backgroundColor: 'rgb(255, 165, 0)', border: 'none' }}>
                Log In / Sign up
              </MDBBtn>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <MDBContainer className="py-5">
          <MDBCard>
            <MDBCardBody className="p-5">
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
                  <form onSubmit={handleSubmit}>
                    <h5>Kindly complete the details below:</h5>
                    <p className="text-danger">Fields with asterisks (*) are required</p>

                    <h6 className="mt-4 mb-3" style={{ fontWeight: 'bold' }}>General Information</h6>

                    <div className="mb-3">
                      <input
                        type="checkbox"
                        checked={isPopulateChecked}
                        onChange={(e) => setIsPopulateChecked(e.target.checked)}
                        style={{ marginRight: '10px' }}
                      />
                      <label>Click here to apply your account information.</label>
                    </div>

                    <MDBRow>
                      <MDBCol md="6" className="mb-3">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                      <MDBCol md="6" className="mb-3">
                        <label>First Name *</label>
                        <input
                          type="text"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol md="6" className="mb-3">
                        <label>Middle Name</label>
                        <input
                          type="text"
                          name="middlename"
                          value={formData.middlename}
                          onChange={handleChange}
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                      <MDBCol md="6" className="mb-3">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol md="6" className="mb-3">
                        <label>Contact Number *</label>
                        <input
                          type="text"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                    </MDBRow>

                    <h6 className="mt-4 mb-3" style={{ fontWeight: 'bold' }}>Travel Information</h6>

                    <MDBRow>
                      <MDBCol md="6" className="mb-3">
                        <label>Start Date *</label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                      <MDBCol md="6" className="mb-3">
                        <label>End Date *</label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol md="6" className="mb-3">
                        <label>Pickup Location *</label>
                        <input
                          type="text"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                      <MDBCol md="6" className="mb-3">
                        <label>Drop-off Location *</label>
                        <input
                          type="text"
                          name="dropOffLocation"
                          value={formData.dropOffLocation}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol md="6" className="mb-3">
                        <label>Number of Person *</label>
                        <input
                          type="number"
                          name="numOfPerson"
                          value={formData.numOfPerson}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                      <MDBCol md="6" className="mb-3">
                        <label>Promo</label>
                        <input
                          type="text"
                          value={`${promo?.duration} ${promo?.name}`}
                          readOnly
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                    </MDBRow>

                    <h6 className="mt-4 mb-3" style={{ fontWeight: 'bold' }}>Other remarks/requests:</h6>
                    <MDBRow>
                      <MDBCol md="12" className="mb-3">
                        <input
                          type="text"
                          name="remarks"
                          value={formData.remarks}
                          onChange={handleChange}
                          placeholder="Remarks"
                          className="form-control"
                          style={{ borderColor: 'rgb(255, 165, 0)', borderRadius: '15px' }}
                        />
                      </MDBCol>
                    </MDBRow>

                    <div className="mb-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        required
                        style={{ marginRight: '10px' }}
                      />
                      <label>
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
                      disabled={!isChecked}
                      style={{
                        backgroundColor: 'rgb(255, 165, 0)',
                        border: 'none',
                        width: '100%',
                        borderRadius: '30px'
                      }}
                    >
                      REQUEST QUOTATION
                    </MDBBtn>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

export default PromoQuoteForm;
