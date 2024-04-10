import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import changeActiveStatus from './changeActiveStatus.js';
import checkSocietyEmail from './societies/checkSocietyEmail.js';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const googleProvider = new GoogleAuthProvider();
  const db = getFirestore();

  // if the user is already logged in, redirect to the profile page
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log("User is already logged in");
        navigate('/profile');
      }
    });

    return () => unsubscribe();
  }, []);



  const checkUserRegistration = async (user) => {
    console.log("Checking user registration...");
    console.log(user.uid);
    try {

      const token = await user.getIdToken();
      localStorage.setItem('accessToken', token); // Save the token to localStorage
      localStorage.setItem('userEmail', user.email); // Save the user email to localStorage
      // check if this is a society email
      console.log("here!!!!!!!!!!");
      const societyName = await checkSocietyEmail(user.email);
      if (societyName) {
        console.log("User is a society, redirecting to society page");
        localStorage.setItem('society', societyName);
        window.location.href = `/societies/${societyName}/info`;
        return;
      } else {
        console.log("User is not a society, take as normal user");
        localStorage.setItem('society', false);
      }

      // Query a user's specific document
      // use email prefix for Firestore query
      const prefix = user.email.split('@')[0];
      localStorage.setItem('userPrefix', prefix);
      const docRef = doc(db, 'users', prefix);
      const docSnap = await getDoc(docRef);

      // Check whether the document exists
      if (docSnap.exists()) {
        console.log("User is already registered, set active status to online.");
        await changeActiveStatus(1);
        window.location.href = '/profile';

      } else {
        window.location.href = '/registration';
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
      console.log("got to here");
      if (isAllowedDomain) {
        // After successful login, check whether the user is registered
        await checkUserRegistration(result.user);
        console.log("1");
      } else {
        console.log("2");
        await result.user.delete(); // Delete user accounts that do not meet the requirements
        setError("Please use an email address with a permitted domain (tcd.ie, csc.tcd.ie, gmail.com).");
      }
      console.log("3");
    } catch (error) {
      console.error("Error during Google login: ", error);
      setError(error.message);
    }
  };

  // const goToRegistration = () => {
  //   navigate('/registration');
  // };

  return (
    <div className="LoginPage">
      <div className="Login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleGoogleLogin} className="button">Login/Register with Google</button>

      </div>
    </div>
  );
}

export default Login;