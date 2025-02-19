const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

// Get all posts (public route)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        
        if (!posts || posts.length === 0) {
            console.log('No posts found in database');
            return res.status(404).json({ message: 'No posts found' });
        }

        console.log(`Successfully retrieved ${posts.length} posts`);
        res.json(posts);
    } catch (err) {
        console.error('Database error when fetching posts:', err);
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
