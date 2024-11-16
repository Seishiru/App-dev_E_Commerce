// authRoutes.js
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const pool = require('../db'); // Database connection
const router = express.Router();

// Route to send the email verification code
router.post('/send-email-code', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate 6 digit code

  try {
    // Save the verification code to the database (optional)
    await pool.promise().query('INSERT INTO email_verification (email, code) VALUES (?, ?)', [email, verificationCode]);

    // Send the email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Adjust as necessary
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification code sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send verification code' });
  }
});

module.exports = router;
