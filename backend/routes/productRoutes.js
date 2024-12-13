const express = require('express');
const mysql = require('mysql2');
const { createProduct, upload } = require('../controllers/productController');
const router = express.Router();
const db = require('../db'); // Importing the db connection

// Route for creating a product with image upload
router.post('/create', upload.single('image'), createProduct);

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

// Fetch all categories
router.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(results); // Send the list of categories as JSON
  });
});

// Route to create a new category
router.post('/categories', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Category name is required' });
  }

  // Insert the category into the database
  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error('Error creating category:', err);
      return res.status(500).json({ success: false, message: 'Failed to create category' });
    }

    res.status(200).json({ success: true, message: 'Category created successfully' });
  });
});

module.exports = router;
