const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const jwtUtils = require('../config/jwtUtils'); // Import the JWT utility
const db = require('../db'); // Assuming a database connection is imported
const router = express.Router();

// A protected route to get the user's profile
router.get('/profile', authenticateToken, (req, res) => {
  const { user_id, name, role, email } = req.user;
  res.json({
    message: 'User profile accessed',
    user: { user_id, name, role, email },
  });
});

// A route to update user profile (username, email, contact number)
router.put('/profile', authenticateToken, (req, res) => {
  const { username, email, contact_number } = req.body;
  const userId = req.user.user_id; // Use `user_id` from token payload

  if (!username || !email || !contact_number) {
    return res.status(400).json({
      error: "Username, email, and contact number are required",
    });
  }

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

// A route to get user addresses
router.get('/:userId/addresses', authenticateToken, (req, res) => {
  const { userId } = req.params;

  // Validate if userId matches the authenticated user's ID
  if (parseInt(userId) !== req.user.user_id) {
    return res.status(403).json({ error: "Access forbidden" });
  }

  const query = 'SELECT * FROM addresses WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching addresses:', err);
      return res.status(500).json({ error: 'Error fetching addresses', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No addresses found for this user' });
    }

    return res.json({ addresses: results });
  });
});

// A route to add a new address
router.post('/:userId/addresses', authenticateToken, (req, res) => {
  const { userId } = req.params;
  const { receiver, address, phoneNumber, type } = req.body;

  // Validate if userId matches the authenticated user's ID
  if (parseInt(userId) !== req.user.user_id) {
    return res.status(403).json({ error: "Access forbidden" });
  }

  if (!receiver || !address || !phoneNumber) {
    return res.status(400).json({ error: "Receiver, address, and phone number are required" });
  }

  const query = `INSERT INTO addresses (user_id, receiver, address, phone_number, address_type) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [userId, receiver, address, phoneNumber, type], (err, result) => {
    if (err) {
      console.error('Error adding address:', err);
      return res.status(500).json({ error: 'Failed to add address', details: err });
    }

    res.status(201).json({
      message: 'Address added successfully',
      newAddress: {
        id: result.insertId,
        user_id: userId,
        receiver,
        address,
        phone_number: phoneNumber,
        address_type: type,
      }
    });
  });
});

// A route to delete a user address
router.delete('/:userId/addresses/:addressId', authenticateToken, (req, res) => {
  const { userId, addressId } = req.params;

  // Validate if userId matches the authenticated user's ID
  if (parseInt(userId) !== req.user.user_id) {
    return res.status(403).json({ error: "Access forbidden" });
  }

  const query = 'DELETE FROM addresses WHERE id = ? AND user_id = ?';
  db.query(query, [addressId, userId], (err, results) => {
    if (err) {
      console.error('Error deleting address:', err);
      return res.status(500).json({ error: 'Error deleting address', details: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Address not found or doesn’t belong to the user' });
    }

    return res.json({ message: 'Address deleted successfully' });
  });
});

// A public route
router.get('/public-info', (req, res) => {
  res.json({ message: 'This is public information' });
});

module.exports = router;
