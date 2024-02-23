import React, {useEffect, useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; 
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getMessage, setGetMessage] = useState({});
  const [error, setError] = useState('');
  const googleProvider = new GoogleAuthProvider();
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  

  useEffect(() => {
    axios.get('http://localhost:5000/flask/hello')
      .then(response => {
        console.log("SUCCESS", response);
        setGetMessage(response); 
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    if (!email.endsWith("@tcd.ie")) {
      setError("Please use an account with a @tcd.ie email address.");
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile'); //login successfully, navigate to the profile page
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError("Account or password is incorrect.");
      } else if (error.code === 'auth/invalid-credential') {
        setError("Invalid credentials. Please try again.");
      } else if (error.code === 'auth/too-many-requests') {
        setError("Access to this account has been temporarily disabled due to many failed login attempts. You can restore it by resetting your password or try again later.");
      } else {
        setError("Login failed: " + error.message);
      }
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;
  
      // Check if the email address ends with '@tcd.ie'
      if (userEmail.endsWith("@tcd.ie")) {
        // Check if the user is a new user
        if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
          navigate('/registration'); // New user, navigate to the registration page
        } else {
          navigate('/profile'); // Existing user, navigate to the profile page.
        }
      } else {
        setError("Please use a @tcd.ie email address.");
        await result.user.delete();
      }
    } catch (error) {
      console.error("Error during Google login: ", error);
      setError(error.message);
    }
  };

  const goToRegistration = () => {
    navigate('/registration');
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent!");
    } catch (error) {
      console.error("Failed to send password reset email: ", error);
      setError("Failed to send password reset email.");
    }
  };

  const handleShowResetForm = () => {
    setShowResetForm(true);
  };

  return (
    <div className="LoginPage">
      <div className="Login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input 
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input 
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" className="button">Login with Email</button>
        </form>
        <button onClick={handleGoogleLogin} className="button">Login with Google</button>
        <p>Don't have an account? <span className="link" onClick={goToRegistration}>Register here</span>.</p>
        
        {!showResetForm && (
          <p>Forgot password? <span className="link" onClick={handleShowResetForm}>Reset</span>.</p>
        )}
        {showResetForm && (
          <div className="ResetPassword-container">
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter email for password reset"
              className="input-field"
            />
            <button onClick={handlePasswordReset} className="button">Send Reset Email</button>
          </div>
        )}  
        <div>
          {getMessage.status === 200 ? 
            <h3>{getMessage.data.message}</h3>
            :
            <h3></h3>}
        </div>
      </div>
    </div>
  );
}

export default Login;