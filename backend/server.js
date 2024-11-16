const express = require('express');
const cors = require('cors'); // Import CORS
const dotenv = require('dotenv');
const authRoutes = require('./controllers/authRoutes'); // Ensure the correct path

dotenv.config(); // Load environment variables

const app = express();

// Use CORS middleware to allow requests from specific origins
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: ['GET', 'POST'], // Allow specific HTTP methods
  credentials: true, // Optional: Allow cookies to be sent with requests
}));

app.use(express.json()); // To parse JSON in requests

// Use the auth routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
