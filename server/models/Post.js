const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        fr: { type: String, required: true },
        ja: { type: String, required: true },
        eo: { type: String, required: true }
    },
    content: {
        en: { type: String, required: true },
        fr: { type: String, required: true },
        ja: { type: String, required: true },
        eo: { type: String, required: true }
    },
    date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
