const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the MySQL connection pool
const jwtUtils = require('../config/jwtUtils'); // JWT utility

// Utility function for handling errors
const handleError = (res, errorMessage, statusCode = 500) => {
  return res.status(statusCode).json({ error: errorMessage });
};

// Middleware to authenticate the user via JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header
  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  const decoded = jwtUtils.verifyToken(token); // Decode token
  console.log('Decoded token:', decoded);  // Debug: print the decoded token
  if (!decoded) {
    console.log('Invalid token');
    return res.status(403).json({ error: 'Invalid token.' });
  }

  req.user = decoded; // Attach user data to request
  next();
};

// Get all addresses for a specific user
router.get('/:user_id/addresses', authenticateToken, async (req, res) => {
  const user_id = req.params.user_id;  // Get user_id from the URL parameter
  console.log('User ID from URL:', user_id);  // Debug: print the user_id from URL
  console.log('User ID from Token:', req.user.id);  // Debug: print the user_id from the decoded token

  // Validate that the user ID in the URL matches the user ID in the token
  if (parseInt(user_id) !== req.user.id) {
    console.log('Unauthorized access attempt by user:', req.user.id);
    return res.status(400).json({ error: 'You are not authorized to access these addresses' });
  }

  try {
    const [results] = await pool.promise().query('SELECT * FROM addresses WHERE user_id = ?', [user_id]);
    console.log('Addresses fetched:', results);  // Debug: print the fetched addresses
    res.status(200).json(results);  // Send the fetched addresses as response
  } catch (err) {
    console.error('Error fetching addresses:', err);
    return handleError(res, 'Error fetching addresses');  // Return error message
  }
});

// Add a new address
router.post('/:user_id/addresses', authenticateToken, async (req, res) => {
  const user_id = req.params.user_id;

  // Ensure the user is adding an address for themselves
  if (parseInt(user_id) !== req.user.id) {
    return res.status(403).json({ error: 'You are not authorized to add an address' });
  }

  const { receiver, address, phone_number, type } = req.body;

  // Basic validation for address fields
  if (!receiver || !address || !phone_number || !type) {
    return res.status(400).json({ error: 'All address fields are required' });
  }

  try {
    const [result] = await pool.promise().query(
      'INSERT INTO addresses (user_id, receiver, address, phone_number, address_type) VALUES (?, ?, ?, ?, ?)',
      [user_id, receiver, address, phone_number, type]
    );

    res.status(201).json({
      message: 'Address added successfully',
      newAddress: { id: result.insertId, receiver, address, phone_number, address_type: type }
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

  // Ensure the user is deleting their own address
  if (parseInt(user_id) !== req.user.id) {
    return res.status(403).json({ error: 'You are not authorized to delete this address' });
  }

  try {
    const [results] = await pool.promise().query('SELECT * FROM addresses WHERE id = ? AND user_id = ?', [addressId, user_id]);

    // If address not found, return a 404 error
    if (results.length === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }

    // Delete the address from the database
    await pool.promise().query('DELETE FROM addresses WHERE id = ?', [addressId]);

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (err) {
    console.error('Error deleting address:', err);
    return handleError(res, 'Failed to delete address');
  }
});

module.exports = router;
