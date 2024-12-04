require('dotenv').config();
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '', // no password specified
  database: 'app_e_commerce_db' // updated DB name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Query to get the first row from the user table
connection.query('SELECT * FROM users LIMIT 1', (err, results) => {
  if (err) {
    console.error('Error executing query:', err.stack);
    return;
  }
  console.log('First row from user table:', results[0]);
});

// Close the connection
connection.end();
