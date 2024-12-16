const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; // Ensure this is defined in your .env file

// Function to generate a JWT token
function generateToken(payload, expiresIn = '1h') {
  console.log('Generating token with payload:', payload);
  try {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
    console.log('Generated Token:', token); // Debugging the generated token
    return token;
  } catch (err) {
    console.error('Error generating token:', err.message);
    throw new Error('Failed to generate token');
  }
}

// Function to verify a JWT token
function verifyToken(token) {
  console.log('Verifying token:', token); // Debugging the token received for verification
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Decoded Payload:', decoded); // Debugging the decoded payload
    return decoded;
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    // Return null if verification fails
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
