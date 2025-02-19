import axios from 'axios';

// Get base URL from environment variables
const getBaseUrl = () => {
    const url = process.env.REACT_APP_API_URL;
    if (!url) {
        console.warn('REACT_APP_API_URL is not set');
        return '';
    }
    return url.replace(/\/$/, ''); // Remove trailing slash if present
};

// Create axios instance
const api = axios.create({
    baseURL: getBaseUrl(),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Important for CORS with credentials
});

// Request interceptor
api.interceptors.request.use(
    config => {
        // Log request details in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Request:', {
                url: config.url,
                method: config.method,
                baseURL: config.baseURL,
                headers: config.headers
            });
        }

        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: token
            };
        }

        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    response => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Response:', {
                url: response.config.url,
                method: response.config.method,
                status: response.status,
                data: response.data
            });
        }
        return response;
    },
    error => {
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            console.error('Server Error:', {
                url: error.config?.url,
                method: error.config?.method,
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            // Request made but no response received
            console.error('Network Error:', {
                url: error.config?.url,
                method: error.config?.method,
                message: error.message
            });
        } else {
            // Error in request configuration
            console.error('Request Config Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
