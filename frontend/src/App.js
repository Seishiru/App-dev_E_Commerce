import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Don't update this line
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
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component
import PublicRoute from './components/PublicRoute'; // Import PublicRoute component

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
    navigate("/"); // Redirect to homepage after closing modal
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

        if (decoded.name && decoded.role) {
          setUser({ name: decoded.name, role: decoded.role });  // Set user info
        } else {
          console.warn("Decoded token does not contain expected fields.");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to homepage
  };

  return (
    <div>
      {/* Display appropriate header based on user login status */}
      {user ? (
        <LoggedInHeader user={user} handleLogout={handleLogout} />
      ) : (
        <LoggedOutHeader setShowLogin={openLogin} setShowSignup={openSignup} />
      )}

      {/* Display Login/Signup modals */}
      {showLogin && <Login closeModal={closeModal} setShowSignup={openSignup} setUser={setUser} />}
      {showSignup && <Signup closeModal={closeModal} setShowLogin={openLogin} />}

      <div className="container">
        <Routes>
          {/* Public Routes accessible for non-logged-in users */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/profile" element={<UserProfile />} />


          {/* Public Routes for Login and Signup */}
          <Route path="/login" element={
            <PublicRoute user={user}>
              <Login closeModal={closeModal} setShowSignup={openSignup} setUser={setUser} />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute user={user}>
              <Signup closeModal={closeModal} setShowLogin={openLogin} />
            </PublicRoute>
          } />

          {/* Admin Routes wrapped with ProtectedRoute */}
          <Route path="/admin" element={
            <ProtectedRoute user={user}>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/create-product" element={
            <ProtectedRoute user={user}>
              <AdminCreateProduct />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute user={user}>
              <AdminOrders />
            </ProtectedRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedRoute user={user}>
              <AdminCategories />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default App;
