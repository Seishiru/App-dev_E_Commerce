const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// A protected route
router.get('/profile', authenticateToken, (req, res) => {
  // Access the authenticated user's information from req.user
  res.json({ message: 'User profile accessed', user: req.user });
});

// A public route
router.get('/public-info', (req, res) => {
  res.json({ message: 'This is public information' });
});

module.exports = router;
