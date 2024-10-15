const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).res.json({ message: err });
    }
});

module.exports = router;