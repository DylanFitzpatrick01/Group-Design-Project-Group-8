import React, { useEffect, useState } from 'react';
import './Modules.css';
import axios from "axios";
import ChatPage from './chatPage/ChatPage';

const moduleData = [
  { id: 1, name: 'Module CSU44098' },
  { id: 2, name: 'Module B' },
  { id: 3, name: 'Module C' },
  { id: 4, name: 'Module D' },
  { id: 5, name: 'Module E' },
  { id: 6, name: 'Module F' },
  { id: 7, name: 'Module G' },
  { id: 8, name: 'Module H' },
  { id: 9, name: 'Module I' },
  // Add additional modules as needed
];
function Modules() {
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

    <div className="Modules">
      <header className="modules-header">
        <p>Modules</p>
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
          <header className='moduleTitle'>
          CSU44098
          </header>
          {/* For each module, create a chatpage with that module code */}
          <ChatPage moduleCode={'csu44098'} />
        </div>
      </div>
    </div>
  );
};

export default Modules;
