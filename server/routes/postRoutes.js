const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

// Get all posts (public route)
router.get('/', async (req, res) => {
    try {
        // Log the request headers for debugging
        console.log('Request headers:', {
            origin: req.headers.origin,
            method: req.method
        });

        const posts = await Post.find().sort({ date: -1 });
        if (!posts) {
            return res.status(404).json({ message: 'No posts found' });
        }

        // Set explicit CORS headers
        res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');

        console.log('Posts retrieved successfully:', posts.length);
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', {
            error: err.message,
            stack: err.stack
        });
        res.status(500).json({ 
            message: 'Error fetching posts',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// Get a specific post (public route)
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            { $inc: { views: 1 } },
            { new: true }
        );
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a post (protected route)
router.post('/', authMiddleware, async (req, res) => {
    const newPost = new Post(req.body);
    try {
        await newPost.save(); 
        res.status(201).json(newPost); 
    } catch (err) {
        // Return detailed validation error message
        res.status(400).json({ message: 'Validation error', error: err.message });
        console.error("Validation error:", err.message); // Log detailed error to the console
    }
});

module.exports = router;
