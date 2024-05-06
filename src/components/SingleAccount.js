import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SingleAccount.css';

const SingleAccount = () => {
  const [accountId, setAccountId] = useState('');
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setAccountId(e.target.value); // Update the accountId state with the input value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/auth/account/${accountId}`);
      setAccount(response.data);
      setErrorMessage('');
    } catch (error) {
      setAccount(null);
      setErrorMessage(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="single-account-container">
      <h2>Account Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="accountId">Enter Account ID:</label>
        <input type="text" id="accountId" value={accountId} onChange={handleChange} />
        <button type="submit">Get Account</button>
      </form>
      {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
      {account && (
        <div>
          <p>Account ID: {account.id}</p>
          <p>Account Type: {account.accountType}</p>
        </div>
      )}
      <Link to="/dashboard">Go back to Dashboard</Link>
    </div>
  );
};

export default SingleAccount;
