import React, {useEffect, useState} from 'react';
import './Modules.css';
import axios from "axios";

const moduleData = [
  { id: 1, name: 'Module A'},
  { id: 2, name: 'Module B'},
  { id: 3, name: 'Module C'},
  { id: 4, name: 'Module D'},
  { id: 5, name: 'Module E'},
  { id: 6, name: 'Module F'},
  { id: 7, name: 'Module G'},
  { id: 8, name: 'Module H'},
  { id: 9, name: 'Module I'},
  // Add additional modules as needed
];
function Modules() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (

  <div className="Modules">
        <header className="modules-header">
          <p>Modules</p>
          <div>{getMessage.status === 200 ?
            <h3>{getMessage.data.message}</h3>
          :
            <h3>LOADING</h3>}</div>
        </header>


    <div className="modules-container">


      <div className="module-list">
        {moduleData.map((mod) => (
          <div key={mod.id} className="module-item">
            <div className="module-name">{mod.name}</div>
          </div>
        ))}
      </div>
    <div className="chat-box">
      <div className="chat-messages">
        <div className="message">
          <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_3x2.jpg" alt="A" className="profile-image" />
          <p><span>Hello!</span> <span className="timestamp">10:00 AM</span></p>
        </div>
        <div className="message">
          <img src="https://www.mytwintiers.com/wp-content/uploads/sites/89/2022/07/Cat.jpg?w=2560&h=1440&crop=1" alt="B" className="profile-image" />
          <p><span>Hi there, how are you?</span> <span className="timestamp">10:01 AM</span></p>
        </div>
        <div className="message">
          <img src="https://cdn.i-scmp.com/sites/default/files/styles/portrait/public/d8/images/canvas/2023/01/26/c5800370-aa40-4866-a287-249d3244a604_0a9f1431.jpg?itok=eK4ubtVI&v=1674710907" alt="C" className="profile-image" />
          <p><span>See u guys then...</span> <span className="timestamp">10:03 AM</span></p>
        </div>

      </div>
      <input type="text" placeholder="Type your message..." className="chat-input" />
    </div>


   </div>
  </div>
  );
};

export default Modules;
