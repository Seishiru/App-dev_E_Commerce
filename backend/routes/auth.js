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

  if (!name || !email || !password) {
    return handleError(res, 'Name, email, and password are required', 400);
  }

  try {
    const [results] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (results.length > 0) return handleError(res, 'Email already exists', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.promise().query(
      'INSERT INTO users (name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address, phone]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return handleError(res, 'Failed to register user');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Log the incoming payload for debugging
  console.log('Received Login Payload:', { email, password });

  if (!email || !password) {
    console.log('Error: Missing email or password'); // Debugging log
    return handleError(res, 'Email and password are required', 400);
  }

  try {
    // Query the database to check if the user exists
    const [results] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      console.log('Error: User not found'); // Debugging log
      return handleError(res, 'User not found', 400);
    }

    const user = results[0];

    // Log the stored email and password for debugging
    console.log('User Found in Database:');
    console.log('Email:', user.email);
    console.log('Password:', user.password);

    // Compare the provided password directly with the stored password
    if (password !== user.password) {
      console.log('Error: Incorrect password'); // Debugging log
      return handleError(res, 'Incorrect password', 400);
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Login successful, JWT generated'); // Debugging log
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err); // Debugging log
    return handleError(res, 'Error logging in');
  }
});




module.exports = router;
