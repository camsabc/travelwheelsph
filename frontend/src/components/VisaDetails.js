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

import flightsbg from '../images/flightsbg.jpg';
import hotelbg from '../images/hotelbg.jpg';
import passportbg from '../images/passportbg.jpg';
import visabg from '../images/visabg.jpg';
import logo from '../images/header.jpg';

import Toast from '../components/Toast';
import Chatbot from "../components/Chatbot";

function VisaDetails() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(visabg);
  const [content, setContent] = useState(null);

  const [visibleButtons, setVisibleButtons] = useState('');

  const [user, setUser] = useState(null);
  const location = useLocation();
  const { email, country } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

  const [uploadedDocuments, setUploadedDocuments] = useState({
    firstname: '',
    lastname: '',
    email: '',
    completeVisaForm: '',
    origPass: '',
    proofFunds: '',
    idPic: '',
    psaBirthCert: '',
    latestItr: '',
    businessReg: '',
    bankStatement: '',
    businessPermit: '',
    recentItr: '',
    employCert: '',
    companyId: '',
    itr: '',
    schoolCert: '',
    schoolId: '',
    birthCert: '',
    bankCert: '',
    type: 'Visa',
    status: 'Pending',
});



  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const toggleButtons = (type) => {
    setVisibleButtons((prevType) => (prevType === type ? '' : type));
  };










  

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'travelwheels_upload');
    data.append('cloud_name', 'dnazfwgby');

    try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dnazfwgby/upload', {
            method: 'POST',
            body: data,
        });
        const uploadedFile = await res.json();
        if (!uploadedFile.secure_url) throw new Error('Upload failed');

        // ✅ Update `uploadedDocuments` directly
        setUploadedDocuments((prevDocs) => ({
            ...prevDocs,
            [type]: uploadedFile.secure_url, 
        }));

        showToast(`${type.replace(/([A-Z])/g, ' $1')} Image Uploaded!`, 'success');
    } catch (error) {
        console.error(error);
        showToast('Error uploading file. Please try again.', 'error');
    }
};

  


  const handleSubmit = async () => {
    try {
        const quotationData = {
            email: user.email,          
            firstname: user?.firstname || '',  
            lastname: user?.lastname || '',     
            ...uploadedDocuments       
        };

        const createResponse = await fetch(`https://travelwheelsph.onrender.com/api/quotations/create-quotation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quotationData),
        });

        if (!createResponse.ok) throw new Error('Failed to create quotation');

        showToast('Quotation created successfully', 'success');
        navigate('/services', { state: { email: user.email }});
    } catch (error) {
        console.error(error);
        showToast('An error occurred', 'error');
    }
};


  
  










  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          const userResponse = await fetch(`https://travelwheelsph.onrender.com/api/users/get-user-by-email/${email}`);
          const userData = await userResponse.json();

          if (userData.error) {
            setError(userData.error);
          } else {
            setUser(userData);
          }
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to fetch user data.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    const fetchContent = async () => {
      try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/contents/get-content/67b8bf22dcf4d107a677a21f');
        const result = await response.json();
        if (response.ok) {
          setContent(result);
        } 
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
    fetchData();
  }, [email]);

  // Conditional rendering based on loading state
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <>
    {/* Header Section */}
  <div className="bg-white py-2" style={{ flexShrink: 0 }}>
  <MDBContainer fluid className="d-flex align-items-center justify-content-between">
  <MDBCardImage
    src={logo}
    style={{ width: '200px', cursor: 'pointer' }}
    alt="Header Logo"
    onClick={() => navigate('/home-user', { state: { email: user.email }})} 
  />
    <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
      <MDBNavbarNav className="align-items-center">

        <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
          <MDBNavbarLink 
              onClick={() => navigate('/services', { state: { email: user.email }})}
              style={{ color: 'rgb(255, 165, 0)' }}  
          >
              Services
          </MDBNavbarLink>
        </MDBNavbarItem>

        <MDBNavbarItem style={{ margin: '0 25px' }}>
          <MDBNavbarLink onClick={() => navigate('/promos', { state: { email: user.email }})}>Promos</MDBNavbarLink>
        </MDBNavbarItem>

        <MDBNavbarItem style={{ margin: '0 25px' }}>
          <MDBNavbarLink onClick={() => navigate('/inquiry')}>Inquiry</MDBNavbarLink>
        </MDBNavbarItem>
        <span
          onClick={() => navigate('/profile', { state: { email: user.email } })}
          style={{
            margin: '0 25px',
            fontSize: '1rem',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          Hi, {user?.firstname || "Guest"}
        </span>
      </MDBNavbarNav>
    </MDBNavbar>
  </MDBContainer>
</div>
    <div className="d-flex flex-column min-vh-100" style={{
        backgroundImage: `url(${content?.visaImage || visabg})`,
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
        VISA FOR {country} 
      </MDBTypography>

      <MDBContainer className="flex-grow-1 d-flex align-items-center justify-content-center">
        <MDBCard style={{ maxWidth: '900px', width: '100%', marginBottom: '50px', backgroundColor: 'rgba(255, 255, 255)', padding: '20px', borderRadius: '15px' }}>
          <MDBCardBody>
            <MDBTypography tag="h5" className="text-center mb-2">Upload the following requirements below:</MDBTypography>
            <ul style={{ paddingLeft: "0", paddingBottom: "20px", listStylePosition: 'inside', textAlign: 'center', fontSize: '20px' }}> {/* Center the list */}
              <li> {content?.visaNote1 || 'All documents must be original unless stated otherwise.'} </li>
              <li> {content?.visaNote2 || 'Size of document for application should be A4 size only.'} </li>
              <li> General requirements are required for quotation. </li>
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
                        <label 
                  style={{ 
                    display: 'inline-block',
                    width: '100%', 
                    textAlign: 'start',
                    borderRadius: '15px', 
                    backgroundColor: uploadedDocuments.completeVisaForm ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.completeVisaForm ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Complete Visa Form
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'completeVisaForm')}
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
                    backgroundColor: uploadedDocuments.idPic ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.idPic ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  2x2 ID Picture White Background
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'idPic')}
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
                    backgroundColor: uploadedDocuments.origPass ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.origPass ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Original Passport
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'origPass')}
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
                    backgroundColor: uploadedDocuments.psaBirthCert ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.psaBirthCert ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  PSA Birth Certificate
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'psaBirthCert')}
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
                    backgroundColor: uploadedDocuments.proofFunds ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.proofFunds ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Proof of Funds
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'proofFunds')}
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
                    backgroundColor: uploadedDocuments.latestItr ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.latestItr ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Latest ITR
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'latestItr')}
                  />
                </label>
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
                    backgroundColor: uploadedDocuments.businessReg ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.businessReg ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Business Registration
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'businessReg')}
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
                    backgroundColor: uploadedDocuments.businessPermit ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.businessPermit ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Business Permit
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'businessPermit')}
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
                    backgroundColor: uploadedDocuments.bankStatement ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.bankStatement ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Personal Bank Statement
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'bankStatement')}
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
                    backgroundColor: uploadedDocuments.recentItr ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.recentItr ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Recent ITR
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'recentItr')}
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
                    <label 
                  style={{ 
                    display: 'inline-block',
                    width: '100%', 
                    textAlign: 'start',
                    borderRadius: '15px', 
                    backgroundColor: uploadedDocuments.employCert ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.employCert ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Employment Certificate
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'employCert')}
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
                    backgroundColor: uploadedDocuments.companyId ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.companyId ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Company ID
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'emplcompanyIdCert')}
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
                    backgroundColor: uploadedDocuments.itr ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.itr ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  ITR
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'itr')}
                  />
                </label>
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
                    <label 
                  style={{ 
                    display: 'inline-block',
                    width: '100%', 
                    textAlign: 'start',
                    borderRadius: '15px', 
                    backgroundColor: uploadedDocuments.schoolCert ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.schoolCert ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  School Certifcation
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'schoolCert')}
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
                    backgroundColor: uploadedDocuments.birthCert ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.birthCert ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Birth Certificate
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'birthCert')}
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
                    backgroundColor: uploadedDocuments.schoolId ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.schoolId ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  School ID
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'schoolId')}
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
                    backgroundColor: uploadedDocuments.bankCert ? '#d1ffbd' : 'white',
                    border: uploadedDocuments.bankCert ? '2px solid green' : '2px solid rgb(255, 165, 0)', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out'
                  }}
                >
                  Bank Certificate
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileUpload(e, 'bankCert')}
                  />
                </label>
                    </MDBCol>      
                </MDBRow>
            </div>
            )}
          </MDBCardBody>


