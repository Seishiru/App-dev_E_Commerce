const express = require('express');
const { createProduct, upload } = require('../controllers/productController');
const router = express.Router();

// Route for creating a product with image upload
router.post('/create', upload.single('image'), createProduct);

module.exports = router;
