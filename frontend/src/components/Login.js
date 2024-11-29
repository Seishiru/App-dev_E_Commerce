import React, { useState } from 'react';
import '../css/AuthModal.css';

const Login = ({ closeModal, setShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful', data.token);
        closeModal();
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (err) {
      setErrorMessage('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-slide-up">
        <button className="close-x-button" onClick={closeModal}>&times;</button>
        <div className="modal-header">Login</div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-input-wrapper">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              className="password-input"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fas fa-eye eye-icon ${isPasswordVisible ? 'visible' : ''}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?{' '}
          <span onClick={() => { closeModal(); setShowSignup(true); }}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
