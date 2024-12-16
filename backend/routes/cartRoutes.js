const express = require("express");
const { addToCart } = require("../controllers/cartController");

const router = express.Router();

// Add product to cart
router.post("/", (req, res, next) => {
  console.log("Received POST request for adding to cart:", req.body); // Log request body
  addToCart(req, res, next);
});

module.exports = router;
