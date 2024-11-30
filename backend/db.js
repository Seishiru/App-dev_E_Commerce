const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Debugging: Log environment variables to verify they're loaded correctly
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,  // Host from the .env file
  user: process.env.DB_USER,  // User from the .env file
  password: process.env.DB_PASSWORD,  // Password from the .env file
  database: process.env.DB_NAME,  // Database name from the .env file
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Debugging: Check the pool's connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);  // Detailed error message
    return;
  }
  console.log('Connected to the database!');
  connection.release(); // Release connection back to the pool
});

module.exports = pool; // Export the pool for use in other files
