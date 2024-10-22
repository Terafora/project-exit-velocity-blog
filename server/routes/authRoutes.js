const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if credentials match the admin details from .env
  if (username === process.env.ADMIN_USERNAME) {
    // Compare hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
    
    if (isMatch) {
      // Create a JWT token
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
