const jwtUtils = require('../config/jwtUtils'); // Import jwtUtils

const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  // Verify the token using jwtUtils
  const decoded = jwtUtils.verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ error: 'Failed to authenticate token' });
  }

  // Attach the decoded payload to the request object
  req.user = decoded;
  next(); // Call the next middleware or route handler
};

module.exports = authenticateToken;
