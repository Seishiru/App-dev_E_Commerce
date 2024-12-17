const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');
const { getAddressesByUserId } = require('../db'); // Import the function from db.js

// Route to fetch addresses for a specific user
router.get('/:user_id/addresses', authenticateToken, getAddressesByUserId);

module.exports = router;
