import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the E-Commerce Website</h1>
            <Link to="/product">Go to Product Page</Link>
        </div>
    );
};

export default HomePage;
