// src/HomePage.js
import React, { useState } from 'react';
import '../css/HomePage.css';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import AuthModal from '../components/AuthModal';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      {/* Topmost Header: Login and Signup */}
      <Header setShowLogin={setShowLogin} setShowSignup={setShowSignup} />

      {/* Subheader: Logo, Search Bar, Cart */}
      <SubHeader />

      {/* Login/Signup Modal */}
      {showLogin && <AuthModal type="login" closeModal={() => setShowLogin(false)} setShowLogin={setShowLogin} setShowSignup={setShowSignup} />}
      {showSignup && <AuthModal type="signup" closeModal={() => setShowSignup(false)} setShowLogin={setShowLogin} setShowSignup={setShowSignup} />}
    </div>
  );
};

export default HomePage;
