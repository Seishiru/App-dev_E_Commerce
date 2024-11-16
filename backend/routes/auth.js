const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Import the database connection
const router = express.Router();

// Utility function for handling errors
const handleError = (res, errorMessage, statusCode = 500) => {
  return res.status(statusCode).json({ error: errorMessage });
};

// User Registration Route (Signup)
router.post('/signup', async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  // Basic validation for required fields
  if (!name || !email || !password) {
    return handleError(res, 'Name, email, and password are required', 400);
  }

  try {
    // Check if email already exists
    const [results] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (results.length > 0) {
      return handleError(res, 'Email already exists', 400);
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [insertResult] = await pool.promise().query(
      'INSERT INTO users (name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address, phone]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return handleError(res, 'Failed to register user');
  }
});

// User Login Route (Login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Basic validation for required fields
    if (!email || !password) {
      return handleError(res, 'Email and password are required', 400);
    }
  
    // Log the request body for debugging
    console.log('Received login request:', { email, password });
  
    try {
      // Check if user exists
      const [results] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
  
      if (results.length === 0) {
        return handleError(res, 'User not found', 400);
      }
  
      const user = results[0];
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return handleError(res, 'Incorrect password', 400);
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      return handleError(res, 'Error logging in');
    }
  });
  

module.exports = router;
