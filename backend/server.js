const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Importing route files
const authRoutes = require('../backend/controllers/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Path to user-related routes
const searchRoutes = require('./routes/searchRoutes'); 
const productRoutes = require('./routes/productRoutes'); // Path to your productRoutes file
const addressRoutes = require('./routes/addressRoutes');
const cartRoutes = require("./routes/cartRoutes");



dotenv.config(); // Load environment variables

const app = express();

// Middleware to enable CORS for your frontend
app.use(
  cors({
    origin: 'http://localhost:3000', // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Restrict allowed methods
    credentials: true,
  })
);

// Middleware to parse JSON payloads
app.use(express.json());

// Mount route files
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // Example user routes
app.use('/api/products', productRoutes); // Mount product routes (which includes categories)
app.use('/api', addressRoutes); // Use the address routes under `/api`
app.use("/api/cart", cartRoutes);
app.use('/api/search', searchRoutes); // Mount the search route
// Static file serving (for image uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
