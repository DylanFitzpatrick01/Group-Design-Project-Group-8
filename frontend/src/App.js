import logo from './logo.svg';
import './App.css';
import React, { Profiler, useEffect, useState } from 'react';
import axios from 'axios'

import NewPage from './components/NewPage'; // import NewPage

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
        <NewPage />
      </header>
    </div>
  );
}

export default App;