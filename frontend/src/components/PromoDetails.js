import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBBtn,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

function PromoDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { promo } = location.state || {};

  useEffect(() => {
    if (!promo) {
      navigate('/promos-guest');
    }
  }, [promo, navigate]);

  const defaultInclusions = [
    "Accommodation as per plan",
    "All inter transfer & sightseeing as per itinerary by suitable NON-AC vehicle",
    "Assistance on arrival",
    "Newspaper and bottled water on arrival",
    "Hotel accommodation",
    "Roundtrip airfare"
  ];

  const handleGetQuote = () => {
    navigate(`/get-quote/${promo?._id}`, {
      state: {
        promo,
        inclusions: promo?.inclusions || defaultInclusions
      }
    });
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <MDBContainer className="py-5">
        <MDBCard style={{ boxShadow: '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)' }}>
          <MDBCardBody className="p-5">
            <MDBRow>
              <MDBCol md="6">
                <img 
                  src={promo?.image} 
                  alt={promo?.name}
                  className="img-fluid rounded"
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBTypography tag="h2" className="mb-4" style={{ color: 'rgb(255, 165, 0)', fontWeight: 'bold' }}>
                  {promo?.name}
                </MDBTypography>
                
                <MDBTypography tag="h4" className="mb-3">
                  Price: <span style={{ color: 'rgb(255, 165, 0)' }}>{promo?.price || 'Price not available'}</span>
                </MDBTypography>

                <MDBTypography tag="h5" className="mb-4">
                  Duration: {promo?.duration}
                </MDBTypography>

                <MDBTypography tag="h4" className="mb-3" style={{ color: 'rgb(255, 165, 0)' }}>
                  INCLUSIONS:
                </MDBTypography>
                <ul className="mb-4" style={{ listStyleType: 'none', padding: 0 }}>
                  {(promo?.inclusions || defaultInclusions).map((inclusion, index) => (
                    <li key={index} style={{ 
                      padding: '8px 0',
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        color: 'rgb(255, 165, 0)',
                        marginRight: '10px',
                        fontSize: '18px'
                      }}>•</span>
                      {inclusion}
                    </li>
                  ))}
                </ul>

                <MDBTypography tag="h4" className="mb-3" style={{ color: 'rgb(255, 165, 0)' }}>
                  SPECIAL NOTES:
                </MDBTypography>
                <ul className="mb-4" style={{ listStyleType: 'none', padding: 0 }}>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    • Guest should carry original photo ID card along with 3 photocopies
                  </li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    • Passport size photographs: 4 copies each
                  </li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    • Visit is subject to special permit availability
                  </li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    • Some attractions may be closed on specific days
                  </li>
                </ul>

                <MDBTypography tag="p" className="mb-4">
                  {promo?.description}
                </MDBTypography>

                <div className="d-flex gap-3">
                  <MDBBtn
                    onClick={() => navigate(-1)}
                    style={{
                      backgroundColor: '#fff',
                      color: 'rgb(255, 165, 0)',
                      border: '2px solid rgb(255, 165, 0)',
                      borderRadius: '30px',
                      padding: '10px 30px'
                    }}
                  >
                    Back
                  </MDBBtn>
                  <MDBBtn
                    onClick={handleGetQuote}
                    style={{
                      backgroundColor: 'rgb(255, 165, 0)',
                      border: 'none',
                      padding: '10px 30px'
                    }}
                  >
                    Get Quote
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default PromoDetails;