<MDBRow className="mt-4">
                  <MDBCol md="6" className="d-flex align-items-center">
                    <input 
                      type="checkbox" 
                      id="termsCheckbox" 
                      checked={isChecked} 
                      onChange={handleCheckboxChange} 
                      style={{ marginRight: '10px' }} 
                    />
                    <label htmlFor="termsCheckbox" style={{ fontSize: '15px'}}>
                      By clicking this, you agree to {' '}
                      <span 
                        onClick={() => navigate('/terms-and-conditions-visa', { state: { email: user.email }})}
                        style={{ 
                          color: '#68BBE3', 
                          cursor: 'pointer' ,
                          fontSize: '15px'
                        }}
                      >
                        Terms & Conditions
                      </span>.
                    </label>
                  </MDBCol>

                  
                  <MDBCol md="2" className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                        fontWeight: 'bold',
                        width: '100%',
                        borderRadius: '30px',
                        backgroundColor: 'white',
                        border: 'solid',
                        borderColor: 'rgb(255, 165, 0)',
                        borderWidth: '3px',
                        padding: '10px 5px',
                        color: 'rgb(255, 165, 0)',
                      }}
                      onClick={() => navigate('/services', { state: { email: user.email } })}
                    >
                      BACK
                    </button>
                  </MDBCol>

                  <MDBCol md="4" className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                        fontWeight: 'bold',
                        width: '100%',
                        borderRadius: '30px',
                        backgroundColor: 'rgb(255, 165, 0)',
                        border: 'none',
                        padding: '10px 20px',
                      }}
                      onClick={handleSubmit}
                      disabled={
                        !isChecked ||
                        !uploadedDocuments.completeVisaForm ||
                        !uploadedDocuments.origPass ||
                        !uploadedDocuments.proofFunds ||
                        !uploadedDocuments.idPic ||
                        !uploadedDocuments.psaBirthCert ||
                        !uploadedDocuments.latestItr 
                      }
                    >
                      REQUEST QUOTATION
                    </button>
                  </MDBCol>
                </MDBRow>



        </MDBCard>
      </MDBContainer>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <Chatbot user={user}/>
    </div>
    </>
  );
}

export default VisaDetails;
