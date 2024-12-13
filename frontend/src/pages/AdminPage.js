import React, { useState } from 'react';
import '../css/AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      setProducts([...products, newProduct]);
      setNewProduct({ name: '', description: '', price: '', image: null });
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
