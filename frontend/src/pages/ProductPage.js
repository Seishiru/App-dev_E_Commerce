import React from 'react';
import { Link } from 'react-router-dom';

const ProductPage = () => {
    return (
        <div className='section-container'>
            <h1>Product Details</h1>
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default ProductPage;
