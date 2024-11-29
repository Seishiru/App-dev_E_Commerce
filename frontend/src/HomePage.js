import React, { useState } from 'react';
import './css/HomePage.css';
import Logo from './assets/Logo.png'; // Import the logo
import sale_image from './assets/sale_image.png';
const HomePage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [closingModal, setClosingModal] = useState(false); // For handling animation on close

    const closeModal = (setShow) => {
        setClosingModal(true); // Start close animation
        setTimeout(() => {
            setShow(false); // Hide modal after animation
            setClosingModal(false); // Reset animation state
        }, 500); // Match animation duration
    };

    return (
        <div>
            {/* Header Bar */}

            {/* Container2: Logo, Site Name, Search Bar, Cart */}
            <div className="container2">
                <img src={Logo} alt="Shopee Logo" className="logo" />
                <h1 className="site-name">Shopease</h1>

                {/* Search Bar and Button */}
                <div className="search-bar">
                    <input type="text" className="search-input" placeholder="Search for products..." />
                    <button className="search-button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>

                {/* Cart Icon */}
                <div className="header-right">
                    <button className="header-button" onClick={() => setShowLogin(true)}>Login</button>
                    <button className="header-button" onClick={() => setShowSignup(true)}>Signup</button>
                    <i className="fas fa-shopping-cart cart-icon"></i>
                </div>
            </div>
            {/* Main Image Section */}
            <div className="main-image-section">
                <div className="margin"></div>
                <div className="image-container">
                    <div className="large-image">
                        <img src={sale_image} alt="Shopee Logo" className="sale_image" />
                    </div>
                </div>
                <div className="margin"></div>
            </div>

            {/* Suggested Products Section */}
            <div className="suggested-products">
                <h2>Suggested products for you</h2>
                <div className="product-grid">
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 1 description</div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 2 description</div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 3 description</div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 4 description</div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">image</div>
                        <div className="product-description">Product 5 description</div>
                    </div>
                </div>
            </div>



            {/* Login Modal */}
            {showLogin && (
                <div className="modal-overlay">
                    <div className={`modal ${closingModal ? 'modal-slide-down' : 'modal-slide-up'}`}>
                        <h2>Login</h2>
                        <form>
                            <label>Email:</label>
                            <input type="email" placeholder="Enter your email" />
                            <label>Password:</label>
                            <input type="password" placeholder="Enter your password" />
                            <button type="submit">Login</button>
                        </form>
                        <button className="close-button" onClick={() => closeModal(setShowLogin)}>Close</button>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {showSignup && (
                <div className="modal-overlay">
                    <div className={`modal ${closingModal ? 'modal-slide-down' : 'modal-slide-up'}`}>
                        <h2>Signup</h2>
                        <form>
                            <label>Username:</label>
                            <input type="text" placeholder="Enter your username" />
                            <label>Email:</label>
                            <input type="email" placeholder="Enter your email" />
                            <label>Password:</label>
                            <input type="password" placeholder="Create a password" />
                            <button type="submit">Signup</button>
                        </form>
                        <button className="close-button" onClick={() => closeModal(setShowSignup)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;