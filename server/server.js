const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('Yay! Connected to MongoDB Atlas successfully!'))
    .catch(err => console.error('Uh-oh, there was an issue connecting to MongoDB Atlas: ', err));

// Double-checking if the Mongo URI is being read correctly
console.log('Using Mongo URI:', process.env.MONGO_URI);

// Routes
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
