// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to protect routes
module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
