import React, { useState, useEffect } from 'react';
import '../css/AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: '',
    image: null,
    imagePreview: '', // New state for image preview
  });

  // Fetch categories when the component mounts
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/categories');
      if (response.ok) {
        const result = await response.json();
        setCategories(result); // Update the categories state
      } else {
        console.error('Failed to fetch categories:', response.statusText);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch products when the component mounts
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (response.ok) {
        const result = await response.json();
        setProducts(result); // Update the products state with the fetched data
      } else {
        console.error('Failed to fetch products:', response.statusText);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();  // Fetch products
    fetchCategories(); // Fetch categories
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({
      ...newProduct,
      image: file,
      imagePreview: URL.createObjectURL(file), // Set image preview URL
    });
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.image && newProduct.stock_quantity && newProduct.category_id) {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('stock_quantity', newProduct.stock_quantity);
      formData.append('category_id', newProduct.category_id);
      formData.append('image', newProduct.image);

      try {
        const response = await fetch('http://localhost:5000/api/products/create', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          alert('Product added successfully!');
          console.log(result);
          fetchProducts(); // Reload the product list after adding a new product
        } else {
          console.error('Failed to add product:', response.statusText);
        }
      } catch (err) {
        console.error('Error while adding product:', err);
      }
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Page - Manage Products</h1>

      <div className="add-product-form">
        <h2>Add New Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="stock_quantity"
          placeholder="Stock Quantity"
          value={newProduct.stock_quantity}
          onChange={handleInputChange}
        />
        
        <select
          name="category_id"
          value={newProduct.category_id}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Image Preview */}
        {newProduct.imagePreview && (
          <div className="image-preview">
            <img src={newProduct.imagePreview} alt="Image Preview" className="preview-image" />
          </div>
        )}

        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="product-list">
        <h2>Product List</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.product_id} className="product-item">
                <img
                  src={`http://localhost:5000/uploads/${product.image_url}`} 
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock_quantity}</p>
                  <p>Category ID: {product.category_id}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
