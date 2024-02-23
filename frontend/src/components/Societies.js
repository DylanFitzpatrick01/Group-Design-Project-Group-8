import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Societies.css'; // import the CSS file

function Societies() {
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
    <div className="Societies">
      
    </div>
  );
}

export default Societies;