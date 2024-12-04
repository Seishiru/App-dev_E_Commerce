// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthModal.css';

const Login = ({ closeModal, setShowSignup, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Email and password are required');
      setLoading(false);
      return;
    }

    const loginData = { email, password };
    try {
      console.log('Login Request Body:', loginData);

      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);

      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser({ name: 'User Name' });  // Set the logged-in user's name or other details
        closeModal();  // Close the modal after successful login
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage('Login failed!');
      }
    } catch (err) {
      setErrorMessage('Error connecting to the server');
      console.error('Login error:', err);
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
