const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Debugging: Log environment variables to verify they're loaded correctly
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);  // Password should be empty or undefined
console.log('DB_NAME:', process.env.DB_NAME);

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // Increase timeout to 10 seconds for connection
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);  // Log full error object for better insights
    return;
  }
  console.log('Connected to the database!');
  connection.release(); // Release connection back to the pool
});


module.exports = pool; // Export the pool for use in other files
