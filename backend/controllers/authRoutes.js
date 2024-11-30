const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Joi = require('joi');
const rateLimit = require('express-rate-limit');
const pool = require('../db'); // Database connection
const router = express.Router();

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 52,
  message: 'Too many requests, please try again later.',
});

// Validation schemas
const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyCodeSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(6).required(),
});

// Endpoint to send email verification code
router.post('/send-email-code', limiter, async (req, res) => {
  const { email } = req.body;

  const { error } = emailSchema.validate({ email });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Generate a plain verification code (6-digit)
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
  const hashedCode = crypto.createHash('sha256').update(verificationCode.toString()).digest('hex');
  const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  try {
    // Check for existing record
    const [existingRecord] = await pool.promise().query('SELECT * FROM email_verification WHERE email = ?', [email]);

    if (existingRecord.length > 0) {
      // Update if record exists
      await pool.promise().query(
        'UPDATE email_verification SET code = ?, expiry_time = ? WHERE email = ?',
        [hashedCode, expiryTime, email]
      );
    } else {
      // Insert if no record exists
      await pool.promise().query(
        'INSERT INTO email_verification (email, code, expiry_time) VALUES (?, ?, ?)',
        [email, hashedCode, expiryTime]
      );
    }

    // Send email with plain verification code (not hashed)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${verificationCode}`, // Send the plain code
    });

    console.log(`Verification email sent to ${email}`);
    res.status(200).json({ message: 'Verification code sent' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to send verification code' });
  }
});

// Endpoint to verify the code
router.post('/verify-code', limiter, async (req, res) => {
  const { email, code } = req.body;

  const { error } = verifyCodeSchema.validate({ email, code });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const [result] = await pool.promise().query(
      'SELECT code, expiry_time FROM email_verification WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const { code: storedHashedCode, expiry_time } = result[0];

    // Check if the code is expired
    if (new Date(expiry_time) < new Date()) {
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    // Hash the provided code to compare
    const providedHashedCode = crypto.createHash('sha256').update(code).digest('hex');

    if (providedHashedCode !== storedHashedCode) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // If the code is valid, you can perform additional actions (e.g., activate the account)

    res.status(200).json({ message: 'Code verified successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to verify the code' });
  }
});

module.exports = router;
