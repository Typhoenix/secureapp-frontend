import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_API_URL; // Accessing API base URL from environment variable

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
      if (!token) {
        setError('User is not authenticated');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token in the request headers
        }
      };

      const response = await axios.get(`${baseURL}/api/auth/profile`, config);
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error); // Log error for debugging
      setError(error.message);
    }
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch user profile on component mount

  return (
    <div>
      <h2>User Profile</h2>
      {error && <div>Error: {error}</div>}
      {userProfile && (
        <div>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          {/* Add more profile information as needed */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
