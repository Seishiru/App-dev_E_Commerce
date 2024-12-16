const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const db = require('../db'); // Assuming a database connection is imported
const router = express.Router();

// A protected route to get the user's profile
router.get('/profile', authenticateToken, (req, res) => {
  // Access the authenticated user's information from req.user (set by authenticateToken)
  res.json({ message: 'User profile accessed', user: req.user });
});

// A route to update user profile (username, email, contact number)
router.put('/profile', authenticateToken, (req, res) => {
  const { username, email, contact_number } = req.body;
  const userId = req.user.userId; // Assuming req.user contains userId from the token

  // Validate the incoming data
  if (!username || !email || !contact_number) {
    return res.status(400).json({
      error: "Username, email, and contact number are required"
    });
  }

  // SQL query to update user information
  const query = `UPDATE users SET username = ?, email = ?, contact_number = ? WHERE user_id = ?`;

  db.query(query, [username, email, contact_number, userId], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: "Failed to update profile" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: "Profile updated successfully" });
  });
});

// A public route
router.get('/public-info', (req, res) => {
  res.json({ message: 'This is public information' });
});

module.exports = router;
