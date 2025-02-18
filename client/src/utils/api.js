import axios from 'axios';

// Create axios instance with base URL from environment variable
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || ''  // Falls back to relative path for development
});

// Add auth token to requests if available
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: token
        };
    }
    return config;
});

export default api;
