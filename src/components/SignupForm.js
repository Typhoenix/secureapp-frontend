// SignupForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';
import './SignupForm.css'; // Import the CSS file

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, formData);
      if (response && response.status === 200) {
        setSuccessMessage('Signup successful. You can now login.');
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        console.error('Signup failed: Response data is invalid');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Signup failed:', error.response.data);
        setErrors({ serverError: error.response.data.message || 'An error occurred. Please try again.' });
      } else {
        console.error('Signup failed:', error.message);
        setErrors({ serverError: 'An error occurred. Please try again later.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {successMessage && <p className="success">{successMessage}</p>}
        {errors.serverError && <p className="error">{errors.serverError}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Sign Up'}
          </button>
        </div>
        <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
};

export default SignupForm;
