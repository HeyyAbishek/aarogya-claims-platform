import axios from 'axios';

// Fallback to localhost:5000 if the environment variable is missing
const baseURL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5000';

const instance = axios.create({
  baseURL: baseURL,
});

// Automatically attach the JWT token if it exists in localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;