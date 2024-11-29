import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import UserProfile from './pages/UserProfile';
import './css/style.css';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </div>
    );
};

export default App;
