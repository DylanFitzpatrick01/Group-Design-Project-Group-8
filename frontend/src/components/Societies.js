import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios'
import './Societies.css'; // import the CSS file
import { useNavigate } from 'react-router-dom';

function Societies() {
  const [getMessage, setGetMessage] = useState({})
  const navigate = useNavigate();

  // if the user is not logged in, redirect to the login page
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        console.log("User is not logged in");
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);



  return (
    <div className="Societies">
      <header className="Societies-header">
        <p>Login</p>
        <div>{getMessage.status === 200 ?
          <h3>{getMessage.data.message}</h3>
          :
          <h3>LOADING</h3>}</div>
      </header>
    </div>
  );
}

export default Societies;