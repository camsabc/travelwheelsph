import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBFooter,
} from 'mdb-react-ui-kit';


import visabg from '../../images/visabg.jpg';
import logo from '../../images/header.jpg';
import ChatbotGuest from './ChatbotGuest';

function DetailsVisaGuest() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(visabg);

  const [visibleButtons, setVisibleButtons] = useState('');

  const [user, setUser] = useState(null);
  const location = useLocation();
  const { email, country } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const toggleButtons = (type) => {
    setVisibleButtons((prevType) => (prevType === type ? '' : type));
  };


  return (
    <>


      {/* Header Section */}
      <div className="bg-white py-2" style={{ flexShrink: 0 }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
        <MDBCardImage
          src={logo}
          style={{ width: '200px', cursor: 'pointer' }}  // Added cursor style to indicate it's clickable
          alt="Header Logo"
          onClick={() => navigate('/login')} // Added onClick handler
        />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">

              <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
                <MDBNavbarLink 
                    onClick={() => navigate('/services-guest')}
                    style={{ color: 'rgb(255, 165, 0)' }}  
                >
                    Services
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/promos-guest')}>Promos</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry-guest')}>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  fontWeight: 'bold',
                  width: '100%',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: 'rgb(255, 165, 0)',
                  padding: '5x 20px',
                  fontSize: '14px'
                }}
                onClick={() => navigate('/login')}
              >
                Log In / Sign up
              </button>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>


    <div className="d-flex flex-column min-vh-100" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#eee',
      }}>
      {/* Main Content Section */}
      <MDBTypography 
        tag="h1" 
        className="text-center mt-5" 
        style={{
          fontWeight: 'bolder', 
          color: 'white', 
          fontSize: '60px',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
          textTransform: 'uppercase'
        }}
      >
        {country} VISA
      </MDBTypography>

      <MDBContainer className="flex-grow-1 d-flex align-items-center justify-content-center">
        <MDBCard style={{ maxWidth: '900px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
          <MDBCardBody>
            <MDBTypography tag="h5" className="text-center mb-2">Upload the following requirements below:</MDBTypography>
            <ul style={{ paddingLeft: "0", paddingBottom: "20px", listStylePosition: 'inside', textAlign: 'center', fontSize: '20px' }}> {/* Center the list */}
              <li> All documents must be original unless stated otherwise. </li>
              <li> Size of document for application should be A4 size only. </li>
            </ul>

            {/* Button Set 1 */}
            <MDBRow className='mb-3'>
              <MDBCol md="6" className="d-flex align-items-center justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px',
                    fontWeight: visibleButtons === 'general' ? 'bold' : 'normal'
                  }}
                  onClick={() => toggleButtons('general')}
                >
                  General Requirements
                </button>
              </MDBCol>
              <MDBCol md="6" className="d-flex align-items-center justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px',
                    fontWeight: visibleButtons === 'employed' ? 'bold' : 'normal'
                  }}
                  onClick={() => toggleButtons('employed')}
                >
                  Employed
                </button>
              </MDBCol>
            </MDBRow>

            {/* Button Set 2 */}
            <MDBRow className='mb-3'>
              <MDBCol md="6" className="d-flex align-items-center justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px',
                    fontWeight: visibleButtons === 'businessOwner' ? 'bold' : 'normal' 
                  }}
                  onClick={() => toggleButtons('businessOwner')}
                >
                  Business Owner
                </button>
              </MDBCol>
              <MDBCol md="6" className="d-flex align-items-center justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    borderRadius: '30px', 
                    backgroundColor: 'rgb(255, 165, 0)', 
                    border: 'none', 
                    padding: '10px 20px',
                    fontWeight: visibleButtons === 'student' ? 'bold' : 'normal'
                  }}
                  onClick={() => toggleButtons('student')}
                >
                  Student
                </button>
              </MDBCol>
            </MDBRow>

            {/* Conditional Rendering for Buttons Below General Requirements */}
            {visibleButtons === 'general' && (
                <div>
                    <MDBRow className='mb-3'>
                        <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                        <button 
                            type="button" 
                            style={{ 
                                textAlign: 'start',
                            width: '100%', 
                            borderRadius: '15px', 
                            backgroundColor: 'white', 
                            border: '2px solid rgb(255, 165, 0)', 
                            padding: '5px 10px',
                            }}
                        >
                            Complete Visa Form
                        </button>
                        </MDBCol>

                        <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                        <button 
                            type="button" 
                            style={{ 
                                textAlign: 'start',
                            width: '100%', 
                            borderRadius: '15px', 
                            backgroundColor: 'white', 
                            border: '2px solid rgb(255, 165, 0)', 
                            padding: '5px 10px',
                            }}
                        >
                            2x2 ID Picture White Background
                        </button>
                        </MDBCol>          
                    </MDBRow>

                    <MDBRow className='mb-3'>
                        <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                        <button 
                            type="button" 
                            style={{ 
                                textAlign: 'start',
                            width: '100%', 
                            borderRadius: '15px', 
                            backgroundColor: 'white', 
                            border: '2px solid rgb(255, 165, 0)', 
                            padding: '5px 10px',
                            }}
                        >
                            Original Passport
                        </button>
                        </MDBCol>

                        <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                        <button 
                            type="button" 
                            style={{ 
                                textAlign: 'start',
                            width: '100%', 
                            borderRadius: '15px', 
                            backgroundColor: 'white', 
                            border: '2px solid rgb(255, 165, 0)', 
                            padding: '5px 10px',
                            }}
                        >
                            PSA Birth Certificate
                        </button>
                        </MDBCol>          
                    </MDBRow>

                    <MDBRow className='mb-3'>
                        <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                        <button 
                            type="button" 
                            style={{ 
                                textAlign: 'start',
                            width: '100%', 
                            borderRadius: '15px', 
                            backgroundColor: 'white', 
                            border: '2px solid rgb(255, 165, 0)', 
                            padding: '5px 10px',
                            }}
                        >
                            Proof Of Funds
                        </button>
                        </MDBCol>

                        <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                        <button 
                            type="button" 
                            style={{ 
                                textAlign: 'start',
                            width: '100%', 
                            borderRadius: '15px', 
                            backgroundColor: 'white', 
                            border: '2px solid rgb(255, 165, 0)', 
                            padding: '5px 10px',
                            }}
                        >
                            Latest ITR
                        </button>
                        </MDBCol>          
                    </MDBRow>
                </div>
            )}

            {/* Conditional Rendering for Buttons Below Business Owner */}
            {visibleButtons === 'businessOwner' && (
                <div>
                    <h5 style={{ padding: '10px 5px'}}> Submit along with General Requirements </h5>
                <MDBRow className='mb-3'>
                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <label 
    style={{ 
        display: 'inline-block',
        width: '100%', 
        textAlign: 'start',
        borderRadius: '15px', 
        backgroundColor: 'white', 
        border: '2px solid rgb(255, 165, 0)', 
        padding: '5px 10px',
        cursor: 'pointer',
    }}
>
    Business Registration
    <input 
        type="file" 
        style={{ 
            display: 'none' 
        }} 
        onChange={(event) => { 
            // Handle the file upload
            console.log(event.target.files[0]); 
        }}
    />
</label>

                    </MDBCol>

                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <label 
    style={{ 
        display: 'inline-block',
        width: '100%', 
        textAlign: 'start',
        borderRadius: '15px', 
        backgroundColor: 'white', 
        border: '2px solid rgb(255, 165, 0)', 
        padding: '5px 10px',
        cursor: 'pointer',
    }}
>
    Business Permit
    <input 
        type="file" 
        style={{ 
            display: 'none' 
        }} 
        onChange={(event) => { 
            // Handle the file upload
            console.log(event.target.files[0]); 
        }}
    />
</label>

                    </MDBCol>          
                </MDBRow>

                <MDBRow className='mb-3'>
                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <label 
    style={{ 
        display: 'inline-block',
        width: '100%', 
        textAlign: 'start',
        borderRadius: '15px', 
        backgroundColor: 'white', 
        border: '2px solid rgb(255, 165, 0)', 
        padding: '5px 10px',
        cursor: 'pointer',
    }}
>
    Personal Bank Statement
    <input 
        type="file" 
        style={{ 
            display: 'none' 
        }} 
        onChange={(event) => { 
            // Handle the file upload
            console.log(event.target.files[0]); 
        }}
    />
</label>

                    </MDBCol>

                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <label 
    style={{ 
        display: 'inline-block',
        width: '100%', 
        textAlign: 'start',
        borderRadius: '15px', 
        backgroundColor: 'white', 
        border: '2px solid rgb(255, 165, 0)', 
        padding: '5px 10px',
        cursor: 'pointer',
    }}
>
    Recent ITR
    <input 
        type="file" 
        style={{ 
            display: 'none' 
        }} 
        onChange={(event) => { 
            // Handle the file upload
            console.log(event.target.files[0]); 
        }}
    />
</label>

                    </MDBCol>          
                </MDBRow>
            </div>
            )}

            {/* Conditional Rendering for Buttons Below Business Owner */}
            {visibleButtons === 'employed' && (
                <div>
                    <h5 style={{ padding: '10px 5px'}}> Submit along with General Requirements </h5>
                <MDBRow className='mb-3'>
                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <button 
                        type="button" 
                        style={{ 
                            textAlign: 'start',
                        width: '100%', 
                        borderRadius: '15px', 
                        backgroundColor: 'white', 
                        border: '2px solid rgb(255, 165, 0)', 
                        padding: '5px 10px',
                        }}
                    >
                        Certificate of Employment
                    </button>
                    </MDBCol>

                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <button 
                        type="button" 
                        style={{ 
                            textAlign: 'start',
                        width: '100%', 
                        borderRadius: '15px', 
                        backgroundColor: 'white', 
                        border: '2px solid rgb(255, 165, 0)', 
                        padding: '5px 10px',
                        }}
                    >
                        Copy of Company ID
                    </button>
                    </MDBCol>          
                </MDBRow>

                <MDBRow className='mb-3'>
                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <button 
                        type="button" 
                        style={{ 
                            textAlign: 'start',
                        width: '100%', 
                        borderRadius: '15px', 
                        backgroundColor: 'white', 
                        border: '2px solid rgb(255, 165, 0)', 
                        padding: '5px 10px',
                        }}
                    >
                        ITR
                    </button>
                    </MDBCol>         
                </MDBRow>
            </div>
            )}

            {/* Conditional Rendering for Buttons Below Student */}
            {visibleButtons === 'student' && (
                <div>
                    <h5 style={{ padding: '10px 5px'}}> Submit along with General Requirements </h5>
                <MDBRow className='mb-3'>
                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <button 
                        type="button" 
                        style={{ 
                            textAlign: 'start',
                        width: '100%', 
                        borderRadius: '15px', 
                        backgroundColor: 'white', 
                        border: '2px solid rgb(255, 165, 0)', 
                        padding: '5px 10px',
                        }}
                    >
                        School Certification
                    </button>
                    </MDBCol>

                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <button 
                        type="button" 
                        style={{ 
                            textAlign: 'start',
                        width: '100%', 
                        borderRadius: '15px', 
                        backgroundColor: 'white', 
                        border: '2px solid rgb(255, 165, 0)', 
                        padding: '5px 10px',
                        }}
                    >
                        Birth Certificate
                    </button>
                    </MDBCol>          
                </MDBRow>

                <MDBRow className='mb-3'>
                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <button 
                        type="button" 
                        style={{ 
                            textAlign: 'start',
                        width: '100%', 
                        borderRadius: '15px', 
                        backgroundColor: 'white', 
                        border: '2px solid rgb(255, 165, 0)', 
                        padding: '5px 10px',
                        }}
                    >
                        School ID
                    </button>
                    </MDBCol>      

                    <MDBCol md="6" className="d-flex align-items-center justify-content-end text-start">
                    <button 
                        type="button" 
                        style={{ 
                            textAlign: 'start',
                        width: '100%', 
                        borderRadius: '15px', 
                        backgroundColor: 'white', 
                        border: '2px solid rgb(255, 165, 0)', 
                        padding: '5px 10px',
                        }}
                    >
                        Bank Certificate (applicant or parents’)
                    </button>
                    </MDBCol>      
                </MDBRow>
            </div>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>

    <ChatbotGuest />
    </>
  );
}

export default DetailsVisaGuest;
