import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CreateAccountForm.css';

const CreateAccountForm = () => {
  const [accountType, setAccountType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/create-account`, {
        accountType: accountType
      });

      setSuccessMessage(response.data);
      setAccountType('');
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      // Check if the error response has a message
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred while creating the account');
      }
    }
  };

  return (
    <div className="create-account-container">
      <h2 className="title">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="create-account-form">
        <div className="form-group">
          <label htmlFor="accountType" className="label">Account Type:</label>
          <select
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="input"
            required
          >
            <option value="">Select Account Type</option>
            <option value="Savings Account">Savings Account</option>
            <option value="Current Account">Current Account</option>
            <option value="Corporate Account">Corporate Account</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="go-back-to-dashboard">
        <Link to="/dashboard" className="link">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default CreateAccountForm;
