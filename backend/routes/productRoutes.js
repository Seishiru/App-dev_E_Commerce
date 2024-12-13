const express = require("express");
const router = express.Router();
const pool = require('../db');  // Replace with your DB connection file

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
