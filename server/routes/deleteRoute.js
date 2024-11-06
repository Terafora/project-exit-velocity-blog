const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

router.delete('/:postId', authMiddleware, async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);
        res.json({ message: 'Post deleted', deletedPost });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
