import React, { useState } from 'react';
import './HomePage.css';
import Logo from './assets/Logo.png'; // Import the logo

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
            <div className="header-bar">
                <button className="header-button" onClick={() => setShowLogin(true)}>Login</button>
                <button className="header-button" onClick={() => setShowSignup(true)}>Signup</button>
            </div>

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
                <div className="cart">
                    <i className="fas fa-shopping-cart"></i>
                </div>
            </div>

            <h1>Shopease</h1>
            <button>Go to Product Page</button>

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
