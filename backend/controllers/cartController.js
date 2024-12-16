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

// Controller function to get cart items for a user
const getCartItems = (req, res) => {
  const { user_id } = req.params;

  // Query to get the user's cart items, join with products to get product details
  const query = `
    SELECT 
      ci.cart_item_id, 
      ci.quantity, 
      p.name AS product_name, 
      p.price, 
      p.image_url 
    FROM cart_items ci
    INNER JOIN products p ON ci.product_id = p.product_id
    WHERE ci.cart_id IN (SELECT cart_id FROM carts WHERE user_id = ?)
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).json({ message: "Error fetching cart items" });
    }

    // If no cart items found
    if (results.length === 0) {
      return res.status(404).json({ message: "No items found in cart" });
    }

    // Send the cart items as a response
    return res.status(200).json({ cartItems: results });
  });
};

// Update cart item quantity
const updateCartQuantity = async (req, res) => {
  const { cart_item_id, quantity } = req.body;

  // Log the received data
  console.log(`Received data: cart_item_id = ${cart_item_id}, quantity = ${quantity}`);

  if (!cart_item_id || !quantity || quantity < 1) {
    return res.status(400).send({ message: 'Invalid input data.' });
  }

  try {
    // Log the SQL query and parameters
    console.log(`Executing query: UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?`);
    console.log(`Query parameters: [${quantity}, ${cart_item_id}]`);

    // Use db.execute and check the returned result properly
    const [result] = await db.execute('UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?', [quantity, cart_item_id]);

    // Log the full result object
    console.log('Query result:', result);

    // Check if result is defined and contains affected rows
    if (result && result.affectedRows > 0) {
      console.log('Quantity updated successfully');
      res.status(200).send({ message: 'Quantity updated successfully' });
    } else {
      // Log when no rows are affected
      console.log('No rows affected. Cart item not found or quantity already the same');
      res.status(404).send({ message: 'Cart item not found or quantity is already the same.' });
    }
  } catch (error) {
    // Log the error
    console.error('Error updating quantity:', error);
    res.status(500).send({ message: 'Failed to update quantity.' });
  }
};




// Export controller functions
module.exports = { addToCart, getCartItems, updateCartQuantity };
