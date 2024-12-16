import React, { useState, useEffect } from 'react';
import '../css/AuthModal.css';

const Signup = ({ closeModal, setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // New state for password
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1 for email, Step 2 for verification code
  const [timeLeft, setTimeLeft] = useState(0); // Track time left for resend
  const [isResendAvailable, setIsResendAvailable] = useState(true); // To enable/disable resend button

  // Start countdown for resend time limit (60 seconds)
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsResendAvailable(true); // Enable resend once timeLeft reaches 0
    }
  }, [timeLeft]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      setLoading(false);
      return;
    }
  
    try {
      // Send both email and password in the request body
      const response = await fetch('http://localhost:5000/api/auth/send-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Send email and password
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Verification code sent to email');
        setStep(2);
        setTimeLeft(60); // Start 1-minute countdown when email is sent
        setIsResendAvailable(false); // Disable the "Resend" button
      } else {
        setErrorMessage(data.error || 'Failed to send verification code');
      }
    } catch (err) {
      setErrorMessage('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    if (!verificationCode) {
      setErrorMessage('Verification code is required');
      setLoading(false);
      return;
    }
  
    try {
      const requestBody = { email, code: verificationCode };
      console.log('Request Body (Frontend):', requestBody); // Log to see what is being sent
  
      const response = await fetch('http://localhost:5000/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      console.log('Response Data (Frontend):', data); // Log the response to get more insights
  
      if (response.ok) {
        console.log('Verification successful');
        closeModal(); // Close the modal after successful verification
        setEmail(''); // Reset email field
        setPassword(''); // Reset password field
        setVerificationCode(''); // Reset verification code field
      } else {
        setErrorMessage(data.error || 'Invalid verification code');
      }
    } catch (err) {
      console.log('Error:', err); // Log any connection or network issues
      setErrorMessage('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };
   

  // Resend the verification code
  const handleResendCode = async () => {
    if (isResendAvailable) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Verification code resent to email');
        setTimeLeft(60); // Restart the countdown
        setIsResendAvailable(false); // Disable resend button
      } else {
        setErrorMessage(data.error || 'Failed to resend verification code');
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

        <div className="modal-header">{step === 1 ? 'Signup' : 'Verify Code'}</div>

        {step === 1 ? (
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Set email on change
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Set password on change
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
        ) : (
          <form onSubmit={handleVerification}>
            <input
              type="text"
              placeholder="Enter the verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)} // Set verification code
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

            <button type="submit" disabled={loading}>
              {loading ? 'Verifying code...' : 'Verify Code'}
            </button>

            {!isResendAvailable && timeLeft > 0 ? (
              <p>Resend code in {timeLeft}s</p>
            ) : (
              <button type="button" onClick={handleResendCode} disabled={isResendAvailable}>
                Resend Code
              </button>
            )}
          </form>
        )}

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
