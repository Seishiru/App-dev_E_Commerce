import React, { useState } from 'react';
import '../css/AuthModal.css'; // Optional: Add your modal styling

const AuthModal = ({ type, closeModal, setShowLogin, setShowSignup }) => {
  const [closingModal, setClosingModal] = useState(false); // For handling close animation
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility state
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [loading, setLoading] = useState(false); // Loading state for button

  const handleClose = () => {
    setClosingModal(true);
    setTimeout(() => {
      closeModal(); // Close the modal after animation
      setClosingModal(false);
    }, 500); // Match animation duration
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  // Handle form submit for login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Basic client-side validation
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login (store token, redirect, etc.)
        console.log('Login successful', data.token);
        handleClose(); // Close the modal after successful login
        setEmail(''); // Clear the form
        setPassword(''); // Clear the form
      } else {
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (err) {
      setErrorMessage('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit for signup (email-based signup)
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Basic client-side validation
    if (!email) {
      setErrorMessage('Email is required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-email-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful email sending
        console.log('Verification code sent to email');
        handleClose(); // Close the modal after sending the code
        setEmail(''); // Clear the form
      } else {
        setErrorMessage(data.error || 'Failed to send verification code');
      }
    } catch (err) {
      setErrorMessage('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`modal ${closingModal ? 'modal-slide-down' : 'modal-slide-up'}`}>
        <button className="close-x-button" onClick={handleClose}>&times;</button>

        {/* Header */}
        <div className="modal-header">
          {type === 'login' ? (
            <>
              <span>Login</span> | <span>Email</span>
            </>
          ) : (
            'Signup'
          )}
        </div>

        {/* Login Form */}
        {type === 'login' ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
            />
            <div className="password-input-wrapper">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="password-input"
                placeholder="Please enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
              />
              <i 
                className={`fas fa-eye eye-icon ${isPasswordVisible ? 'visible' : ''}`} 
                onClick={togglePasswordVisibility} // Toggle on click
              ></i>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}
            <a href="#" className="forgot-password">Forgot password?</a>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          // Signup Form
          <form onSubmit={handleSignup}>
            <div className="email-input-wrapper">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
              />
            </div>
            <p className="terms">
              By creating and/or using your account, you agree to our 
              <a href="#" style={{ color: '#de4e00' }}> Terms of Use </a> and 
              <a href="#" style={{ color: '#de4e00' }}> Privacy Policy</a>.
            </p>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending code...' : 'Send code to email'}
            </button>
          </form>
        )}

        <p className="signup-link">
          {type === 'login' ? (
            <>Don't have an account?{' '}
              <span onClick={() => { handleClose(); setShowSignup(true); }}>Sign up</span>
            </>
          ) : (
            <>Already have an account?{' '}
              <span onClick={() => { handleClose(); setShowLogin(true); }}>Log in Now</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
