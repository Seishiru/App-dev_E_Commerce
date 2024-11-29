import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./css/style.css";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
    navigate("/login"); // Navigate to /login
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
    navigate("/signup"); // Navigate to /signup
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowSignup(false);
    navigate("/"); // Redirect to home
  };

  return (
    <div>
      {/* Topmost Header: Login and Signup */}
      <Header setShowLogin={openLogin} setShowSignup={openSignup} />

  
      {/* Login and Signup Modals */}
      {showLogin && <Login closeModal={closeModal} setShowSignup={openSignup} />}
      {showSignup && <Signup closeModal={closeModal} setShowLogin={openLogin} />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Placeholder Routes for Modals */}
        <Route path="/login" element={<></>} />
        <Route path="/signup" element={<></>} />
      </Routes>
    </div>
  );
};

export default App;
