const express = require('express');
const pool = require('../db'); // Database connection
const router = express.Router();

// Search for products by category name or product name
router.get('/', async (req, res) => {
  const searchQuery = req.query.query; // Get search term from query parameters

  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // Query the database to get products that match the category name or product name
    const [results] = await pool.promise().query(
      `
      SELECT 
        p.product_id, 
        p.name AS name,
        p.description, 
        p.price, 
        p.stock_quantity, 
        p.image_url, 
        c.name AS category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.category_id
      WHERE c.name LIKE ? OR p.name LIKE ?
      `,
      [`%${searchQuery}%`, `%${searchQuery}%`] // Match both category and product name
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(results); // Return matching products
  } catch (err) {
    console.error("Error searching for products:", err.message);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

module.exports = router;
