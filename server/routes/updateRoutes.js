const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

router.patch('/:postId', authMiddleware, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
