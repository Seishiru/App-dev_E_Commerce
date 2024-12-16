// Import MySQL client
const mysql = require('mysql2');

// Create a database connection
const db = mysql.createConnection({
  host: 'localhost',        // Database host (default is localhost)
  user: 'root',             // Your MySQL username
  password: '',             // Your MySQL password
  database: 'app_e_commerce_db' // Your database name
});

// Test the connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');

  // Test insert logic
  testInsert();
});

// Function to simulate adding a product to the cart
const testInsert = () => {
  const user_id = 33;  // Example user ID
  const product_id = 11;  // Example product ID
  const quantity = 2;  // Quantity to add to the cart

  // Step 1: Check if the user already has a cart
  db.query('SELECT * FROM carts WHERE user_id = ?', [user_id], (err, cartResults) => {
    if (err) {
      console.error('Error checking for cart:', err);
      db.end(); // Ensure connection is closed if there's an error
      return;
    }

    let cart_id;

    if (cartResults.length === 0) {
      // No cart exists, so create a new one
      db.query('INSERT INTO carts (user_id) VALUES (?)', [user_id], (err, newCartResult) => {
        if (err) {
          console.error('Error creating cart:', err);
          db.end(); // Ensure connection is closed if there's an error
          return;
        }

        cart_id = newCartResult.insertId;  // Get the new cart ID
        console.log('New cart created with ID:', cart_id);

        // Now add the product to cart_items
        addToCart(cart_id, product_id, quantity);
      });
    } else {
      // Cart already exists, use the existing cart ID
      cart_id = cartResults[0].cart_id;
      console.log('Cart already exists with ID:', cart_id);

      // Add product to cart_items
      addToCart(cart_id, product_id, quantity);
    }
  });
};

// Function to insert the product into the cart_items table
const addToCart = (cart_id, product_id, quantity) => {
  // Step 2: Check if the product exists in the products table
  db.query('SELECT * FROM products WHERE product_id = ?', [product_id], (err, productResults) => {
    if (err) {
      console.error('Error checking for product:', err);
      db.end(); // Ensure connection is closed if there's an error
      return;
    }

    if (productResults.length === 0) {
      console.error('Product with ID ' + product_id + ' does not exist.');
      db.end(); // Ensure connection is closed if the product doesn't exist
      return;
    }

    // Product exists, proceed with adding to cart_items
    db.query('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cart_id, product_id], (err, itemResults) => {
      if (err) {
        console.error('Error checking cart items:', err);
        db.end(); // Ensure connection is closed if there's an error
        return;
      }

      if (itemResults.length > 0) {
        // Product already in cart, update the quantity
        db.query('UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?', [quantity, cart_id, product_id], (err, updateResult) => {
          if (err) {
            console.error('Error updating cart item quantity:', err);
            db.end(); // Ensure connection is closed if there's an error
            return;
          }
          console.log('Updated quantity in cart_items:', updateResult);
          db.end(); // Close the connection after the update
        });
      } else {
        // Product not in cart, insert new entry
        db.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cart_id, product_id, quantity], (err, insertResult) => {
          if (err) {
            console.error('Error inserting cart item:', err);
            db.end(); // Ensure connection is closed if there's an error
            return;
          }
          console.log('Product added to cart_items:', insertResult);
          db.end(); // Close the connection after the insert
        });
      }
    });
  });
};
