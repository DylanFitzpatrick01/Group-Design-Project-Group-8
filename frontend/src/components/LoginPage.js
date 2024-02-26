import React, {useEffect, useState } from 'react';
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

  const checkUserRegistration = async (user) => {
    try {

      const token = await user.getIdToken();
      localStorage.setItem('accessToken', token); // Save the token to localStorage
      // Query a user's specific document
      const docRef = doc(db, 'users', user.uid);
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

    // 检查电子邮件地址是否符合特定后缀
      const allowedDomains = ["tcd.ie", "csc.tcd.ie", "gmail.com"];
      const isAllowedDomain = allowedDomains.some(domain => userEmail.endsWith(domain));

      if (isAllowedDomain) {
      // 登录成功后，检查用户是否已注册
        await checkUserRegistration(result.user);
    } else {
      await result.user.delete(); // 可选：删除不符合条件的用户账户
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