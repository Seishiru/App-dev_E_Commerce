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

// Get top 10 products by stock_quantity
router.get("/top-stock", async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM products 
      ORDER BY stock_quantity DESC 
      LIMIT 10
    `;
    const [results] = await db.execute(query);
    res.json(results);
  } catch (error) {
    console.error("Error fetching top products:", error);
    res.status(500).json({ message: "Failed to fetch top products" });
  }
});

module.exports = router;
