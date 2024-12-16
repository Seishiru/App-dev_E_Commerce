const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Joi = require('joi');
const pool = require('../db'); // Database connection
const jwtUtils = require('../config/jwtUtils'); // Import jwtUtils
const router = express.Router();

// Validation schemas
const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyCodeSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(6).required(),
});

// Utility function for handling errors
const handleError = (res, errorMessage, statusCode = 500) => {
  return res.status(statusCode).json({ error: errorMessage });
};

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

    // Check if the user is verified (is_verified = 1)
    if (user.is_verified !== 1) {
      return handleError(res, 'User is not verified', 400);
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return handleError(res, 'Incorrect password', 400);
    }

    // Generate a JWT token using jwtUtils
    const token = jwtUtils.generateToken({
      id: user.user_id,
      name: user.name,
      role: user.role,
    });

    // Send the user's name, email, role, and token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('Error during login:', err);
    return handleError(res, 'Error logging in');
  }
});

// Endpoint to send email verification code
router.post('/send-email-code', async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = emailSchema.validate({ email });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if (!password || !name) {
    return res.status(400).json({ error: 'Name and password are required' });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  try {
    const [existingRecord] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingRecord.length > 0) {
      const user = existingRecord[0];
      if (user.is_verified === 1) {
        return res.status(400).json({ error: 'User is already verified' });
      }

      await pool.promise().query(
        'UPDATE users SET verification_code = ?, expiry_time = ? WHERE email = ?',
        [verificationCode, expiryTime, email]
      );
    } else {
      await pool.promise().query(
        'INSERT INTO users (name, email, password, verification_code, expiry_time) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, verificationCode, expiryTime]
      );
    }

    const [userResult] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    const user = userResult[0];

    // Generate a JWT token using jwtUtils
    const token = jwtUtils.generateToken({
      id: user.user_id,
      name: user.name,
      email: user.email,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    });

    res.status(200).json({
      message: 'Verification code sent',
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Error during send email process:', err.message);
    res.status(500).json({ error: `Failed to send verification code: ${err.message}` });
  }
});

// Endpoint to verify the code
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  const { error } = verifyCodeSchema.validate({ email, code });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const [result] = await pool.promise().query(
      'SELECT verification_code, expiry_time FROM users WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const { verification_code, expiry_time } = result[0];

    if (new Date(expiry_time) < new Date()) {
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    if (String(code) !== String(verification_code)) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    await pool.promise().query('UPDATE users SET is_verified = 1 WHERE email = ?', [email]);

    res.status(200).json({ message: 'Code verified successfully and account activated' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: `Failed to verify the code: ${err.message}` });
  }
});

module.exports = router;
