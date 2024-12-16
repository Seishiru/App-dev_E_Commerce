require('dotenv').config();
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '', // no password specified
  database: 'app_e_commerce_db' // your DB name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Query to get all addresses
connection.query('SELECT * FROM addresses', (err, results) => {
  if (err) {
    console.error('Error executing query:', err.stack);
    return;
  }

  console.log('Addresses in the database:');
  // Loop through each address and print its details
  results.forEach((address) => {
    console.log(`Address ID: ${address.id}`);
    console.log(`Receiver: ${address.receiver}`);
    console.log(`Address: ${address.address}`);
    console.log(`Address Type: ${address.address_type || 'N/A'}`);
    console.log(`Phone Number: ${address.phone_number || 'N/A'}`);
    console.log(`Created At: ${address.created_at}`);
    console.log(`Updated At: ${address.updated_at}`);
    console.log('-------------------------');
  });
});

// Close the connection
connection.end();
