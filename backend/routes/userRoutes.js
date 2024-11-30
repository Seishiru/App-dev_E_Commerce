// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Example route for getting user profile
router.get('/:userId', (req, res) => {
  res.send(`User profile for ID: ${req.params.userId}`);
});

module.exports = router;
