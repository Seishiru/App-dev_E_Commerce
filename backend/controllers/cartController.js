const db = require("../db"); // Assuming you're using a db connection like mysql2

// Add product to cart
const addToCart = (req, res, next) => {
  const { user_id, product_id, quantity } = req.body;
  
  // Debug: Log the data received in the request body
  console.log(`Adding product to cart - user_id: ${user_id}, product_id: ${product_id}, quantity: ${quantity}`);
  
  // Step 1: Check if the user has a cart
  db.query("SELECT * FROM carts WHERE user_id = ?", [user_id], (err, cartResults) => {
    if (err) {
      console.error("Error checking for existing cart:", err);
      return res.status(500).json({ message: "Server error while checking cart" });
    }

    let cart_id;
    if (cartResults.length === 0) {
      // No cart exists, so create a new one
      console.log("No cart found. Creating new cart...");
      db.query("INSERT INTO carts (user_id) VALUES (?)", [user_id], (err, newCartResult) => {
        if (err) {
          console.error("Error creating new cart:", err);
          return res.status(500).json({ message: "Error creating cart" });
        }
        
        cart_id = newCartResult.insertId;
        console.log("New cart created with ID:", cart_id);

        // Now add the product to cart_items
        addProductToCart(cart_id, product_id, quantity, res);
      });
    } else {
      // Cart already exists, use the existing cart ID
      cart_id = cartResults[0].cart_id;
      console.log("Found existing cart with ID:", cart_id);

      // Add product to cart_items
      addProductToCart(cart_id, product_id, quantity, res);
    }
  });
};

// Function to insert the product into the cart_items table
const addProductToCart = (cart_id, product_id, quantity, res) => {
  console.log(`Inserting product into cart_items - cart_id: ${cart_id}, product_id: ${product_id}, quantity: ${quantity}`);
  
  // Step 2: Check if the product already exists in the cart
  db.query("SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?", [cart_id, product_id], (err, itemResults) => {
    if (err) {
      console.error("Error checking cart items:", err);
      return res.status(500).json({ message: "Error checking cart items" });
    }

    if (itemResults.length > 0) {
      // Product already in cart, update the quantity
      console.log("Product already in cart, updating quantity...");
      db.query(
        "UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?",
        [quantity, cart_id, product_id],
        (err, updateResult) => {
          if (err) {
            console.error("Error updating cart item quantity:", err);
            return res.status(500).json({ message: "Error updating cart item" });
          }
          console.log("Updated cart item quantity:", updateResult);
          return res.status(200).json({ message: "Product quantity updated in cart" });
        }
      );
    } else {
      // Product not in cart, insert new entry
      console.log("Product not in cart, inserting new item...");
      db.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
        [cart_id, product_id, quantity],
        (err, insertResult) => {
          if (err) {
            console.error("Error inserting cart item:", err);
            return res.status(500).json({ message: "Error inserting cart item" });
          }
          console.log("Product added to cart:", insertResult);
          return res.status(200).json({ message: "Product added to cart" });
        }
      );
    }
  });
};

module.exports = { addToCart };
