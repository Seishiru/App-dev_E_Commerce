const express = require('express');
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

// Endpoint to send email verification code
router.post('/send-email-code', async (req, res) => {
  const { email } = req.body;

  // Validate email format
  const { error } = emailSchema.validate({ email });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Generate a plain verification code (6-digit)
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
  const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  try {
    // Check for existing record
    const [existingRecord] = await pool.promise().query('SELECT * FROM email_verification WHERE email = ?', [email]);

    if (existingRecord.length > 0) {
      // Update if record exists
      await pool.promise().query(
        'UPDATE email_verification SET code = ?, expiry_time = ? WHERE email = ?',
        [verificationCode, expiryTime, email]
      );
    } else {
      // Insert if no record exists
      await pool.promise().query(
        'INSERT INTO email_verification (email, code, expiry_time) VALUES (?, ?, ?)',
        [email, verificationCode, expiryTime]
      );
    }

    // Send email with the plain verification code
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
      throw new Error('Missing email credentials in environment variables');
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${verificationCode}`, // Send the plain code
    });

    console.log(`Verification email sent to ${email} with code: ${verificationCode}`);
    res.status(200).json({ message: 'Verification code sent' });
  } catch (err) {
    // Improved error handling with specific messages
    console.error('Error:', err.message);
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
    // Fetch stored code and expiry time from the database
    const [result] = await pool.promise().query(
      'SELECT code, expiry_time FROM email_verification WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const { code: storedCode, expiry_time } = result[0];

    // Log the expected code and the received code for debugging
    console.log(`Expected code for ${email}: ${storedCode}`);
    console.log(`Received code: ${code}`);

    // Check if the code has expired
    if (new Date(expiry_time) < new Date()) {
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    // Compare the provided code with the stored code (convert both to strings for consistency)
    if (String(code) !== String(storedCode)) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // If the code is valid, you can perform additional actions (e.g., activate the account)
    res.status(200).json({ message: 'Code verified successfully' });
  } catch (err) {
    // Improved error handling with specific messages
    console.error('Error:', err.message);
    res.status(500).json({ error: `Failed to verify the code: ${err.message}` });
  }
});

module.exports = router;
