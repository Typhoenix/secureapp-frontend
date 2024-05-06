import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import ChangePasswordForm from './components/ChangePasswordForm';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CreateAccountForm from './components/CreateAccountForm';
import './App.css';
import DeleteAccount from './components/DeleteAccount';
import SingleAccount from './components/SingleAccount'
import AllAccounts from './components/AllAccounts'
import UserProfile from './components/UserProfile';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUsername(decodedToken.username);
      }
    }
  }, []);

  const decodeToken = (token) => {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            {!isLoggedIn && (
              <>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li><Link to="/change-password">Change Password</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/userprofile">User Profile</Link></li> {/* Added User Profile link */}
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard username={username} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/change-password" element={isLoggedIn ? <ChangePasswordForm /> : <Navigate to="/login" />} />
          <Route path="/create-account" element={<CreateAccountForm />} />
          <Route path="/delete-account/:id" element={<DeleteAccount />} />
          <Route path="/account/:accountId" element={<SingleAccount />} />
          <Route path="/accounts" element={<AllAccounts />} />
          <Route path="/userprofile" element={<UserProfile username={username} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
