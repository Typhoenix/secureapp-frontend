// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = ({ isLoggedIn, userName }) => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-header">Welcome to My App</h1>
      {isLoggedIn ? (
        <div>
          <p className="welcome-text">Welcome, {userName}!</p>
          <p className="welcome-text">Go to your <Link to="/dashboard">Dashboard</Link></p>
        </div>
      ) : (
        <div>
          <p className="welcome-text">Please <Link to="/login">login</Link> to access your dashboard.</p>
          <p className="welcome-text">Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      )}
    </div>
  );
};

export default Home;
