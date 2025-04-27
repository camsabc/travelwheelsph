import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBFooter, 
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import subheaderImage from '../images/promobg.jpg';
import promoImage1 from '../images/promo1.jpg';
import promoImage2 from '../images/promo2.jpg';
import promoImage3 from '../images/promo3.jpg';
import Chatbot from "../components/Chatbot";

function Promos() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [content, setContent] = useState(null);
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

  const fetchPromos = async () => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com//api/promos/all');
      const data = await response.json();
      if (response.ok) {
        setPromos(data);
      }
    } catch (error) {
      console.error('Error fetching promos:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          const userResponse = await fetch(`https://travelwheelsph.onrender.com//api/users/get-user-by-email/${email}`);
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
        const response = await fetch('https://travelwheelsph.onrender.com//api/contents/get-content/67b8bf22dcf4d107a677a21f');
        const result = await response.json();
        if (response.ok) {
          setContent(result);
        } 
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
    fetchData();
    fetchPromos();
  }, [email]);

  const handleAddPromo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://travelwheelsph.onrender.com//api/promos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPromo)
      });

      if (response.ok) {
        setShowAddModal(false);
        // Refresh promos list
        fetchPromos();
      }
    } catch (error) {
      console.error('Error adding promo:', error);
    }
  };

  const AddPromoModal = () => (
    <div className="modal" style={{ display: showAddModal ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Promo</h5>
            <button type="button" className="close" onClick={() => setShowAddModal(false)}>×</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddPromo}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={newPromo.name}
                  onChange={(e) => setNewPromo({...newPromo, name: e.target.value})}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Description"
                  value={newPromo.description}
                  onChange={(e) => setNewPromo({...newPromo, description: e.target.value})}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Price"
                  value={newPromo.price}
                  onChange={(e) => setNewPromo({...newPromo, price: e.target.value})}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Duration"
                  value={newPromo.duration}
                  onChange={(e) => setNewPromo({...newPromo, duration: e.target.value})}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Inclusions (comma-separated)"
                  value={newPromo.inclusions}
                  onChange={(e) => setNewPromo({...newPromo, inclusions: e.target.value})}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Image URL"
                  value={newPromo.image}
                  onChange={(e) => setNewPromo({...newPromo, image: e.target.value})}
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  value={newPromo.startDate}
                  onChange={(e) => setNewPromo({...newPromo, startDate: e.target.value})}
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  value={newPromo.endDate}
                  onChange={(e) => setNewPromo({...newPromo, endDate: e.target.value})}
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Promo</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

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
    <div className="d-flex flex-column min-vh-100">

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
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/services', { state: { email: user.email }})}>Services</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px', fontWeight: 'bold' }}>
                <MDBNavbarLink 
                    onClick={() => navigate('/promos', { state: { email: user.email }})}
                    style={{ color: 'rgb(255, 165, 0)' }}  
                >
                    Promos
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry', { state: { email: user.email }})}>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => navigate('/profile', { state: { email: user.email }})}
                style={{
                  margin: '0 25px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, {user?.firstname || 'Guest'}

              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      {/* Subheader Section */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          backgroundImage: `url(${subheaderImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          I TRAVELLED WITH TRAVELTAYO
        </div>
      </div>

      {/* Main Content Section: Row of Images with 3 Columns */}

      <MDBTypography 
            tag="h1" 
            className="text-center mt-5" 
            style={{
                fontWeight: 'bolder', 
                color: 'rgb(255, 165, 0)', 
                fontSize: '35px', 
            }}
            >
            BOOK YOUR NEXT VACATION WITH OUR SALE!!!
        </MDBTypography>

      {user?.type === 'admin' && (
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn"
          style={{
            backgroundColor: 'rgb(255, 165, 0)',
            color: 'white',
            marginBottom: '20px'
          }}
        >
          Add New Promo
        </button>
      )}

      {showAddModal && <AddPromoModal />}

      <MDBContainer className="my-4">
        <MDBRow>
          {promos.map((promo, index) => (
            <MDBCol md="4" key={promo._id} className="mb-4 d-flex flex-column align-items-center">
              <MDBCardImage
                src={promo.image || `promoImage${index + 1}`}
                alt={`Promo ${index + 1}`}
                className="img-fluid"
                style={{ width: '300px', height: '300px', objectFit: 'cover' }}
              />
              <h5 className="mt-2" style={{ fontWeight: 'bold', padding: '25px' }}>
                FOR AS LOW AS <span style={{ color: 'rgb(255, 165, 0)' }}>{promo.price || "PHP 3,999"}</span>
              </h5>

              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate(`/promo/${promo._id}`, { state: { email: user?.email } })}
                style={{ 
                  fontWeight: 'bold',
                  fontSize: '14px', 
                  width: '80%', 
                  borderRadius: '30px', 
                  backgroundColor: 'rgb(255, 165, 0)', 
                  border: 'none', 
                  padding: '10px 20px' 
                }}
              >
                BOOK NOW
              </button>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>

      {/* Footer Section */}
      <MDBFooter bgColor="light" className="text-start text-lg-left mt-auto">
        <div className="container text-left text-md-left">
            <div className="row mt-2 mb-2">
{/* Column 1 */}
<div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
    <h5 className="text-uppercase mt-2 mb-4 font-weight-bold" style={{ fontWeight: 'bold' }}>FOLLOW US</h5>
    
        {/* Social Media Icons Row */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* Facebook Button */}
            <a 
                href="https://www.facebook.com/TravelTayoCarRentalandTours" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(255, 165, 0)', // Orange
                    color: 'white',
                    textDecoration: 'none',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%', // Makes it circular
                    fontSize: '24px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <i className="fab fa-facebook-f"></i>
            </a>

            {/* Instagram Button */}
            <a 
                href="https://www.instagram.com/traveltayoph/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(255, 165, 0)', // Orange
                    color: 'white',
                    textDecoration: 'none',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%', // Makes it circular
                    fontSize: '24px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <i className="fab fa-instagram"></i>
            </a>
        </div>
    </div>
            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mt-4 mb-2 font-weight-bold">Business Hours:</h6>
                <p>
                    Monday - Saturday: 8AM - 7 PM
                </p>
            </div>

            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mt-4 mb-2 font-weight-bold">Business Address: </h6>
                <p>
                    Office Unit 2, Hersyl Building, Blk 5 Lot 25 Phase4, Golden City Subdivision, Brgy. Dila, Santa Rosa, Philippines
                </p>
            </div>

            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mt-4 text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/about-us', { state: { email: user.email }})}>ABOUT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/inquiry', { state: { email: user.email }})}>CONTACT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/faq', { state: { email: user.email }})}>FAQS</h6>
            </div>
    </div>
  </div>

</MDBFooter>
<Chatbot user={user}/>

    </div>
  );
}

export default Promos;
