import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthModal.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection

const Login = ({ closeModal, setShowSignup, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize the navigate function for redirection

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

        // Set the user state with name and role
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,  // Add role here
        });

        closeModal();
        setEmail('');
        setPassword('');

        // Redirect based on the role
        if (response.data.user.role === 'admin') {
          navigate('/admin'); // Admin user, redirect to admin page
        } else {
          navigate('/'); // Regular user, redirect to home page
        }
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
