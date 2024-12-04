import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";
import LoggedOutHeader from "./components/LoggedOutHeader"; // Import the Logged Out Header
import LoggedInHeader from "./components/LoggedInHeader"; // Import the Logged In Header
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./css/style.css";

const App = () => {
  const [user, setUser] = useState(null); // User state to manage login
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
    navigate("/login");
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
    navigate("/signup");
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
      // Decode or validate the token and set the user (this is a placeholder)
      setUser({ name: "John Doe" }); // Replace with real decoding logic
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    setUser(null); // Remove user state
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to home
  };

  return (
    <div>
      {/* Conditionally Render Headers Based on User State */}
      {user ? (
        <LoggedInHeader user={user} handleLogout={handleLogout} />
      ) : (
        <LoggedOutHeader setShowLogin={openLogin} setShowSignup={openSignup} />
      )}

      {/* Login and Signup Modals */}
      {showLogin && <Login closeModal={closeModal} setShowSignup={openSignup} setUser={setUser} />}
      {showSignup && <Signup closeModal={closeModal} setShowLogin={openLogin} />}

      {/* Routes */}
      <div className="container">
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
    </div>
  );
};

export default App;
