import React from 'react';
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

function PromoDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { promo } = location.state || {};

  const handleGetQuote = () => {
    navigate(`/get-quote/${promo?._id}`, { 
      state: { 
        promo,
        inclusions: promo.inclusions 
      } 
    });
  };

  return (
    <MDBContainer className="py-5">
      <MDBCard>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="6">
              <img 
                src={promo?.image} 
                alt="Promo"
                className="img-fluid rounded"
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBTypography tag="h2" className="mb-4" style={{ color: 'rgb(255, 165, 0)', fontWeight: 'bold' }}>
                {promo?.name}
              </MDBTypography>
              
              <MDBTypography tag="h4" className="mb-3">
                Price: <span style={{ color: 'rgb(255, 165, 0)' }}>{promo?.price}</span>
              </MDBTypography>

              <MDBTypography tag="h5" className="mb-4">
                Duration: {promo?.duration}
              </MDBTypography>

              <MDBTypography tag="h4" className="mb-3" style={{ color: 'rgb(255, 165, 0)' }}>
                INCLUSIONS:
              </MDBTypography>
              <ul className="mb-4" style={{ listStyleType: 'none', padding: 0 }}>
                {promo?.inclusions?.map((inclusion, index) => (
                  <li key={index} style={{ 
                    padding: '8px 0',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: 'rgb(255, 165, 0)', marginRight: '10px' }}>•</span>
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

              <MDBRow className="mt-4">
                <MDBCol>
                  <div className="d-flex gap-3">
                    <MDBBtn
                      onClick={() => navigate(-1)}
                      style={{
                        backgroundColor: '#fff',
                        color: 'rgb(255, 165, 0)',
                        border: '2px solid rgb(255, 165, 0)',
                        marginRight: '10px'
                      }}
                    >
                      Back
                    </MDBBtn>
                    <MDBBtn
                      onClick={handleGetQuote}
                      style={{
                        backgroundColor: 'rgb(255, 165, 0)',
                        border: 'none'
                      }}
                    >
                      Get Quote
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default PromoDetails;
