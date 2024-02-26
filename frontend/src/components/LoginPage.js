import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


function Login() {
  const navigate = useNavigate();
  const [getMessage, setGetMessage] = useState({});
  const [error, setError] = useState('');
  const googleProvider = new GoogleAuthProvider();
  const db = getFirestore()

  const checkUserRegistration = async (user) => {
    console.log("Checking user registration...");
    console.log(user.uid);
    try {

      const token = await user.getIdToken();
      localStorage.setItem('accessToken', token); // Save the token to localStorage
      localStorage.setItem('userEmail', user.email); // Save the user email to localStorage
      // Query a user's specific document
      // use email prefix for Firestore query
      const prefix = user.email.split('@')[0];
      localStorage.setItem('userPrefix', prefix);
      const docRef = doc(db, 'users', prefix);
      const docSnap = await getDoc(docRef);

      // Check whether the document exists
      if (docSnap.exists()) {
        navigate('/profile');

      } else {
        navigate('/registration');
      }
    } catch (error) {
      console.error("Error checking user registration:", error);
      setError("Failed to check user registration.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;

      // Check that the email address matches a specific suffix
      const allowedDomains = ["tcd.ie", "csc.tcd.ie", "gmail.com"];
      const isAllowedDomain = allowedDomains.some(domain => userEmail.endsWith(domain));

      if (isAllowedDomain) {
        // After successful login, check whether the user is registered
        await checkUserRegistration(result.user);
      } else {
        await result.user.delete(); // Delete user accounts that do not meet the requirements
        setError("Please use an email address with a permitted domain (tcd.ie, csc.tcd.ie, gmail.com).");
      }
    } catch (error) {
      console.error("Error during Google login: ", error);
      setError(error.message);
    }
  };

  const goToRegistration = () => {
    navigate('/registration');
  };

  return (
    <div className="LoginPage">
      <div className="Login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleGoogleLogin} className="button">Login with Google</button>
        <p>Don't have an account? <span className="link" onClick={goToRegistration}>Register here</span>.</p>
        {getMessage.status === 200 ?
          <h3>{getMessage.data.message}</h3>
          :
          <h3></h3>}

      </div>
    </div>
  );
}

export default Login;