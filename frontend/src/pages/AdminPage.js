import React, { useState } from 'react';
import '../css/AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '', // Added stock_quantity
    category_id: '', // Added category_id
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.image && newProduct.stock_quantity && newProduct.category_id) {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('stock_quantity', newProduct.stock_quantity); // Added stock_quantity
      formData.append('category_id', newProduct.category_id); // Added category_id
      formData.append('image', newProduct.image);

      for (let [key, value] of formData.entries()) {
        console.log(key, value); // Debug FormData
      }

      try {
        const response = await fetch('http://localhost:5000/api/products/create', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          alert('Product added successfully!');
          console.log(result);
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
        <input
          type="number"
          name="category_id"
          placeholder="Category ID"
          value={newProduct.category_id}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="product-list">
        <h2>Product List</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product, index) => (
              <li key={index} className="product-item">
                <img
                  src={URL.createObjectURL(product.image)}
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
