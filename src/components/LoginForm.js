import React, { useState } from 'react';
import axios from '../axiosConfig'; 
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsLoggedIn(true);
        setSuccessMessage('Login successful');
        navigate(location.state?.from ? location.state.from.pathname : '/dashboard');
      } else {
        setErrors({ login: 'Invalid response from server' });
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setErrors({ login: 'Invalid email or password' });
        } else {
          setErrors({ login: 'Failed to login. Please try again later.' });
        }
      } else {
        setErrors({ login: 'Network error. Please check your internet connection.' });
      }
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.login && <p className="error-message">{errors.login}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
