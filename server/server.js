const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const postRoutes = require('./routes/postRoutes');
const updateRoutes = require('./routes/updateRoutes');
const authRoutes = require('./routes/authRoutes');
const deleteRoute = require('./routes/deleteRoute'); // Add this line

const app = express();

// Enable CORS with specific configuration
app.use(cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
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
