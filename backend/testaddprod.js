const pool = require('./db'); // Assuming db.js is in the same directory

const testAddProduct = async () => {
  // Static product details
  const product = {
    name: 'Test Product',
    description: 'This is a test description.',
    price: 19.99,
    stock_quantity: 10,
    category_id: 1, // Adjust according to your category IDs in the database
    image_url: 'uploads/213a9cf5e250cdac07ea9f081b5507be.jpg_2200x2200q80.jpg_.webp', // Path to the image in the uploads folder
  };

  // SQL query to insert the product
  const query = `
    INSERT INTO products (name, description, price, stock_quantity, category_id, image_url) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    // Execute the query with parameters
    const [result] = await pool.promise().query(query, [
      product.name,
      product.description,
      product.price,
      product.stock_quantity,
      product.category_id,
      product.image_url,
    ]);

    console.log('Product added successfully! Insert ID:', result.insertId);
  } catch (err) {
    console.error('Error adding product:', err);
  } finally {
    pool.end(); // Close the database connection pool
  }
};

// Run the function
testAddProduct();
