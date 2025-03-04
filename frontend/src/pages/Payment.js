import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBTypography,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import logo from '../images/header.jpg';
import Toast from '../components/Toast';

import gcash from '../images/gcash.png';
import paypal from '../images/paypal.png';
import maya from '../images/maya.png';
import qr from '../images/qr.png';
import Chatbot from "../components/Chatbot";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, email, index } = location.state || {}; 
  const [quotationDetails, setQuotationDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [quotations, setQuotations] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handlePaymentUpload = async (event) => {
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

      const response = await fetch(`https://travelwheelsph.onrender.com/api/quotations/${quotationDetails._id}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment: uploadedFile.secure_url }),
      });

      if (!response.ok) throw new Error('File update failed');
      showToast('Proof of Payment Uploaded!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error uploading file. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };


  
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
      navigate('/payment-submit', { state: { id: quotationId, email: user.email } })

    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  

  useEffect(() => {
    if (email) {
      fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setLoading(false);
          } else {
            setUser(data);

            return fetch(`https://travelwheelsph.onrender.com/api/quotations/get-all-quotations-by-email/${email}`);
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setQuotations(data);
            if (id) {
              return fetch(`https://travelwheelsph.onrender.com/api/quotations/get-quotation-by-id/${id}`);
            }
          }
          setLoading(false);
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            console.log(data)
            setQuotationDetails(data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          setError('Failed to fetch data.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, email]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

    // Helper function to render attribute with conditional line break
    const renderAttribute = (label, value) => (
      value ? (
        <>
          {label}: {value}
          <br />
        </>
      ) : null
    );

  return (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#ffffff', fontFamily: "'Poppins', sans-serif" }}>
      {/* Header Section */}
      <div className="bg-white py-2 mb-1" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
        <MDBCardImage
    src={logo}
    style={{ width: '200px', cursor: 'pointer' }}
    alt="Header Logo"
    onClick={() => navigate('/home-user', { state: { email: user.email }})} 
  />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => navigate('/services', { state: { email: user.email }})}>Services</span>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink>Promos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px' }}>
                <MDBNavbarLink>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => navigate('/profile', { state: { email: user.email } })}
                style={{
                  margin: '0 15px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, {user?.firstname}
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      {/* Main Content Section */}
      <MDBContainer className="flex-grow-1 py-5 ">
        {/* Title and Line */}
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: 'bolder', fontSize: '35px', paddingBottom: '10px', color: 'rgb(255, 165, 0)' }}>PAYMENT</h2>
          <hr style={{ width: '50%', margin: '0 auto', borderTop: '5px solid rgb(255, 165, 0)', paddingBottom: '10px', opacity: 1 }} />
        </div>

        <MDBContainer 
            className="d-flex justify-content-center align-items-center " style={{width: '90%'}} 
        >
            <MDBCardBody style={{ justifyContent: 'center'}}>
                <div className="d-flex align-items-center justify-content-between my-4">
                    {/* Left Image */}
                    <img 
                        src={paypal}
                        alt="Left Image" 
                        style={{ width: '200px', height: '50px', borderRadius: '10px' }}
                    />

                    {/* Center Text */}
                    <h3 style={{ textAlign: 'center', fontSize: '20px', color: 'black', flex: 1 }}>
                        PayPal Account Number: 09123456789 <strong style={{ paddingLeft: '70px', color: 'rgb(255, 165, 0)' }}> or </strong>
                    </h3>

                    {/* Right Image */}
                    <img 
                        src={qr}
                        alt="Right Image" 
                        style={{ width: '120px', height: '120px', borderRadius: '10px' }}
                    />
                </div>


                <div className="d-flex align-items-center justify-content-between my-4">
                    {/* Left Image */}
                    <img 
                        src={gcash}
                        alt="Left Image" 
                        style={{ width: '200px', height: '50px', borderRadius: '10px' }}
                    />

                    {/* Center Text */}
                    <h3 style={{ textAlign: 'center', fontSize: '20px', color: 'black', flex: 1 }}>
                        Gcash Account Number: 09123456789 <strong style={{ paddingLeft: '70px', color: 'rgb(255, 165, 0)' }}> or </strong>
                    </h3>

                    {/* Right Image */}
                    <img 
                        src={qr}
                        alt="Right Image" 
                        style={{ width: '120px', height: '120px', borderRadius: '10px' }}
                    />
                </div>


                <div className="d-flex align-items-center justify-content-between my-4">
                    {/* Left Image */}
                    <img 
                        src={maya}
                        alt="Left Image" 
                        style={{ width: '200px', height: '60px', borderRadius: '10px' }}
                    />

                    {/* Center Text */}
                    <h3 style={{ textAlign: 'center', fontSize: '20px', color: 'black', flex: 1 }}>
                        Maya Account Number: 09123456789 <strong style={{ paddingLeft: '70px', color: 'rgb(255, 165, 0)' }}> or </strong>
                    </h3>

                    {/* Right Image */}
                    <img 
                        src={qr}
                        alt="Right Image" 
                        style={{ width: '120px', height: '120px', borderRadius: '10px' }}
                    />
                </div>

                <MDBTypography tag="h5" style={{ fontWeight: 'bold', textAlign: 'start', paddingTop: '50px' }}>
                    Please upload your proof of payment here:
                </MDBTypography>

                <div
                style={{
                  display: 'flex',
                  alignItems: 'center', 
                  border: '2px solid rgb(255, 165, 0)',
                  padding: '10px',
                  borderRadius: '15px',
                  maxWidth: '645px', 
                  margin: '0px 5px', 
                  backgroundColor: '#f9f9f9'
                }}
              >
                <input
                  type="file"
                  className="form-control"
                  accept="image/*, .pdf"
                  onChange={handlePaymentUpload}
                  style={{
                    maxWidth: '350px',
                    marginLeft: '20px'
                  }}
                />
              </div>



                <MDBTypography tag="h5" style={{ fontWeight: 'bold', textAlign: 'start', paddingTop: '50px' }}>
                    Note/s:
                </MDBTypography>

                <MDBRow>
                    <MDBCol md="8">
                        <input
                        id="remarks"
                        name="remarks"
                        type="text"
                        style={{
                            border: '2px solid rgb(250, 207, 32)',
                            borderRadius: '15px', 
                            boxShadow: 'none',
                            padding: '15px', 
                            backgroundColor: 'transparent', 
                            width: '100%', 
                            marginBottom: '10px'
                        }}
                        />
                    </MDBCol>
                </MDBRow>



                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', paddingTop: '20px' }}>
            <button
                type="button"
                className="btn btn-primary"
                style={{
                    fontWeight: 'bold',
                    width: '200px',
                    fontSize: '14px',
                    borderRadius: '30px',
                    backgroundColor: 'rgb(255, 165, 0)',
                    border: 'none',
                    padding: '10px 20px',
                }}
                onClick={() => {changeQuotationStatus(quotationDetails._id, "PAYMENT SENT")}}
            >
                Submit
            </button>
        </div>

            </MDBCardBody>
        </MDBContainer>

  

      </MDBContainer>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Chatbot user={user}/>
    </div>
  );
}

export default Payment;
