import React, { useState, useEffect } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';

import {
  MDBContainer,
  MDBCard,
  MDBTypography,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCardImage,
  MDBFooter,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import flightsbg from '../images/flightsbg.jpg';


import FlightsDetails from '../components/FlightsDetails';
import HotelDetails from '../components/HotelDetails';
import PassportDetails from '../components/PassportDetails';
import VisaDetails from '../components/VisaDetails';
import TransferDetails from '../components/TransferDetails';
import TravelInsuranceDetails from '../components/TravelInsuranceDetails';

import ride1 from '../images/ride1.jpg';
import ride2 from '../images/ride2.jpg';
import ride3 from '../images/ride3.jpg';

import educ1 from '../images/educ1.jpg';
import educ2 from '../images/educ2.jpg';
import educ3 from '../images/educ3.png';

import pack1 from '../images/pack1.jpg';
import pack2 from '../images/pack2.jpg';
import pack3 from '../images/pack3.jpg';
import pack4 from '../images/pack4.jpg';
import pack5 from '../images/pack5.jpg';
import pack6 from '../images/pack6.jpg';
import pack7 from '../images/pack7.jpg';

import Toast from '../components/Toast'; 


import japan_flag from '../images/japan.png'
import southkorea_flag from '../images/southkorea.png'
import usa_flag from '../images/usa.png'
import canada_flag from '../images/canada.png'
import uae_flag from '../images/uae.png'
import turkey_flag from '../images/turkey.png'
import india_flag from '../images/india.png'
import vietnam_flag from '../images/vietnam.png'
import newzealand_flag from '../images/newzealand.png'
import china_flag from '../images/china.png'
import russia_flag from '../images/russia.png'
import spain_flag from '../images/spain.png'


function Services() {

  const navigate = useNavigate();  
  const [backgroundImage, setBackgroundImage] = useState(flightsbg);
  const [currentTabGroupIndex, setCurrentTabGroupIndex] = useState(0);


  const [selectedRide, setSelectedRide] = useState(null);
  const [rides, setRides] = useState([]);
  const [educs, setEducs] = useState([]);
  const [packs, setPacks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const { serviceName, email } = location.state || {};
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState(serviceName);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Number of items per "page"
  const totalPages = Math.ceil(educs.length / itemsPerPage);

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages); // Loop back to the first page when reaching the end
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1)); // Loop back to the last page if on the first page
  };
  

  const getImageForRide = (picsValue) => {
    switch (picsValue) {
      case 1:
        return ride1;
      case 2:
        return ride2;
      case 3:
        return ride3;
      default:
        return null; 
    }
  };
  
  const getImageForEduc = (picsValue) => {
    switch (picsValue) {
      case 1:
        return educ1;
      case 2:
        return educ2;
      case 3:
        return educ3;
      default:
        return null; 
    }
  };

  const getImageForPack = (picsValue) => {
    switch (picsValue) {
      case 1:
        return pack1;
      case 2:
        return pack2;
      case 3:
        return pack3;
      case 4:
        return pack4;
      case 5:
        return pack5;
      case 6:
        return pack6;
      case 7:
        return pack7;
    default:
        return null; 
    }
  };

  const countries = [
    { name: 'Japan', flag: japan_flag },
    { name: 'South Korea', flag: southkorea_flag },
    { name: 'USA', flag: usa_flag },
    { name: 'Canada', flag: canada_flag },
    { name: 'UAE', flag: uae_flag },
    { name: 'Turkey', flag: turkey_flag },
    { name: 'India', flag: india_flag },
    { name: 'Vietnam', flag: vietnam_flag },
    { name: 'New Zealand', flag: newzealand_flag },
    { name: 'China', flag: china_flag },
    { name: 'Russia', flag: russia_flag },
    { name: 'Spain', flag: spain_flag },
  ];
  

  useEffect(() => {
    const fetchData = async () => {
        if (email) {
            try {
                const userResponse = await fetch(`http://localhost:3000/api/users/get-user-by-email/${email}`);
                const userData = await userResponse.json();

                if (userData.error) {
                    setError(userData.error);
                } else {
                    setUser(userData);
                }

                const ridesResponse = await fetch(`http://localhost:3000/api/rides/get-all-rides`);
                const ridesData = await ridesResponse.json();
                if (ridesData.error) {
                    setError(ridesData.error);
                } else {
                    setRides(ridesData);
                }

                const educsResponse = await fetch(`http://localhost:3000/api/educs/get-all-educs`);
                const educsData = await educsResponse.json();
                if (educsData.error) {
                    setError(educsData.error);
                } else {
                    setEducs(educsData);
                }

                const packsResponse = await fetch(`http://localhost:3000/api/packs/get-all-packs`);
                const packsData = await packsResponse.json();
                if (packsData.error) {
                    setError(packsData.error);
                } else {
        
                    setPacks(packsData);
                }

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch user or rides data.');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };
    fetchData();
}, [email]);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#eee',
      }}
    >
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
                <MDBNavbarLink onClick={() => navigate('/inquiry', { state: { email: user.email }})}>Inquiry</MDBNavbarLink>
              </MDBNavbarItem>
              <span
                onClick={() => {}}
                style={{
                  margin: '0 25px',
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
      <MDBContainer className="flex-grow-1 py-2">
        {selectedTab === 'Flights' && (
          <FlightsDetails />
        )}

        {selectedTab === 'Travel Insurance' && (
          <TravelInsuranceDetails />
        )}

        {selectedTab === 'Hotel' && (
          <HotelDetails />
        )}

        {selectedTab === 'Ride' && (
          <>
              <MDBTypography 
                tag="h1" 
                className="text-center mt-4" 
                style={{
                  fontWeight: 'bolder', 
                  color: 'white', 
                  fontSize: '60px',
                  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
                }}
                >
                CAR RENTAL
              </MDBTypography>
          
            <MDBCard style={{ borderRadius: '15px', padding: '20px', backgroundColor: '#fff', marginTop: '10px', marginBottom: '20px' }}>
            <MDBRow>
              {rides.map((ride) => (
                <MDBCol md="6" lg="4" className="mb-4 align-items-center" key={ride._id}>
                  <div
                    onClick={() => navigate(`/ride/${ride._id}`, { state: { email: user?.email, rideName: ride.name } })}
                    style={{ cursor: 'pointer' }}
                  >
                    <MDBCardImage
                      src={getImageForRide(ride.pics)}
                      position="top"
                      alt={ride.name}
                      style={{ height: '70%', width: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>

                  <div className="d-flex flex-column mx-auto" style={{ width: '70%' }}>
                    <MDBTypography tag="h6" className="text-start mt-3" style={{ fontWeight: 'bold' }}>
                      {ride.name}
                    </MDBTypography>
                    <MDBTypography tag="p" className="text-start">
                      Type: {ride.type} <br />
                      Seats: {ride.seat}
                    </MDBTypography>
                  </div>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBCard>
          </>
        )}

        {selectedTab === 'Tour' && (
          <>
          <MDBTypography 
            tag="h1" 
            className="text-center mt-4" 
            style={{
              fontWeight: 'bolder', 
              color: 'white', 
              fontSize: '60px',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
            }}
          >
            TOUR PACKAGES
          </MDBTypography>

          <MDBCard 
            style={{ 
              borderRadius: '15px', 
              padding: '20px', 
              backgroundColor: '#fff', 
              marginTop: '10px', 
              marginBottom: '10px', 
              position: 'relative' 
            }}
          >

         <MDBTypography 
            tag="h3" 
            className="text-start mt-2" 
            style={{ fontWeight: 'bold', color: '#333' }}
          >
            DOMESTIC TOUR
          </MDBTypography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              

              {/* Slide content */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <MDBRow style={{ display: 'flex', justifyContent: 'center' }}>
                  {packs.slice(0, 3).map((pack) => (
                    <MDBCol 
                      md="6" 
                      lg="4" 
                      className="mb-4 align-items-center" 
                      key={pack._id} 
                      style={{ position: 'relative', display: 'inline-block', flexShrink: 0, width: '33%' }}
                    >
                      <div
                        onClick={() => navigate(`/pack-dom/${pack._id}`, { state: { email: user?.email } })}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        <MDBCardImage
                          src={getImageForPack(pack.pics)}
                          alt={pack.name}
                          style={{ height: '350px', width: '100%', objectFit: 'cover', objectPosition: 'center', marginBottom: '-20px' }}
                        />
                      </div>
                    </MDBCol>
                  ))}
                </MDBRow>
              </div>
            </div>
          </MDBCard>



          <MDBCard 
            style={{ 
              borderRadius: '15px', 
              padding: '20px', 
              backgroundColor: '#fff', 
              marginTop: '20px', 
              marginBottom: '10px', 
              position: 'relative' 
            }}
          >

            <MDBTypography 
            tag="h3" 
            className="text-start mt-2" 
            style={{ fontWeight: 'bold', color: '#333' }}
          >
            INTERNATIONAL TOUR
          </MDBTypography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              

              {/* Slide content */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <MDBRow style={{ display: 'flex', justifyContent: 'center' }}>
                  {packs.slice(3, 6).map((pack) => (
                    <MDBCol 
                      md="6" 
                      lg="4" 
                      className="mb-4 align-items-center" 
                      key={pack._id} 
                      style={{ position: 'relative', display: 'inline-block', flexShrink: 0, width: '33%' }}
                    >
                      <div
                        onClick={() => navigate(`/pack-int/${pack._id}`, { state: { email: user?.email } })}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        <MDBCardImage
                          src={getImageForPack(pack.pics)}
                          alt={pack.name}
                          style={{ height: '350px', width: '100%', objectFit: 'cover', objectPosition: 'center', marginBottom: '-20px' }}
                        />
                      </div>
                    </MDBCol>
                  ))}
                </MDBRow>
              </div>
            </div>
          </MDBCard>
        </>

        )}

        {/* Additional content for new tab group (Visa, Education, etc.) */}
        {selectedTab === 'Passport Appointment' && (
          <PassportDetails />
        )}

        {selectedTab === 'Visa' && (
          <>
            <MDBTypography 
              tag="h1" 
              className="text-center mt-4" 
              style={{
                fontWeight: 'bolder', 
                color: 'white', 
                fontSize: '60px',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
              }}
            >
              VISA
            </MDBTypography>
          
            <MDBCard 
              style={{ 
                borderRadius: '15px', 
                padding: '20px', 
                backgroundColor: '#fff', 
                marginTop: '10px', 
                marginBottom: '10px' 
              }}
            >
<MDBRow>
  {countries.map((country, index) => (
    <MDBCol md="3" className="mb-4" key={index}>
      <MDBCard 
        style={{ 
          borderRadius: '10px', 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: 'rgb(255, 165, 0)' 
        }}
        onClick={() => navigate(`/visa`, { state: { email: user?.email, country: country.name } })}
      >
        <div 
          style={{ 
            width: '100%', 
            height: '100px',  // Fixed container height
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: '10px 10px 0 0'
          }}
        >
          <img 
            src={country.flag} 
            alt={`${country.name} flag`} 
            style={{ 
              width: '180px', 
              height: '100px',  
              objectFit: 'cover', 
              borderRadius: '5px'
            }}
          />
        </div>
        <MDBTypography tag="h6" className="mt-2" style={{ color: 'white', fontSize: '20px' }}>
          {country.name}
        </MDBTypography>
      </MDBCard>
    </MDBCol>
  ))}
</MDBRow>


            </MDBCard>
          </>
        )}


        {selectedTab === 'Educational Tour' && (
          <>
            <MDBTypography 
              tag="h1" 
              className="text-center mt-4" 
              style={{
                fontWeight: 'bolder', 
                color: 'white', 
                fontSize: '60px',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
              }}
              >
              EDUCATIONAL TOUR
            </MDBTypography>
        
            <MDBCard style={{ borderRadius: '15px', padding: '20px', backgroundColor: '#fff', marginTop: '10px', marginBottom: '10px' }}>
              <MDBRow>
                {educs.map((educ) => (
                  <MDBCol md="6" lg="4" className="mb-4 align-items-center" key={educ._id} style={{ position: 'relative' }}>
                    <div
                      onClick={() => navigate(`/educ/${educ._id}`, { state: { email: user?.email } })}
                      style={{ cursor: 'pointer', position: 'relative' }}
                    >
                      <MDBCardImage
                        src={getImageForEduc(educ.pics)}
                        alt={educ.name}
                        style={{ height: '350px', width: '100%', objectFit: 'cover', objectPosition: 'center', marginBottom: '-20px' }}
                      />
                      {/* Text overlay */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-10px',
                        left: '10px',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '35px',
                        fontWeight: 'bolder', 
                        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' 
                      }}>
                        PACKAGE {educ.num}
                      </div>
                    </div>
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBCard>


        </>
        )}

        {/* Add more content for other new tabs like Employment, Tour Packages, Insurance, etc. */}
      </MDBContainer>

            {/* Footer Section */}
            <MDBFooter bgColor="light" className="text-start text-lg-left mt-auto">
        <div className="container text-left text-md-left">
            <div className="row mt-2 mb-2">
            {/* Column 1 */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h5 className="text-uppercase mb-4 font-weight-bold" style={{fontWeight: 'bold'}}>FOLLOW US</h5>
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
                <h6 className="mt-4 text-uppercase mb-2 font-weight-bold ms-4">ABOUT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4">CONTACT US</h6>
                <h6 className="text-uppercase mb-2 font-weight-bold ms-4" onClick={() => navigate('/faq', { state: { email: user.email }})}>FAQS</h6>
            </div>
    </div>
  </div>

</MDBFooter>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Services;
