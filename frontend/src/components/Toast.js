import React, { useState, useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Hide the toast after 3 seconds
    }, 3000);

    // Call onClose after hiding transition completes
    const hideTransitionTimer = setTimeout(onClose, 3500); // Wait a bit longer than hide duration

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTransitionTimer);
    };
  }, [onClose]);

  const toastStyles = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: type === 'success' ? '#28a745' : '#dc3545', // Success or error color
    color: 'white',
    padding: '15px 20px',
    borderRadius: '5px',
    zIndex: 9999,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(100px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  };

  return (
    <div style={toastStyles}>
      {message}
    </div>
  );
};

export default Toast;
