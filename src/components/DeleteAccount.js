import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './DeleteAccount.css'; // Import the CSS file for styling

const DeleteAccount = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { accountId: initialAccountId } = useParams();
  const [accountId, setAccountId] = useState(initialAccountId);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/auth/delete-account/${accountId}`);
      setSuccessMessage('Account deleted successfully');
      setErrorMessage(''); // Clear any previous error message if deletion is successful
      setAccountId(''); // Clear the accountId input field
    } catch (error) {
      setSuccessMessage(''); // Clear success message
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage('Account not found. Please enter a valid account ID.');
        } else {
          setErrorMessage('An error occurred while deleting the account. Please try again later.');
        }
      } else {
        setErrorMessage('Network error. Please check your internet connection and try again.');
      }
    }
  };

  const handleChange = (e) => {
    setAccountId(e.target.value);
  };

  return (
    <div className="delete-account-container">
      <h2 className="delete-account-heading">Delete Account</h2>
      <label htmlFor="accountId" className="account-id-label">Account ID:</label>
      <input
        type="text"
        id="accountId"
        value={accountId}
        onChange={handleChange}
        className="account-id-input"
      />
      <button onClick={handleDelete} className="delete-account-button">Delete Account</button>
      {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
      {successMessage && <p className="success-message">Success: {successMessage}</p>}
      <Link to="/dashboard" className="dashboard-link">Go back to Dashboard</Link>
    </div>
  );
};

export default DeleteAccount;
