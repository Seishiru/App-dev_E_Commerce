const express = require('express');
const mysql = require('mysql2');
const { createProduct, upload } = require('../controllers/productController');
const router = express.Router();
const db = require('../db'); // Importing the db connection
const { getProductById } = require("../controllers/productController");




// Route for creating a product with image upload
router.post('/create', upload.single('image'), createProduct);

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

router.get('/:product_id', (req, res) => {
  const { product_id } = req.params; // Get the product_id from the request params
  console.log('Fetching product with product_id:', product_id); // Log for debugging

  db.query('SELECT * FROM products WHERE product_id = ?', [product_id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err); // Log the error for debugging
      return res.status(500).json({ error: 'Failed to fetch product' });
    }

    if (results.length === 0) {
      // If no product is found
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(results[0]); // Send the product data as JSON
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


router.get("/top-stock", async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM products 
      ORDER BY stock_quantity DESC 
      LIMIT 10
    `;
    
    // Using db.promise() for better handling of async queries
    db.promise().query(query)
      .then(([results]) => {
        res.json(results);  // Send the top 10 products as JSON
      })
      .catch((error) => {
        console.error("Error fetching top products:", error);
        res.status(500).json({ message: "Failed to fetch top products" });
      });
  } catch (error) {
    console.error("Error fetching top products:", error);
    res.status(500).json({ message: "Failed to fetch top products" });
  }
});

module.exports = router;
