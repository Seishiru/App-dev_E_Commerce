const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./controllers/authRoutes'); // Path to authentication routes
const userRoutes = require('./routes/userRoutes'); // Path to user-related routes
// const productRoutes = require('./routes/productRoutes'); // Path to product-related routes

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware to enable CORS for your frontend
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests only from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Restrict allowed methods
    credentials: true, // Allow cookies, if needed
  })
);

// Middleware to parse JSON payloads
app.use(express.json());

// Mount route files
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User-related routes
// app.use('/api/products', productRoutes); // Product-related routes

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
