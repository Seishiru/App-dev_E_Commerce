import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";
import CheckoutPage from "./pages/CheckoutPage";
import PurchasesPage from "./pages/PurchasesPage";
import LoggedOutHeader from "./components/LoggedOutHeader";
import LoggedInHeader from "./components/LoggedInHeader";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminPage from './pages/AdminPage';
import { AdminCreateProduct, AdminOrders, AdminCategories } from './pages/AdminPage'; // Import named routes

import "./css/style.css";
import SearchProduct from "./pages/SearchProduct";

const App = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowSignup(false);
    navigate("/");
  };

  // Check for a token in local storage on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.name) {
          setUser({ name: decoded.name });
        } else {
          console.warn("Decoded token does not contain a 'name' field.");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null); // Remove user state
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to home
  };

  return (
    <div>
      {user ? (
        <LoggedInHeader user={user} handleLogout={handleLogout} />
      ) : (
        <LoggedOutHeader setShowLogin={openLogin} setShowSignup={openSignup} />
      )}

      {showLogin && <Login closeModal={closeModal} setShowSignup={openSignup} setUser={setUser} />}
      {showSignup && <Signup closeModal={closeModal} setShowLogin={openLogin} />}

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Updated dynamic route for product details */}
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/search" element={<SearchProduct />} />
          {/* Removed the unnecessary login and signup routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/create-product" element={<AdminCreateProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
