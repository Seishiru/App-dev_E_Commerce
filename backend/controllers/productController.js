const pool = require('../db'); // Import database connection
const multer = require('multer');
const path = require('path');

// Set up storage for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await db.query("SELECT * FROM products WHERE product_id = ?", [id]);

    if (!product.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product[0]); // Return the first product found
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const upload = multer({ storage: storage });

// API to handle product creation
const createProduct = (req, res) => {
  
  const { name, description, price, stock_quantity, category_id } = req.body;
  const image = req.file ? req.file.filename : null;

  console.log('Received data:', { name, description, price, stock_quantity, category_id, image });

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required.' });
  }

  const query = 'INSERT INTO products (name, description, price, stock_quantity, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, description || null, price, stock_quantity || 0, category_id || null, image];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting product:', err);
      return res.status(500).json({ error: 'Error creating product.' });
    }
    res.status(201).json({ message: 'Product created successfully', product_id: result.insertId });
  });
};

module.exports = { createProduct, upload };
