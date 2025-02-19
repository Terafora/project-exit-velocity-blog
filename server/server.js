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
    origin: function (origin, callback) {
        const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:3000'];
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 3600 // Cache preflight request for 1 hour
};

// Enable CORS with configuration
app.use(cors(corsOptions));

// Handle CORS errors
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        console.error('CORS Error:', {
            origin: req.headers.origin,
            method: req.method,
            path: req.path
        });
        res.status(403).json({
            message: 'CORS Error: Origin not allowed',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    } else {
        console.error('Server Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// Add OPTIONS handling for preflight requests
app.options('*', cors(corsOptions));

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
