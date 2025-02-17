const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        fr: { type: String, required: true },
        ja: { type: String, required: true },
        eo: { type: String, required: true },
        es: { type: String, required: true }
    },
    content: {
        en: { type: String, required: true },
        fr: { type: String, required: true },
        ja: { type: String, required: true },
        eo: { type: String, required: true },
        es: { type: String, required: true }
    },
    author: { type: String, required: true },
    tags: [{ type: String }],
    imageURL: { type: String },
    date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
