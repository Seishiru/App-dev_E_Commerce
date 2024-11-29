import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import "./css/style.css";

const AuthModal = ({ type, closeModal }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h2>{type === "login" ? "Login" : "Signup"}</h2>
      <form>
        {type === "signup" && (
          <>
            <label>Username:</label>
            <input type="text" placeholder="Enter your username" />
          </>
        )}
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password" />
        <button type="submit">{type === "login" ? "Login" : "Signup"}</button>
      </form>
      <button className="close-button" onClick={closeModal}>
        Close
      </button>
    </div>
  </div>
);

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      {/* Top Header */}
      <Header setShowLogin={setShowLogin} setShowSignup={setShowSignup} />

      {/* Login/Signup Modal */}
      {showLogin && (
        <AuthModal
          type="login"
          closeModal={() => setShowLogin(false)}
        />
      )}
      {showSignup && (
        <AuthModal
          type="signup"
          closeModal={() => setShowSignup(false)}
        />
      )}

      {/* Main Routes */}
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
