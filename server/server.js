const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const postRoutes = require('./routes/postRoutes');
const updateRoutes = require('./routes/updateRoutes');
const authRoutes = require('./routes/authRoutes');
const deleteRoute = require('./routes/deleteRoute'); // Add this line

const app = express();

// CORS configuration
const corsOptions = {
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }

        // Remove trailing slash from origin for comparison
        const normalizedOrigin = origin.replace(/\/$/, '');
        
        // Get allowed origins
        const allowedOrigins = [
            process.env.CLIENT_URL?.replace(/\/$/, ''),
            'http://localhost:3000',
            'http://localhost:5000'
        ].filter(Boolean); // Remove any undefined values

        if (allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            console.error(`Blocked request from origin: ${origin}`);
            console.error('Allowed origins:', allowedOrigins);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle CORS preflight
app.options('*', cors(corsOptions));

// Global error handler
app.use((err, req, res, next) => {
    // Log detailed error information
    console.error('Server Error:', {
        message: err.message,
        path: req.path,
        origin: req.headers.origin,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    // Handle CORS errors specifically
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            message: 'CORS Error: Origin not allowed',
            origin: req.headers.origin
        });
    }

    // Handle other errors
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/updates', updateRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/delete', deleteRoute); // Add this line

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
