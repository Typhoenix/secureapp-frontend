import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7117',
  timeout: 5000, // Timeout duration in milliseconds
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    // If the token is available, set the authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
