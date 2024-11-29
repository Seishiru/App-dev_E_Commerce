import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import "./css/style.css";
import AuthModal from "./components/AuthModal";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      {/* Topmost Header: Login and Signup */}
      <Header setShowLogin={setShowLogin} setShowSignup={setShowSignup} />

      {/* Subheader: Logo, Search Bar, Cart */}
      <SubHeader />

      {/* Login/Signup Modal */}
      {showLogin && (
        <AuthModal
          type="login"
          closeModal={() => setShowLogin(false)}
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        />
      )}
      {showSignup && (
        <AuthModal
          type="signup"
          closeModal={() => setShowSignup(false)}
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        />
      )}
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
