const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Update = mongoose.model('Update', updateSchema);
module.exports = Update;