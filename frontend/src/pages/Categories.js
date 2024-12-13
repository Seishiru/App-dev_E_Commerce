import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Categories.css';

const Categories = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]); // State for storing categories
  const [message, setMessage] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/categories');
        if (response.data) {
          setCategories(response.data); // Set the fetched categories
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage('Failed to load categories.');
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run this once when the component mounts

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setMessage('Category name is required.');
      return;
    }

    try {
      // Make the request to the correct URL to create a new category
      const response = await axios.post('http://localhost:5000/api/products/categories', { name: categoryName });
      if (response.data.success) {
        setMessage('Category created successfully!');
        setCategoryName(''); // Clear input after successful submission
        if (response.data.category) {
          setCategories([...categories, response.data.category]); // Add the new category to the list
        }
      } else {
        setMessage('Failed to create category.');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="categories-container">
      <h1 className="categories-header">Categories</h1>
      <p className="categories-description">
        This will display and allow creation of new product categories.
      </p>

      {/* Display message after form submission */}
      {message && <p className="message">{message}</p>}

      {/* Category creation form */}
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleInputChange}
            placeholder="Enter category name"
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">Create Category</button>
      </form>

      {/* Display existing categories */}
      <div className="categories-list">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            category && category.name ? (  // Check if category is defined and has a 'name' field
              <div className="category-card" key={category.id || index}>
                <h3>{category.name}</h3>
              </div>
            ) : null
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
