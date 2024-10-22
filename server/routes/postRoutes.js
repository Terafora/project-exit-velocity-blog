const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

// Get all posts (public route)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get a specific post (public route)
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create a post (protected route)
router.post('/', authMiddleware, async (req, res) => {
    const newPost = new Post(req.body);
    try {
        await newPost.save(); 
        res.status(201).json(newPost); 
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
