import axios from 'axios';

// Create axios instance with base URL from environment variable
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '',  // Falls back to relative path for development
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for debugging
api.interceptors.response.use(
    response => {
        console.log('API Response:', {
            url: response.config.url,
            method: response.config.method,
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
            response: error.response?.data
        });
        return Promise.reject(error);
    }
);

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
