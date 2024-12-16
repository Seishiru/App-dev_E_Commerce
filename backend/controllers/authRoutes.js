const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Joi = require('joi');
const pool = require('../db'); // Database connection
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
      return handleError(res, 'User is not verified', 400); // Reject login if not verified
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return handleError(res, 'Incorrect password', 400);
    }

    // Debugging the role (admin or customer)
    if (user.role === 'admin') {
      console.log('Logged in as Admin');
    } else if (user.role === 'customer') {
      console.log('Logged in as Customer');
    } else {
      console.log('Unknown role:', user.role);
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the user's name, email, role, and token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email, role: user.role }, // Include role in the response
    });
  } catch (err) {
    console.error('Error during login:', err);
    return handleError(res, 'Error logging in');
  }
});
























// Endpoint to send email verification code
router.post('/send-email-code', async (req, res) => {
  const { name, email, password } = req.body; // Add name to the request body

  // Debugging: Log the received name, email, and password to check if they are received correctly
  console.log("Received name:", name);
  console.log("Received email:", email);
  console.log("Received password:", password); // Log the password for debugging

  // Validate email format
  const { error } = emailSchema.validate({ email });
  if (error) {
    console.log('Email validation error:', error.details[0].message); // Log validation error
    return res.status(400).json({ error: error.details[0].message });
  }

  // Validate password
  if (!password) {
    console.log("Password is missing");
    return res.status(400).json({ error: 'Password is required' }); // Check if password is provided
  }

  // Validate name
  if (!name) {
    console.log("Name is missing");
    return res.status(400).json({ error: 'Name is required' }); // Check if name is provided
  }

  // Generate a plain verification code (6-digit)
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
  const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  console.log(`Generated verification code: ${verificationCode}`);
  console.log(`Expiry time for the code: ${expiryTime}`);

  try {
    // Check if the user already exists in the database
    console.log('Checking if user exists in the database...');
    const [existingRecord] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingRecord.length > 0) {
      const user = existingRecord[0];

      // Check if the user is already verified
      if (user.is_verified === 1) {
        console.log('User is already verified, no need to send code');
        return res.status(400).json({ error: 'User is already verified' }); // Do not send the code if verified
      }

      console.log('User found, updating verification code...');
      // Update the verification code and expiry time
      await pool.promise().query(
        'UPDATE users SET verification_code = ?, expiry_time = ? WHERE email = ?',
        [verificationCode, expiryTime, email]
      );
      console.log('Verification code updated in database');
    } else {
      console.log('User not found, inserting new user...');
      // Insert new user into the users table, including the name and password
      const [insertResult] = await pool.promise().query(
        'INSERT INTO users (name, email, password, verification_code, expiry_time) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, verificationCode, expiryTime] // Insert name, email, password, verification code, and expiry time
      );
      console.log('New user inserted into database:', insertResult);
    }

    // Generate a JWT token after successful signup
    const [userResult] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    const user = userResult[0];

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Generated JWT token for the new user');

    // Send email with the plain verification code (after user insert or update)
    console.log('Preparing to send email...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // To handle SSL issues if any
      }
    });

    // Ensure environment variables are set and valid
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Missing email credentials');
      throw new Error('Missing email credentials in environment variables');
    }

    console.log('Sending email...');
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${verificationCode}`, // Send the plain code
    });

    console.log(`Verification email sent to ${email} with code: ${verificationCode}`);
    // Send the JWT token and user details in the response
    res.status(200).json({
      message: 'Verification code sent',
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Error during send email process:', err.message);
    res.status(500).json({ error: `Failed to send verification code: ${err.message}` });
  }
});





















// Endpoint to verify the code
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  // Validate email and code format
  const { error } = verifyCodeSchema.validate({ email, code });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Fetch stored code and expiry time from the users table
    const [result] = await pool.promise().query(
      'SELECT verification_code, expiry_time FROM users WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const { verification_code, verification_expiry } = result[0];

    // Log the expected code and the received code for debugging
    console.log(`Expected code for ${email}: ${verification_code}`);
    console.log(`Received code: ${code}`);

    // Check if the code has expired
    if (new Date(verification_expiry) < new Date()) {
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    // Compare the provided code with the stored code (convert both to strings for consistency)
    if (String(code) !== String(verification_code)) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

// If the code is valid, you can perform additional actions (e.g., activate the account)
await pool.promise().query(
  'UPDATE users SET is_verified = 1 WHERE email = ?',
  [email]
);

// Respond with success message
res.status(200).json({ message: 'Code verified successfully and account activated' });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: `Failed to verify the code: ${err.message}` });
  }
});


module.exports = router;
