import React, { useState } from 'react';
import '../css/AuthModal.css';

const Signup = ({ closeModal, setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Basic validation for email input
    if (!email) {
      setErrorMessage('Email is required');
      setLoading(false);
      return;
    }

    try {
      // Sending the email to backend for verification code
      const response = await fetch('http://localhost:5000/api/auth/send-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Verification code sent to email');
        closeModal(); // Close modal upon success
        setEmail(''); // Clear email field after submission
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
      <div className="modal modal-slide-up">
        <button className="close-x-button" onClick={closeModal}>&times;</button>

        <div className="modal-header">Signup</div>
        
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Set email on change
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
          
          <p className="terms">
            By creating and/or using your account, you agree to our{' '}
            <a href="#" style={{ color: '#de4e00' }}>Terms of Use</a> and{' '}
            <a href="#" style={{ color: '#de4e00' }}>Privacy Policy</a>.
          </p>

          <button type="submit" disabled={loading}>
            {loading ? 'Sending code...' : 'Send code to email'}
          </button>
        </form>

        <p className="signup-link">
          Already have an account?{' '}
          <span onClick={() => { closeModal(); setShowLogin(true); }}>
            Log in Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
