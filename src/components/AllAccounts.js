import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles.css';

const AllAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/auth/accounts`);
        setAccounts(response.data);
      } catch (error) {
        setErrorMessage(error.response ? error.response.data : error.message);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="all-accounts-container">
      <h2 className="all-accounts-heading">All Accounts</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ul>
        {accounts.map(account => (
          <li key={account.id} className="account-item">
            <span className="account-id">Account ID: {account.id}</span>, <span className="account-type">Account Type: {account.accountType}</span>
          </li>
        ))}
      </ul>
      <Link to="/dashboard" className="go-back-link">Go back to Dashboard</Link>
    </div>
  );
};

export default AllAccounts;
