const mysql = require('mysql2');  // Import mysql2 package

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app_e_commerce_db',  // Replace with the name of the database you created
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
  connection.release();  // Release the connection back to the pool
});

// Your other server setup code (Express, routes, etc.)
const express = require('express');
const app = express();
const port = 5000;

// Example route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
