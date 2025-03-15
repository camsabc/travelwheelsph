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
  MDBBtn
} from 'mdb-react-ui-kit';
import logo from '../images/header.jpg';
import Chatbot from "../components/Chatbot";

function DetailsQuotation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, email, index } = location.state || {}; 
  const [quotationDetails, setQuotationDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [quotations, setQuotations] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    try {
      const response = await fetch(quotationDetails.file);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = quotationDetails.file.split('/').pop(); // Extracts filename from URL
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleButtonClick = async (quotationId, disabled, type) => {
    try {
      const response = await fetch('http://localhost:3000/api/quotations/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quotationId, disabled }),
      });

      if (!response.ok) {
        throw new Error('Failed to change status');
      }

      if (type == 'book') {navigate('/payment', { state: { id: quotationDetails._id, email: user.email } })}
      else {navigate('/quotation', { state: { email: user.email } })}

    } catch (error) {
      console.log('error');
    }
  };
  

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setLoading(false);
          } else {
            setUser(data);

            return fetch(`http://localhost:3000/api/quotations/get-all-quotations-by-email/${email}`);
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setQuotations(data);
            if (id) {
              return fetch(`http://localhost:3000/api/quotations/get-quotation-by-id/${id}`);
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
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#fcfcfc', fontFamily: "'Poppins', sans-serif" }}>
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
      <MDBContainer className="flex-grow-1 py-5">
        {/* Title and Line */}
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: 'bolder', paddingBottom: '10px', color: 'rgb(61, 132, 185)' }}>QUOTATION DETAILS</h2>
          <hr style={{ width: '100%', margin: '0 auto', borderTop: '5px solid rgb(255, 165, 0)', paddingBottom: '10px', opacity: 1 }} />
        </div>

        {/* Quotation Details Card */}
        {quotationDetails && (
          <MDBCard className="w-100" style={{ overflowX: 'auto', backgroundColor: 'rgb(241, 241, 240)' }}>
            <MDBCardBody>
              <MDBTypography tag="h2" className="text-center mb-4" style={{ fontWeight: 'bold', color: 'black' }}>
                QUOTATION #{index + 1}
              </MDBTypography>

              <MDBTypography tag="h5" style={{ fontWeight: 'bold', textAlign: 'start' }}>
                PERSONAL INFORMATION
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                {renderAttribute('LAST NAME', quotationDetails.lastname)}
                {renderAttribute('FIRST NAME', quotationDetails.firstname)}
                {renderAttribute('MIDDLE NAME', quotationDetails.middlename)}
                {renderAttribute('EMAIL', quotationDetails.email)}
                {renderAttribute('CONTACT NUMBER', quotationDetails.contactNumber)}
              </MDBTypography>

              <MDBTypography tag="h5" style={{ paddingTop: '20px', fontWeight: 'bold', textAlign: 'start' }}>
                TRAVEL INFORMATION
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                {renderAttribute('BOOKING START DATE', quotationDetails.startDate && new Date(quotationDetails.startDate).toLocaleDateString())}
                {renderAttribute('BOOKING END DATE', quotationDetails.endDate && new Date(quotationDetails.endDate).toLocaleDateString())}
                {renderAttribute('TIME OF PICKUP', quotationDetails.startDate && new Date(quotationDetails.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }))}
                {renderAttribute('PICKUP LOCATION', quotationDetails.pickupLocation)}
                {renderAttribute('DROP-OFF LOCATION', quotationDetails.dropOffLocation)}
                {renderAttribute('PICKUP TIME', quotationDetails.pickupTIme)}
                {renderAttribute('DROP-OFF TIME', quotationDetails.dropoffTime)}
                {renderAttribute('PICKUP DATE', quotationDetails.pickupDate)}
                {renderAttribute('DROP-OFF DATE', quotationDetails.dropoffDate)}
                {renderAttribute('VEHICLE NAME', quotationDetails.vehicleName)}
                {renderAttribute('NUMBER OF PERSONS', quotationDetails.numOfPerson)}
                {renderAttribute('REMARKS', quotationDetails.remarks)}
                {renderAttribute('STATUS', quotationDetails.status)}
              </MDBTypography>

              {/* New Additional Attributes */}
              <MDBTypography tag="h5" style={{ paddingTop: '20px', fontWeight: 'bold', textAlign: 'start' }}>
                ADDITIONAL INFORMATION
              </MDBTypography>

              <MDBTypography tag="p" style={{ textAlign: 'start' }}>
                {renderAttribute('AIRPORT DEPARTURE', quotationDetails.airportDeparture)}
                {renderAttribute('AIRPORT ARRIVAL', quotationDetails.airportArrival)}
                {renderAttribute('PREFERRED HOTEL', quotationDetails.preferredHotel)}
                {renderAttribute('BUDGET RANGE', quotationDetails.budgetRange)}
                {renderAttribute('GENDER', quotationDetails.gender)}
                {renderAttribute('CIVIL STATUS', quotationDetails.civilStatus)}
                {renderAttribute('BIRTH DATE', quotationDetails.birthDate && new Date(quotationDetails.birthDate).toLocaleDateString())}
                {renderAttribute('COUNTRY OF BIRTH', quotationDetails.countryBirth)}
                {renderAttribute('PROVINCE OF BIRTH', quotationDetails.provinceBirth)}
                {renderAttribute('MUNICIPALITY OF BIRTH', quotationDetails.municipalityBirth)}
                {renderAttribute('FATHER\'S FIRST NAME', quotationDetails.firstnameFather)}
                {renderAttribute('FATHER\'S MIDDLE NAME', quotationDetails.middlenameFather)}
                {renderAttribute('FATHER\'S LAST NAME', quotationDetails.lastnameFather)}
                {renderAttribute('FATHER\'S COUNTRY OF CITIZENSHIP', quotationDetails.countryCitizenshipFather)}
                {renderAttribute('MOTHER\'S FIRST NAME', quotationDetails.firstnameMother)}
                {renderAttribute('MOTHER\'S MIDDLE NAME', quotationDetails.middlenameMother)}
                {renderAttribute('MOTHER\'S LAST NAME', quotationDetails.lastnameMother)}
                {renderAttribute('MOTHER\'S COUNTRY OF CITIZENSHIP', quotationDetails.countryCitizenshipMother)}
                {renderAttribute('SPOUSE\'S FIRST NAME', quotationDetails.firstnameSpouse)}
                {renderAttribute('SPOUSE\'S MIDDLE NAME', quotationDetails.middlenameSpouse)}
                {renderAttribute('SPOUSE\'S LAST NAME', quotationDetails.lastnameSpouse)}
                {renderAttribute('APPLICATION TYPE', quotationDetails.applicationType)}
                {renderAttribute('OLD PASSPORT NUMBER', quotationDetails.oldPassportNumber)}
                {renderAttribute('DATE ISSUED', quotationDetails.dateIssued && new Date(quotationDetails.dateIssued).toLocaleDateString())}
                {renderAttribute('ISSUING AUTHORITY', quotationDetails.issuingAuthority)}
                {renderAttribute('FOREIGN PASSPORT HOLDER', quotationDetails.foreignPassportHolder !== undefined ? (quotationDetails.foreignPassportHolder ? 'Yes' : 'No') : '')}
                {renderAttribute('EMERGENCY CONTACT PERSON', quotationDetails.emergencyContactPerson)}
                {renderAttribute('CONTACT NUMBER (FOREIGN)', quotationDetails.contactNumberForeign)}
                {renderAttribute('PROVINCE', quotationDetails.province)}
                {renderAttribute('CITY', quotationDetails.city)}
                {renderAttribute('OCCUPATION', quotationDetails.occupation)}
                {renderAttribute('OFFICE NUMBER', quotationDetails.officeNumber)}
                {renderAttribute('OFFICE DETAILS', quotationDetails.officeDetails)}
                {renderAttribute('FULL ADDRESS', quotationDetails.fullAddress)}
                {renderAttribute('LANDMARK', quotationDetails.landmark)}
              </MDBTypography>




              {quotationDetails.file && (
                <>
                  <MDBTypography tag="h5" style={{ paddingTop: '20px', fontWeight: 'bold', textAlign: 'start', paddingBottom: '10px' }}>
                    ATTACHED FILE
                  </MDBTypography>
                  
                  <div style={{ textAlign: 'start' }}>
                    <embed
                      src={quotationDetails.file}
                      type="application/pdf"
                      width="100%"
                      height="500px"
                      style={{ border: '1px solid #ddd', borderRadius: '5px' }}
                    />
                  </div>

                  <div className="text-center mt-3" style={{ display: 'flex', justifyContent: 'flex-start' }} >
                  <MDBBtn color="success" onClick={handleDownload}>
                    <i className="fas fa-download"></i> Download File
                  </MDBBtn>
                  </div>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        )}

{quotationDetails.file && (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', paddingTop: '20px' }}>
        <button
            type="button"
            className="btn btn-secondary"
            style={{
                fontWeight: 'bold',
                width: '200px',
                fontSize: '14px',
                borderRadius: '30px',
                backgroundColor: 'red',
                border: 'none',
                padding: '10px 10px',
            }}
            onClick={() => handleButtonClick(quotationDetails._id, 'true', 'reject')}
            disabled={quotationDetails.disabled === 'true'}
        >
            Reject Quote
        </button>

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
                padding: '10px 50px',
            }}
            onClick={() => handleButtonClick(quotationDetails._id, 'true', 'book')}
            disabled={quotationDetails.disabled === 'true'}
        >
            Book Now
        </button>
    </div>
)}


      </MDBContainer>
      <Chatbot user={user}/>
    </div>
  );
}

export default DetailsQuotation;
