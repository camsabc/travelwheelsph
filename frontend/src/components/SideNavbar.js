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

function SideNavbar({ setCurrentContent, currentContent }) {
  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
  const [isContentManagementOpen, setIsContentManagementOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item === 'Logout') {
      navigate('/');
    } else if (item === 'User Account Management') {
      setIsUserAccountOpen(!isUserAccountOpen);
    } else if (item === 'Content Management') {
      setIsContentManagementOpen(!isContentManagementOpen);
    } else {
      setIsUserAccountOpen(false);
      setIsContentManagementOpen(false);
      setCurrentContent(item);
    }
  };

  return (
    <MDBListGroup className="flex-column" style={{ width: '200px', backgroundColor: '#fff', flexShrink: 0 }}>
      {Object.keys(iconMapping).map((item) => (
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

            {/* Triangle indicator for User Account Management */}
            {item === 'User Account Management' && (
              <div
                style={{
                  marginLeft: '0px',
                  transform: isUserAccountOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Toggle triangle direction
                  transition: 'transform 0.3s ease',
                  width: '0',
                  height: '0',
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '6px solid #ffa500', // Color of the triangle
                }}
              />
            )}

            {/* Triangle indicator for Content Management */}
            {item === 'Content Management' && (
              <div
                style={{
                  marginLeft: '0px',
                  transform: isContentManagementOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Toggle triangle direction
                  transition: 'transform 0.3s ease',
                  width: '0',
                  height: '0',
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '6px solid #ffa500', // Color of the triangle
                }}
              />
            )}
          </MDBListGroupItem>

          {/* Submenu for User Account */}
          {isUserAccountOpen && item === 'User Account Management' && (
            <>
              <MDBListGroupItem
                action
                onClick={() => setCurrentContent('User Account')}
                style={{
                  color: currentContent === 'User Account' ? '#fff' : '#ffa500',
                  fontWeight: currentContent === 'User Account' ? 'bold' : 'normal',
                  backgroundColor: currentContent === 'User Account' ? '#ffa500' : '#fff',
                  paddingLeft: '40px', // Indentation for submenu
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
              <MDBListGroupItem
                action
                onClick={() => setCurrentContent('Employee Account')}
                style={{
                  color: currentContent === 'Employee Account' ? '#fff' : '#ffa500',
                  fontWeight: currentContent === 'Employee Account' ? 'bold' : 'normal',
                  backgroundColor: currentContent === 'Employee Account' ? '#ffa500' : '#fff',
                  paddingLeft: '40px', // Indentation for submenu
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
            </>
          )}

          {/* Submenu for Content Management */}
          {isContentManagementOpen && item === 'Content Management' && (
            <>
              <MDBListGroupItem
                action
                onClick={() => setCurrentContent('Blog Management')}
                style={{
                  color: currentContent === 'Blog Management' ? '#fff' : '#ffa500',
                  fontWeight: currentContent === 'Blog Management' ? 'bold' : 'normal',
                  backgroundColor: currentContent === 'Blog Management' ? '#ffa500' : '#fff',
                  paddingLeft: '40px', // Indentation for submenu
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: '10px',
                }}
              >
                <MDBIcon
                  size="lg"
                  style={{ color: currentContent === 'Blog Management' ? '#fff' : '#ffa500' }}
                />
                <span>Blog Management</span>
              </MDBListGroupItem>
              <MDBListGroupItem
                action
                onClick={() => setCurrentContent('Media Management')}
                style={{
                  color: currentContent === 'Media Management' ? '#fff' : '#ffa500',
                  fontWeight: currentContent === 'Media Management' ? 'bold' : 'normal',
                  backgroundColor: currentContent === 'Media Management' ? '#ffa500' : '#fff',
                  paddingLeft: '40px', // Indentation for submenu
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: '10px',
                }}
              >
                <MDBIcon
                  size="lg"
                  style={{ color: currentContent === 'Media Management' ? '#fff' : '#ffa500' }}
                />
                <span>Media Management</span>
              </MDBListGroupItem>
            </>
          )}
        </div>
      ))}
    </MDBListGroup>
  );
}

export default SideNavbar;
