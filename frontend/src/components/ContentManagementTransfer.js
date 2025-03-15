import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTypography,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';

import Toast from './Toast';

function ContentManagementTransfer() {
  const buttonColor = 'rgb(255, 165, 0)';
  const [toast, setToast] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Default content fields (prevents UI from breaking)
  const defaultContent = {
    transferImage: '',
  };

  // Fetch existing content from the API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/contents/get-content/67b8bf22dcf4d107a677a21f');
        const result = await response.json();
        if (response.ok) {
          setContent(result);
        } else {
          setToast({ message: 'Failed to load content', type: 'error' });
        }
      } catch (error) {
        setToast({ message: 'Error fetching content', type: 'error' });
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  
  // Handle Image Upload
  const handleImageUpload = async (event, contentId, imageField) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'travelwheels_upload');
    data.append('cloud_name', 'dnazfwgby');

    try {
      // Upload to Cloudinary
      const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dnazfwgby/image/upload', {
        method: 'POST',
        body: data,
      });
      const uploadedImage = await cloudRes.json();

      if (uploadedImage.secure_url) {
        const response = await fetch('https://travelwheelsph.onrender.com/api/contents/update-image', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fieldName: imageField, contentImage: uploadedImage.secure_url }),
        });

        const result = await response.json();

        if (response.ok) {
          setToast({ message: 'Image updated successfully!', type: 'success' });
          setContent((prevContent) => ({ ...prevContent, [imageField]: uploadedImage.secure_url }));
        } else {
          setToast({ message: 'Error updating image', type: 'error' });
          console.error('Error updating content image:', result.error);
        }
      }
    } catch (error) {
      setToast({ message: 'Error uploading image', type: 'error' });
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

// Handle Text Update
const handleTextUpdate = async (contentId, textField, newValue) => {
  if (!newValue.trim()) return;

  setLoading(true);
  try {
    const response = await fetch('https://travelwheelsph.onrender.com/api/contents/update-text', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fieldName: textField, contentText: newValue }),
    });

    const result = await response.json();

    if (response.ok) {
      setToast({ message: 'Text updated successfully!', type: 'success' });
      setContent((prevContent) => ({ ...prevContent, [textField]: newValue }));
    } else {
      setToast({ message: 'Error updating text', type: 'error' });
      console.error('Error updating text:', result.error);
    }
  } catch (error) {
    setToast({ message: 'Error updating text', type: 'error' });
    console.error('Error updating text:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <MDBContainer fluid style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <MDBTypography
        tag="h2"
        style={{
          fontWeight: 'bold',
          color: buttonColor,
          marginBottom: '10px',
          textAlign: 'center',
          fontSize: '3rem',
        }}
      >
        CONTENT MANAGEMENT - TRANSFERS
      </MDBTypography>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <>
          {/* Image Grid */}
          <MDBRow className="justify-content-center">
            {Object.keys(defaultContent).filter(key => key.includes('Image')).map((key) => (
              <MDBCol md="4" key={key} className="mb-4">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle>
                    {key.replace(/([A-Z])/g, ' $1').replace(/(\d+)/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}
                    </MDBCardTitle>
                    <img
                      src={content?.[key] || 'https://placehold.co/150'}
                      alt={key}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div style={{ position: 'relative', display: 'inline-block', marginTop: '0.5rem' }}>
                      <button type="button" className="btn btn-primary">Upload Image</button>
                      <input 
                        type="file" 
                        onChange={(event) => handleImageUpload(event, '67b8bf22dcf4d107a677a21f', key)} 
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          opacity: 0,
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>

          {/* Text Grid */}
          <MDBRow className="justify-content-center">
            {Object.keys(defaultContent).filter(key => !key.includes('Image')).map((key) => (
              <MDBCol md="12" key={key} className="mb-2">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle>
                    {key.replace(/([A-Z])/g, ' $1').replace(/(\d+)/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}
                    </MDBCardTitle>
                    <MDBInput
                      type="text"
                      defaultValue={content?.[key] || ''}
                      onBlur={(e) => handleTextUpdate('67b8bf22dcf4d107a677a21f', key, e.target.value)}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </>
      )}

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </MDBContainer>
  );
}

export default ContentManagementTransfer;
