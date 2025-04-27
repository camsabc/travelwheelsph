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
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from 'mdb-react-ui-kit';

import Toast from './Toast';

function ContentManagementPromo() {
  const buttonColor = 'rgb(255, 165, 0)';
  const [toast, setToast] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promos, setPromos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPromo, setNewPromo] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    inclusions: '',
    image: '',
    startDate: '',
    endDate: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent();
    fetchPromos();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com//api/contents/get-content/67b8bf22dcf4d107a677a21f');
      const result = await response.json();
      if (response.ok) {
        setContent(result);
      }
    } catch (error) {
      setToast({ message: 'Error fetching content', type: 'error' });
    }
  };

  const fetchPromos = async () => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com//api/promos/all');
      const data = await response.json();
      if (response.ok) {
        setPromos(data);
      }
    } catch (error) {
      setToast({ message: 'Error fetching promos', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'travelwheels_upload');
    data.append('cloud_name', 'dnazfwgby');

    try {
      const cloudResponse = await fetch('https://api.cloudinary.com/v1_1/dnazfwgby/image/upload', {
        method: 'POST',
        body: data
      });
      const uploadedImage = await cloudResponse.json();
      return uploadedImage.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleAddPromo = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = newPromo.image;
      const fileInput = document.querySelector('#promoImage');
      
      if (fileInput && fileInput.files[0]) {
        imageUrl = await handleImageUpload(fileInput.files[0]);
      }

      const promoData = {
        ...newPromo,
        image: imageUrl
      };

      const response = await fetch('https://travelwheelsph.onrender.com//api/promos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promoData)
      });

      if (response.ok) {
        setShowAddModal(false);
        fetchPromos();
        setNewPromo({
          name: '',
          description: '',
          price: '',
          duration: '',
          inclusions: '',
          image: '',
          startDate: '',
          endDate: ''
        });
      }
    } catch (error) {
      console.error('Error adding promo:', error);
    }
  };

  const handleDeletePromo = async (id) => {
    try {
      const response = await fetch(`https://travelwheelsph.onrender.com//api/promos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchPromos();
        setToast({ message: 'Promo deleted successfully!', type: 'success' });
      }
    } catch (error) {
      setToast({ message: 'Error deleting promo', type: 'error' });
    }
  };

  const handleUpdateImage = async (event, promoId) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'travelwheels_upload');
    data.append('cloud_name', 'dnazfwgby');

    try {
      const cloudResponse = await fetch('https://api.cloudinary.com/v1_1/dnazfwgby/image/upload', {
        method: 'POST',
        body: data
      });

      const uploadedImage = await cloudResponse.json();

      if (uploadedImage.secure_url) {
        const response = await fetch(`https://travelwheelsph.onrender.com//api/promos/update-image/${promoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: uploadedImage.secure_url })
        });

        if (response.ok) {
          fetchPromos();
          setToast({ message: 'Image updated successfully!', type: 'success' });
        }
      }
    } catch (error) {
      setToast({ message: 'Error updating image', type: 'error' });
    }
  };

  const AddPromoModal = () => (
    <div className="modal" style={{ display: showAddModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Promo</h5>
            <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddPromo}>
              <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input
                  type="file"
                  id="promoImage"
                  className="form-control"
                  accept="image/*"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newPromo.name}
                  onChange={(e) => setNewPromo(prev => ({...prev, name: e.target.value}))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={newPromo.description}
                  onChange={(e) => setNewPromo(prev => ({...prev, description: e.target.value}))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={newPromo.price}
                  onChange={(e) => setNewPromo(prev => ({...prev, price: e.target.value}))}
                />
              </div>
              <MDBInput
                label="Duration"
                className="mb-3"
                value={newPromo.duration}
                onChange={(e) => setNewPromo({...newPromo, duration: e.target.value})}
              />
              <MDBInput
                type="textarea"
                label="Inclusions (comma-separated)"
                className="mb-3"
                value={newPromo.inclusions}
                onChange={(e) => setNewPromo({...newPromo, inclusions: e.target.value})}
              />
              <MDBInput
                label="Image URL"
                className="mb-3"
                value={newPromo.image}
                onChange={(e) => setNewPromo({...newPromo, image: e.target.value})}
              />
              <div className="d-flex gap-3 mb-3">
                <MDBInput
                  type="date"
                  label="Start Date"
                  value={newPromo.startDate}
                  onChange={(e) => setNewPromo({...newPromo, startDate: e.target.value})}
                />
                <MDBInput
                  type="date"
                  label="End Date"
                  value={newPromo.endDate}
                  onChange={(e) => setNewPromo({...newPromo, endDate: e.target.value})}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <MDBBtn color="secondary" onClick={() => setShowAddModal(false)}>Cancel</MDBBtn>
                <MDBBtn type="submit" style={{ backgroundColor: buttonColor }}>Save Promo</MDBBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MDBContainer fluid>
      <MDBTypography tag="h2" className="text-center mb-4" style={{ color: buttonColor, fontWeight: 'bold' }}>
        Promo Management
      </MDBTypography>

      <MDBBtn 
        style={{ backgroundColor: buttonColor, marginBottom: '20px' }}
        onClick={() => setShowAddModal(true)}
      >
        Add New Promo
      </MDBBtn>

      {showAddModal && <AddPromoModal />}

      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {promos.map((promo) => (
            <tr key={promo._id}>
              <td>{promo.name}</td>
              <td>{promo.price}</td>
              <td>{promo.duration}</td>
              <td>
                <input
                  type="file"
                  onChange={(e) => handleUpdateImage(e, promo._id)}
                  style={{ display: 'none' }}
                  id={`image-upload-${promo._id}`}
                />
                <label htmlFor={`image-upload-${promo._id}`}>
                  <MDBBtn size="sm" style={{ backgroundColor: buttonColor }}>Update Image</MDBBtn>
                </label>
              </td>
              <td>
                <MDBBtn 
                  color="danger" 
                  size="sm" 
                  onClick={() => handleDeletePromo(promo._id)}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </MDBContainer>
  );
}

export default ContentManagementPromo;
