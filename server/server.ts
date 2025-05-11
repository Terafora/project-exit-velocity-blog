import express, { Request, Response, NextFunction, Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/postRoutes';
import updateRoutes from './routes/updateRoutes';
import authRoutes from './routes/authRoutes';
import deleteRoute from './routes/deleteRoute';

// Initialize environment variables
dotenv.config();

const app: Application = express();

// Define Error interface
interface ErrorWithStatus extends Error {
  status?: number;
}

// CORS configuration
const corsOptions = {
  origin: function(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
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

// Define error handler middleware
const errorHandler = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction): void => {
  // Log detailed error information
  console.error('Server Error:', {
    message: err.message,
    path: req.path,
    origin: req.headers.origin,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Handle CORS errors specifically
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({
      message: 'CORS Error: Origin not allowed',
      origin: req.headers.origin
    });
    return;
  }

  // Handle other errors
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

// Global error handler
app.use(errorHandler);

// Middleware to parse JSON request bodies
app.use(express.json());

// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/updates', updateRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/delete', deleteRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
