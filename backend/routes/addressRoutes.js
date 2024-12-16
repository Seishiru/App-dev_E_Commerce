const express = require('express');
const router = express.Router();
const pool = require('../db'); // Database connection
const jwtUtils = require('../config/jwtUtils'); // JWT utility

// Utility function for handling errors
const handleError = (res, errorMessage, statusCode = 500) => {
  return res.status(statusCode).json({ error: errorMessage });
};

// Middleware to authenticate the user via JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(403).json({ error: 'Access denied. No token provided.' });

  const decoded = jwtUtils.verifyToken(token);
  if (!decoded) return res.status(403).json({ error: 'Invalid token.' });

  req.user = decoded; // Attaching the user data to the request object
  next();
};

// Get all addresses for a specific user
router.get('/:user_id/addresses', authenticateToken, async (req, res) => {
  const user_id = req.params.user_id;

  if (user_id !== req.user.id) {
    return res.status(403).json({ error: 'You are not authorized to access these addresses' });
  }

  try {
    const [results] = await pool.promise().query('SELECT * FROM addresses WHERE user_id = ?', [user_id]);

    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching addresses:', err);
    return handleError(res, 'Error fetching addresses');
  }
});

// Add a new address
router.post('/:user_id/addresses', authenticateToken, async (req, res) => {
  const user_id = req.params.user_id;

  if (user_id !== req.user.id) {
    return res.status(403).json({ error: 'You are not authorized to add an address' });
  }

  const { receiver, address, phoneNumber, type } = req.body;

  if (!receiver || !address || !phoneNumber || !type) {
    return res.status(400).json({ error: 'All address fields are required' });
  }

  try {
    const [result] = await pool.promise().query(
      'INSERT INTO addresses (user_id, receiver, address, phoneNumber, type) VALUES (?, ?, ?, ?, ?)',
      [user_id, receiver, address, phoneNumber, type]
    );

    res.status(201).json({
      message: 'Address added successfully',
      newAddress: { id: result.insertId, receiver, address, phoneNumber, type }
    });
  } catch (err) {
    console.error('Error adding address:', err);
    return handleError(res, 'Failed to add address');
  }
});

// Delete an address
router.delete('/:user_id/addresses/:addressId', authenticateToken, async (req, res) => {
  const user_id = req.params.user_id;
  const addressId = req.params.addressId;

  if (user_id !== req.user.id) {
    return res.status(403).json({ error: 'You are not authorized to delete this address' });
  }

  try {
    const [results] = await pool.promise().query('SELECT * FROM addresses WHERE id = ? AND user_id = ?', [addressId, user_id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await pool.promise().query('DELETE FROM addresses WHERE id = ?', [addressId]);

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (err) {
    console.error('Error deleting address:', err);
    return handleError(res, 'Failed to delete address');
  }
});

module.exports = router;
