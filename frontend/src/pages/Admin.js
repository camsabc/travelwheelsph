import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCardImage,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn
} from 'mdb-react-ui-kit';

import logo from '../images/header.jpg';
import SideNavbar from '../components/SideNavbar'; 
import BookingDetails from '../components/BookingDetails';
import InquiryDetails from '../components/InquiryDetails';
import UserDetails from '../components/UserDetails';

function Admin() {
  const location = useLocation();
  const { name } = location.state || {};
  const navigate = useNavigate(); 

  const [currentContent, setCurrentContent] = useState('Quotation Management');
  const [bookingFilter, setBookingFilter] = useState('All Bookings');
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/bookings/get-all-bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchQuotations = async () => {
      try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/quotations/get-all-quotations');
        const data = await response.json();
        setQuotations(data);
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };

    const fetchInquiries = async () => {
      try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/inquiries/get-all-inquiries');
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://travelwheelsph.onrender.com/api/users/get-all-users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (currentContent === 'Booking Management') {
      fetchBookings();
    } else if (currentContent === 'Quotation Management') {
      fetchQuotations();
    } else if (currentContent === 'Inquiry Management') {
      fetchInquiries();
    } else if (currentContent === 'User Account' || 'Employee Account') {
      fetchUsers();
    }
  }, [currentContent]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const filterBookings = (filter) => {
    switch (filter) {
      case 'Pending':
        return bookings.filter(booking => booking.status === 'Pending');
      case 'Awaiting Payment':
        return bookings.filter(booking => booking.status === 'Awaiting Payment');
      case 'Payment Sent':
        return bookings.filter(booking => booking.status === 'Payment Sent');
      case 'Payment Confirmed':
        return bookings.filter(booking => booking.status === 'Payment Confirmed');
      case 'Rejected':
        return bookings.filter(booking => booking.status === 'Rejected');
      default:
        return bookings;
    }
  };

  const filterQuotations = (filter) => {
    switch (filter) {
      case 'Pending':
        return quotations.filter(quotation => quotation.status === 'Pending');
      case 'Email Sent':
        return quotations.filter(quotation => quotation.status === 'Email Sent');
      default:
        return quotations;
    }
  };

  const filterInquiries = (filter) => {
    switch (filter) {
      case 'Pending':
        return inquiries.filter(inquiry => inquiry.status === 'Pending');
      case 'Replied':
        return inquiries.filter(inquiry => inquiry.status === 'Replied');
      default:
        return inquiries;
    }
  };

  const filterUsers = (filter) => {
    return users.filter(user => user.type === 'user');
  };

  const filterEmployees = (filter) => {
    return users.filter(user => user.type != 'user');
  };

  const renderBookingTable = () => (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#fff' }}>
      <h2 className="text-center h1 mb-4" style={{ fontWeight: 'bolder', color: 'rgb(255, 165, 0)' }}>BOOKING MANAGEMENT</h2>
      <div style={{ borderTop: '2px solid rgb(255, 165, 0)', width: '100%', marginBottom: '0', zIndex: '1' }}></div>

      <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none', width: '100%', padding: '0' }}>
        <MDBNavbarNav className="d-flex w-100" style={{ width: '100%', padding: '0' }}>
          {['All Bookings', 'Pending', 'Awaiting Payment', 'Payment Sent', 'Payment Confirmed', 'Rejected'].map(filter => (
            <MDBNavbarItem key={filter} className="flex-fill">
              <MDBNavbarLink
                active={bookingFilter === filter}
                onClick={() => setBookingFilter(filter)}
                style={{
                  backgroundColor: bookingFilter === filter ? 'rgb(255, 165, 0)' : 'transparent',
                  color: bookingFilter === filter ? '#fff' : '#000',
                  fontWeight: 'bold',
                  borderBottom: 'none',
                  borderRadius: '0',
                  textAlign: 'center',
                  padding: '10px 0',
                  display: 'block',
                  width: '100%',
                }}
              >
                {filter}
              </MDBNavbarLink>
            </MDBNavbarItem>
          ))}
        </MDBNavbarNav>
      </MDBNavbar>

      <div style={{ borderBottom: '2px solid rgb(255, 165, 0)', width: '100%', marginTop: '0', zIndex: '1' }}></div>

      <div className="mt-3 text-center">
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ fontWeight: 'bold' }}>Service Type</th>
                <th style={{ fontWeight: 'bold' }}>Booking #</th>
                <th style={{ fontWeight: 'bold' }}>Name</th>
                <th style={{ fontWeight: 'bold' }}>Date</th>
                <th style={{ fontWeight: 'bold' }}>Status</th>
                <th style={{ fontWeight: 'bold' }}></th>
              </tr>
            </thead>
            <tbody>
              {filterBookings(bookingFilter).length > 0 ? (
                filterBookings(bookingFilter).map((booking, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 'bold' }}>{booking.type}</td>
                    <td style={{ fontWeight: 'bold' }}>{booking.num}</td>
                    <td style={{ fontWeight: 'bold' }}>{`${booking.firstname} ${booking.middlename} ${booking.lastname}`}</td>
                    <td style={{ fontWeight: 'bold' }}>{`${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}`}</td>
                    <td style={{ fontWeight: 'bold' }}>{booking.status}</td>
                    <td>
                      <MDBBtn color="primary" size="sm" onClick={() => setSelectedBooking(booking)}>More Details</MDBBtn>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ fontWeight: 'bold' }}>No items to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderQuotationTable = () => (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#fff' }}>
      <h2 className="text-center h1 mb-4" style={{ fontWeight: 'bolder', color: 'rgb(255, 165, 0)' }}>QUOTATION MANAGEMENT</h2>
      <div style={{ borderTop: '2px solid rgb(255, 165, 0)', width: '100%', marginBottom: '0', zIndex: '1' }}></div>

      <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none', width: '100%', padding: '0' }}>
        <MDBNavbarNav className="d-flex w-100" style={{ width: '100%', padding: '0' }}>
          {['All Quotations', 'Pending', 'Email Sent'].map(filter => (
            <MDBNavbarItem key={filter} className="flex-fill">
              <MDBNavbarLink
                active={bookingFilter === filter}
                onClick={() => setBookingFilter(filter)}
                style={{
                  backgroundColor: bookingFilter === filter ? 'rgb(255, 165, 0)' : 'transparent',
                  color: bookingFilter === filter ? '#fff' : '#000',
                  fontWeight: 'bold',
                  borderBottom: 'none',
                  borderRadius: '0',
                  textAlign: 'center',
                  padding: '10px 0',
                  display: 'block',
                  width: '100%',
                }}
              >
                {filter}
              </MDBNavbarLink>
            </MDBNavbarItem>
          ))}
        </MDBNavbarNav>
      </MDBNavbar>

      <div style={{ borderBottom: '2px solid rgb(255, 165, 0)', width: '100%', marginTop: '0', zIndex: '1' }}></div>

      <div className="mt-3 text-center">
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ fontWeight: 'bold' }}>Service Type</th>
                <th style={{ fontWeight: 'bold' }}>Quotation #</th>
                <th style={{ fontWeight: 'bold' }}>Name</th>
                <th style={{ fontWeight: 'bold' }}>Date</th>
                <th style={{ fontWeight: 'bold' }}>Status</th>
                <th style={{ fontWeight: 'bold' }}></th>
              </tr>
            </thead>
            <tbody>
              {filterQuotations(bookingFilter).length > 0 ? (
                filterQuotations(bookingFilter).map((quotation, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 'bold' }}>{quotation.type}</td>
                    <td style={{ fontWeight: 'bold' }}>{quotation.num}</td>
                    <td style={{ fontWeight: 'bold' }}>{`${quotation.firstname} ${quotation.middlename} ${quotation.lastname}`}</td>
                    <td style={{ fontWeight: 'bold' }}>{formatDate(quotation.startDate)} - {formatDate(quotation.endDate)}</td>
                    <td style={{ fontWeight: 'bold' }}>{quotation.status}</td>
                    <td>
                      <MDBBtn color="primary" size="sm" onClick={() => setSelectedBooking(quotation)}>More Details</MDBBtn>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ fontWeight: 'bold' }}>No items to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInquiryTable = () => (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#fff' }}>
      <h2 className="text-center h1 mb-4" style={{ fontWeight: 'bolder', color: 'rgb(255, 165, 0)' }}>INQUIRY MANAGEMENT</h2>
      <div style={{ borderTop: '2px solid rgb(255, 165, 0)', width: '100%', marginBottom: '0', zIndex: '1' }}></div>

      <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none', width: '100%', padding: '0' }}>
        <MDBNavbarNav className="d-flex w-100" style={{ width: '100%', padding: '0' }}>
          {['All Inquiries', 'Pending', 'Replied'].map(filter => (
            <MDBNavbarItem key={filter} className="flex-fill">
              <MDBNavbarLink
                active={bookingFilter === filter}
                onClick={() => setBookingFilter(filter)}
                style={{
                  backgroundColor: bookingFilter === filter ? 'rgb(255, 165, 0)' : 'transparent',
                  color: bookingFilter === filter ? '#fff' : '#000',
                  fontWeight: 'bold',
                  borderBottom: 'none',
                  borderRadius: '0',
                  textAlign: 'center',
                  padding: '10px 0',
                  display: 'block',
                  width: '100%',
                }}
              >
                {filter}
              </MDBNavbarLink>
            </MDBNavbarItem>
          ))}
        </MDBNavbarNav>
      </MDBNavbar>

      <div style={{ borderBottom: '2px solid rgb(255, 165, 0)', width: '100%', marginTop: '0', zIndex: '1' }}></div>

      <div className="mt-3 text-center">
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ fontWeight: 'bold' }}>Email</th>
                <th style={{ fontWeight: 'bold' }}>Date</th>
                <th style={{ fontWeight: 'bold' }}>Message</th>
                <th style={{ fontWeight: 'bold' }}>Admin Note</th>
                <th style={{ fontWeight: 'bold' }}>Status</th>
                <th style={{ fontWeight: 'bold' }}></th>
              </tr>
            </thead>
            <tbody>
              {filterInquiries(bookingFilter).length > 0 ? (
                filterInquiries(bookingFilter).map((inquiry, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 'bold' }}>{inquiry.email}</td>
                    <td style={{ fontWeight: 'bold' }}>{inquiry.date}</td>
                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{inquiry.message}</td>
                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{inquiry.note}</td>
                    <td style={{ fontWeight: 'bold' }}>{inquiry.status}</td>
                    <td>
                      <MDBBtn color="primary" size="sm" onClick={() => setSelectedInquiry(inquiry)}>More Details</MDBBtn>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ fontWeight: 'bold' }}>No items to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


  const renderUserTable = () => (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#fff' }}>
      <h2 className="text-center h1 mb-4" style={{ fontWeight: 'bolder', color: 'rgb(255, 165, 0)' }}>USER ACCOUNT MANAGEMENT</h2>
      <div style={{ borderTop: '2px solid rgb(255, 165, 0)', width: '100%', marginBottom: '0', zIndex: '1' }}></div>

      <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none', width: '100%', padding: '0' }}>
        <MDBNavbarNav className="d-flex w-100" style={{ width: '100%', padding: '0' }}>
          {['All Users'].map(filter => (
            <MDBNavbarItem key={filter} className="flex-fill">
              <MDBNavbarLink
                active={bookingFilter === filter}
                onClick={() => setBookingFilter(filter)}
                style={{
                  backgroundColor: bookingFilter === filter ? 'rgb(255, 165, 0)' : 'transparent',
                  color: bookingFilter === filter ? '#fff' : '#000',
                  fontWeight: 'bold',
                  borderBottom: 'none',
                  borderRadius: '0',
                  textAlign: 'center',
                  padding: '10px 0',
                  display: 'block',
                  width: '100%',
                }}
              >
                {filter}
              </MDBNavbarLink>
            </MDBNavbarItem>
          ))}
        </MDBNavbarNav>
      </MDBNavbar>

      <div style={{ borderBottom: '2px solid rgb(255, 165, 0)', width: '100%', marginTop: '0', zIndex: '1' }}></div>

      <div className="mt-3 text-center">
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ fontWeight: 'bold' }}>Email</th>
                <th style={{ fontWeight: 'bold' }}>Full Name</th>
                <th style={{ fontWeight: 'bold' }}>Contact Number</th>
                <th style={{ fontWeight: 'bold' }}>Type</th>
                <th style={{ fontWeight: 'bold' }}></th>
              </tr>
            </thead>
            <tbody>
              {filterUsers(bookingFilter).length > 0 ? (
                filterUsers(bookingFilter).map((user, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 'bold' }}>{user.email}</td>
                    <td style={{ fontWeight: 'bold' }}>{`${user.firstname} ${user.lastname}`}</td>
                    <td style={{ fontWeight: 'bold' }}>{user.contactNumber}</td>
                    <td style={{ fontWeight: 'bold' }}>{user.type}</td>
                    <td>
                      <MDBBtn color="primary" size="sm" onClick={() => setSelectedUser(user)}>More Details</MDBBtn>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ fontWeight: 'bold' }}>No items to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEmployeeTable = () => (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#fff' }}>
      <h2 className="text-center h1 mb-4" style={{ fontWeight: 'bolder', color: 'rgb(255, 165, 0)' }}>USER ACCOUNT MANAGEMENT</h2>
      <div style={{ borderTop: '2px solid rgb(255, 165, 0)', width: '100%', marginBottom: '0', zIndex: '1' }}></div>

      <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none', width: '100%', padding: '0' }}>
        <MDBNavbarNav className="d-flex w-100" style={{ width: '100%', padding: '0' }}>
          {['All Users'].map(filter => (
            <MDBNavbarItem key={filter} className="flex-fill">
              <MDBNavbarLink
                active={bookingFilter === filter}
                onClick={() => setBookingFilter(filter)}
                style={{
                  backgroundColor: bookingFilter === filter ? 'rgb(255, 165, 0)' : 'transparent',
                  color: bookingFilter === filter ? '#fff' : '#000',
                  fontWeight: 'bold',
                  borderBottom: 'none',
                  borderRadius: '0',
                  textAlign: 'center',
                  padding: '10px 0',
                  display: 'block',
                  width: '100%',
                }}
              >
                {filter}
              </MDBNavbarLink>
            </MDBNavbarItem>
          ))}
        </MDBNavbarNav>
      </MDBNavbar>

      <div style={{ borderBottom: '2px solid rgb(255, 165, 0)', width: '100%', marginTop: '0', zIndex: '1' }}></div>

      <div className="mt-3 text-center">
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ fontWeight: 'bold' }}>Email</th>
                <th style={{ fontWeight: 'bold' }}>Full Name</th>
                <th style={{ fontWeight: 'bold' }}>Contact Number</th>
                <th style={{ fontWeight: 'bold' }}>Type</th>
                <th style={{ fontWeight: 'bold' }}></th>
              </tr>
            </thead>
            <tbody>
              {filterEmployees(bookingFilter).length > 0 ? (
                filterEmployees(bookingFilter).map((user, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 'bold' }}>{user.email}</td>
                    <td style={{ fontWeight: 'bold' }}>{`${user.firstname} ${user.lastname}`}</td>
                    <td style={{ fontWeight: 'bold' }}>{user.contactNumber}</td>
                    <td style={{ fontWeight: 'bold' }}>{user.type}</td>
                    <td>
                      <MDBBtn color="primary" size="sm" onClick={() => setSelectedUser(user)}>More Details</MDBBtn>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ fontWeight: 'bold' }}>No items to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedBooking) {
      return <BookingDetails booking={selectedBooking} onBack={() => setSelectedBooking(null)} />;
    }

    if (selectedInquiry) {
      return <InquiryDetails inquiry={selectedInquiry} onBack={() => setSelectedInquiry(null)} />;
    }

    if (selectedUser) {
      return <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />;
    }

    if (currentContent === 'Booking Management') {
      return renderBookingTable();
    } else if (currentContent === 'Quotation Management') {
      return renderQuotationTable();
    } else if (currentContent === 'Inquiry Management') {
      return renderInquiryTable();
    } else if (currentContent === 'User Account') {
      return renderUserTable();
    } else if (currentContent === 'Employee Account') {
      return renderEmployeeTable();
    } else {
      return <div className="text-center">Select an option from the menu</div>;
    }
  };

  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#fff' }}>
      {/* Header Section */}
      <div className="bg-white py-2 mb-1" style={{ flexShrink: 0, borderBottom: '2px solid rgb(240, 240, 240)' }}>
        <MDBContainer fluid className="d-flex align-items-center justify-content-between">
          <MDBCardImage
            src={logo}
            style={{ width: '200px', cursor: 'pointer' }}
            alt="Header Logo"
            onClick={() => navigate('/login')} 
          />
          <MDBNavbar expand="lg" light bgColor="white" style={{ boxShadow: 'none' }}>
            <MDBNavbarNav className="align-items-center">
              <span
                style={{
                  margin: '0 15px',
                  fontSize: '1rem',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                Hi, {name}
              </span>
            </MDBNavbarNav>
          </MDBNavbar>
        </MDBContainer>
      </div>

      {/* Main Content Section */}
      <div className="d-flex flex-grow-1 mt-3">
        {/* Side Navbar */}
        <SideNavbar setCurrentContent={setCurrentContent} />

        {/* Main Content */}
        <div className="flex-grow-1 d-flex flex-column p-3" style={{ backgroundColor: '#fff' }}>
          <div className="w-100 h-100" style={{ backgroundColor: '#fff' }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
