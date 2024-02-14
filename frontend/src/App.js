import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

import NewPage from './components/NewPage'; // import NewPage
import Societies from './components/Societies'; // import Societies page
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDAlrmNP4IydBXFKbj9ry7fZQmrswg1HKk",
  authDomain: "group-8---college-social-media.firebaseapp.com",
  projectId: "group-8---college-social-media",
  storageBucket: "group-8---college-social-media.appspot.com",
  messagingSenderId: "833481597283",
  appId: "1:833481597283:web:eeb23af113f6b5965bb356",
  measurementId: "G-CB5M15DR9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(() => {
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NewPage /> {}
      </header>
    </div>
  );
}

export default App;