const express = require('express');
const mysql = require('mysql2');
const { createProduct, upload } = require('../controllers/productController');
const router = express.Router();
const db = require('../db'); // Importing the db connection

// Route for creating a product with image upload
router.post('/create', upload.single('image'), createProduct);
// Set up MySQL connection

// Fetch all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(results); // Send the list of products as JSON
  });
});

router.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(results); // Send the list of categories as JSON
  });
});

module.exports = router;
