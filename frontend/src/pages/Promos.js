import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  MDBBtn
} from 'mdb-react-ui-kit';

import logo from '../../images/header.jpg';
import subheaderImage from '../../images/promobg.jpg';
import ChatbotGuest from './ChatbotGuest';

function Promos() {
  const navigate = useNavigate();
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [promosPerPage] = useState(6);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const response = await fetch('https://travelwheelsph.onrender.com/api/promos/all');
      const data = await response.json();
      if (response.ok) {
        const activePromos = data.filter(promo => promo.status === 'active');
        setPromos(activePromos);
      }
    } catch (err) {
      setError('Failed to fetch promos');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastPromo = currentPage * promosPerPage;
  const indexOfFirstPromo = indexOfLastPromo - promosPerPage;
  const currentPromos = promos.slice(indexOfFirstPromo, indexOfLastPromo);
  const totalPages = Math.ceil(promos.length / promosPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Pagination = () => {
    if (totalPages <= 1) return null;

    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button
            className="page-link"
            onClick={() => paginate(i)}
            style={{
              backgroundColor: currentPage === i ? 'rgb(255, 165, 0)' : '#fff',
              color: currentPage === i ? '#fff' : '#000',
              borderColor: 'rgb(255, 165, 0)',
              margin: '0 2px'
            }}
          >
            {i}
          </button>
        </li>
      );
    }

    return (
      <nav aria-label="Promo pagination" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                backgroundColor: currentPage === 1 ? '#ccc' : 'rgb(255, 165, 0)',
                color: '#fff',
                margin: '0 5px'
              }}
            >
              &laquo;
            </button>
          </li>
          {pages}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: currentPage === totalPages ? '#ccc' : 'rgb(255, 165, 0)',
                color: '#fff',
                margin: '0 5px'
              }}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <MDBTypography tag="h2" style={{ fontWeight: 'bold', color: 'rgb(255, 165, 0)' }}>
          Loading...
        </MDBTypography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <MDBTypography tag="h4" style={{ fontWeight: 'bold', color: 'red' }}>
          {error}
        </MDBTypography>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="bg-white py-2">
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
          <MDBCardImage
            src={logo}
            style={{ width: '200px', cursor: 'pointer' }}
            alt="Header Logo"
            onClick={() => navigate('/')}
          />
          <MDBNavbar expand="lg" light bgColor="white">
            <MDBNavbarNav className="align-items-center">
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/services-guest')}>
                  Services
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink 
                  onClick={() => navigate('/promos-guest')}
                  style={{ color: 'rgb(255, 165, 0)', fontWeight: 'bold' }}
                >
                  Promos
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 25px' }}>
                <MDBNavbarLink onClick={() => navigate('/inquiry-guest')}>
                  Inquiry
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBBtn
                onClick={() => navigate('/login')}
                style={{
                  backgroundColor: 'rgb(255, 165, 0)',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '8px 20px'
                }}
              >
                Log In / Sign up
              </MDBBtn>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      <div
        style={{
          position: 'relative',
          height: '200px',
          backgroundImage: `url(${subheaderImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
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
            width: '100%'
          }}
        >
          I TRAVELLED WITH TRAVELTAYO
        </div>
      </div>

      <MDBContainer className="my-5">
        <MDBRow>
          {currentPromos.map((promo) => (
            <MDBCol md="4" key={promo._id} className="mb-4">
              <div className="h-100 d-flex flex-column shadow-sm rounded">
                <div style={{ height: '300px', overflow: 'hidden' }}>
                  <img
                    src={promo.image}
                    alt={promo.name}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4 text-center">
                  <h5 className="mb-3 fw-bold">
                    {promo.duration} {promo.name}
                  </h5>
                  {promo.price && (
                    <p className="mb-4">
                      Price: <span style={{ color: 'rgb(255, 165, 0)', fontWeight: 'bold' }}>
                        {promo.price}
                      </span>
                    </p>
                  )}
                  <MDBBtn
                    onClick={() => navigate('/more-details', { state: { promo } })}
                    style={{
                      backgroundColor: 'rgb(255, 165, 0)',
                      border: 'none',
                      borderRadius: '30px',
                      width: '80%'
                    }}
                  >
                    MORE DETAILS
                  </MDBBtn>
                </div>
              </div>
            </MDBCol>
          ))}
        </MDBRow>
        <Pagination />
      </MDBContainer>

      <MDBFooter bgColor="light" className="mt-auto">
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
                <h6 className="mt-4 text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/about-us-guest')}>ABOUT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/inquiry-guest')}>CONTACT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/faq-guest')}>FAQS</h6>
            </div>
    </div>
  </div>

</MDBFooter>

      <ChatbotGuest />
    </div>
  );
}

export default Promos;


