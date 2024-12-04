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

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleError(res, 'Email and password are required', 400);
  }

  try {
    const [results] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      return handleError(res, 'User not found', 400);
    }

    const user = results[0];

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return handleError(res, 'Incorrect password', 400);
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the user's name and email along with the token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Error during login:', err);
    return handleError(res, 'Error logging in');
  }
});

module.exports = router;
