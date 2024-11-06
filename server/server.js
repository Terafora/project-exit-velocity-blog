const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const postRoutes = require('./routes/postRoutes');
const updateRoutes = require('./routes/updateRoutes');
const authRoutes = require('./routes/authRoutes');
const deleteRoutes = require('./routes/deleteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/updates', updateRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/delete', deleteRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
