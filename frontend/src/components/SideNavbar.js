import React, { useState } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const iconMapping = {
  'Dashboard': 'tachometer-alt',
  'Booking Management': 'calendar-check',
  'User Account Management': 'users',
  'Content Management': 'file-alt',
  'Quotation Management': 'comment-dollar',
  'Inquiry Management': 'file-invoice',
  'Logout': 'sign-out-alt'
};

function SideNavbar({ setCurrentContent, currentContent, sections = [] }) {
  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
  const [isContentManagementOpen, setIsContentManagementOpen] = useState(false);
  const navigate = useNavigate();

  // Helper to check if the main item should be rendered based on allowed sections.
  // For items with submenus, we expect the sections prop to contain both the parent and submenu items.
  const canView = (item) => sections.includes(item);

  const handleItemClick = (item) => {
    if (item === 'Logout') {
      navigate('/');
    } else if (item === 'User Account Management') {
      setIsUserAccountOpen(!isUserAccountOpen);
    } else if (item === 'Content Management') {
      setIsContentManagementOpen(!isContentManagementOpen);
    } else {
      // Close submenus on a normal item click
      setIsUserAccountOpen(false);
      setIsContentManagementOpen(false);
      setCurrentContent(item);
    }
  };

  return (
    <MDBListGroup className="flex-column" style={{ width: '200px', backgroundColor: '#fff', flexShrink: 0 }}>
      {Object.keys(iconMapping).map((item) => {
        // Skip the item if not allowed (with one exception: if it is a submenu, we’ll check separately)
        if (!canView(item)) return null;
        return (
          <div key={item}>
            <MDBListGroupItem
              action
              onClick={() => handleItemClick(item)}
              style={{
                color: currentContent === item ? '#fff' : '#ffa500',
                fontWeight: currentContent === item ? 'bold' : 'normal',
                backgroundColor: currentContent === item ? '#ffa500' : '#fff',
                borderBottom: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '7px 20px',
                gap: '10px',
              }}
            >
              <MDBIcon
                icon={iconMapping[item]}
                size="lg"
                style={{ color: currentContent === item ? '#fff' : '#ffa500', width: '24px' }}
              />
              <span style={{ flex: 1, textAlign: 'center' }}>{item}</span>

              {/* Triangle indicator for items with submenus */}
              {item === 'User Account Management' && (
                <div
                  style={{
                    marginLeft: '0px',
                    transform: isUserAccountOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    width: '0',
                    height: '0',
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid #ffa500',
                  }}
                />
              )}
              {item === 'Content Management' && (
                <div
                  style={{
                    marginLeft: '0px',
                    transform: isContentManagementOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    width: '0',
                    height: '0',
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid #ffa500',
                  }}
                />
              )}
            </MDBListGroupItem>

            {/* Submenu for User Account Management */}
            {isUserAccountOpen && item === 'User Account Management' && (
              <>
                {sections.includes('User Account') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('User Account')}
                    style={{
                      color: currentContent === 'User Account' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'User Account' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'User Account' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'User Account' ? '#fff' : '#ffa500' }}
                    />
                    <span>User Account</span>
                  </MDBListGroupItem>
                )}
                {sections.includes('Employee Account') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Employee Account')}
                    style={{
                      color: currentContent === 'Employee Account' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Employee Account' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Employee Account' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Employee Account' ? '#fff' : '#ffa500' }}
                    />
                    <span>Employee Account</span>
                  </MDBListGroupItem>
                )}
              </>
            )}

            {/* Submenu for Content Management */}
            {isContentManagementOpen && item === 'Content Management' && (
              <>
                {sections.includes('Homepage') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Homepage')}
                    style={{
                      color: currentContent === 'Homepage' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Homepage' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Homepage' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Homepage' ? '#fff' : '#ffa500' }}
                    />
                    <span>Homepage</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Tour Package') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Tour Package')}
                    style={{
                      color: currentContent === 'Tour Package' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Tour Package' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Tour Package' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Tour Package' ? '#fff' : '#ffa500' }}
                    />
                    <span>Tour Package</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Promo') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Promo')}
                    style={{
                      color: currentContent === 'Promo' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Promo' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Promo' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Promo' ? '#fff' : '#ffa500' }}
                    />
                    <span>Promo</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('FAQ') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('FAQ')}
                    style={{
                      color: currentContent === 'FAQ' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'FAQ' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'FAQ' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'FAQ' ? '#fff' : '#ffa500' }}
                    />
                    <span>FAQ</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Hotel Booking') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Hotel Booking')}
                    style={{
                      color: currentContent === 'Hotel Booking' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Hotel Booking' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Hotel Booking' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Hotel Booking' ? '#fff' : '#ffa500' }}
                    />
                    <span>Hotel Booking</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Car Rental') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Car Rental')}
                    style={{
                      color: currentContent === 'Car Rental' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Car Rental' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Car Rental' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Car Rental' ? '#fff' : '#ffa500' }}
                    />
                    <span>Car Rental</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('About Us') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('About Us')}
                    style={{
                      color: currentContent === 'About Us' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'About Us' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'About Us' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'About Us' ? '#fff' : '#ffa500' }}
                    />
                    <span>About Us</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Contact Us') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Contact Us')}
                    style={{
                      color: currentContent === 'Contact Us' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Contact Us' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Contact Us' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Contact Us' ? '#fff' : '#ffa500' }}
                    />
                    <span>Contact Us</span>
                  </MDBListGroupItem>
                )}

                
                {sections.includes('Edit Profile') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Edit Profile')}
                    style={{
                      color: currentContent === 'Edit Profile' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Edit Profile' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Edit Profile'? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Edit Profile' ? '#fff' : '#ffa500' }}
                    />
                    <span>Edit Profile</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Payment') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Payment')}
                    style={{
                      color: currentContent === 'Payment' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Payment' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Payment' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Payment' ? '#fff' : '#ffa500' }}
                    />
                    <span>Payment</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Thank You') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Thank You')}
                    style={{
                      color: currentContent === 'Thank You' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Thank You' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Thank You' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Thank You' ? '#fff' : '#ffa500' }}
                    />
                    <span>Thank You Page</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Flights') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Flights')}
                    style={{
                      color: currentContent === 'Flights' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Flights' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Flights' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Flights' ? '#fff' : '#ffa500' }}
                    />
                    <span>Flights</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Passport') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Passport')}
                    style={{
                      color: currentContent === 'Passport' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Passport' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Passport' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Passport' ? '#fff' : '#ffa500' }}
                    />
                    <span>Passport Assistance</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('MICE') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('MICE')}
                    style={{
                      color: currentContent === 'MICE' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'MICE' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'MICE' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'MICE' ? '#fff' : '#ffa500' }}
                    />
                    <span>MICE</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('VISA') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('VISA')}
                    style={{
                      color: currentContent === 'VISA' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'VISA' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'VISA' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'VISA' ? '#fff' : '#ffa500' }}
                    />
                    <span>VISA</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Insurance') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Insurance')}
                    style={{
                      color: currentContent === 'Insurance' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Insurance' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Insurance' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Payment' ? '#fff' : '#ffa500' }}
                    />
                    <span>Travel Insurance</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Educ') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Educ')}
                    style={{
                      color: currentContent === 'Educ' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Educ' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Educ' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Educ' ? '#fff' : '#ffa500' }}
                    />
                    <span>Educactional Tour</span>
                  </MDBListGroupItem>
                )}


                {sections.includes('Transfers') && (
                  <MDBListGroupItem
                    action
                    onClick={() => setCurrentContent('Transfers')}
                    style={{
                      color: currentContent === 'Transfers' ? '#fff' : '#ffa500',
                      fontWeight: currentContent === 'Transfers' ? 'bold' : 'normal',
                      backgroundColor: currentContent === 'Transfers' ? '#ffa500' : '#fff',
                      paddingLeft: '40px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MDBIcon
                      size="lg"
                      style={{ color: currentContent === 'Transfers' ? '#fff' : '#ffa500' }}
                    />
                    <span>Transfers</span>
                  </MDBListGroupItem>
                )}

              </>
            )}
          </div>
        );
      })}
    </MDBListGroup>
  );
}

export default SideNavbar;
