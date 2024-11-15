import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '././HomePage';
import ProductPage from './ProductPage';
import './css/style.css';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<ProductPage />} />
            </Routes>
        </div>
    );
};

export default App;
