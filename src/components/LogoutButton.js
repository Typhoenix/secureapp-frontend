// LogoutButton.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout function passed as a prop
      await onLogout();
      // Set the logout message
      setLogoutMessage('Successfully logged out');
      // Redirect to the home page after a delay
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Logout failed:', error.message);
      // Handle logout failure, display error message, etc.
    }
  };

  return (
    <div>
      {logoutMessage && <p>{logoutMessage}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
