const express = require("express");
const { addToCart, getCartItems, updateCartQuantity, deleteCartItem } = require("../controllers/cartController");

const router = express.Router();

// Route to add product to cart
router.post("/", addToCart);

// Route to get cart items
router.get("/:user_id", getCartItems);

// Route to update cart item quantity
router.put('/update-quantity', updateCartQuantity);

router.delete("/delete/:cart_item_id", deleteCartItem);


module.exports = router;
