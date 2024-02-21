// src/ModulesList.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './ModuleList.css';
import { Link } from 'react-router-dom';


const ModulesList = () => {
  const [modules, setModules] = useState([]);
  const modulesCollectionRef = collection(db, "modules");

  useEffect(() => {
    const getModules = async () => {
      const data = await getDocs(modulesCollectionRef);
      setModules(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getModules();
  }, []);

  return (
    <div className="module-list-container">
      <h1 className="module-title">Module List</h1>
      <Link key={module.id} to={`/chat/csu44098`}>
        <button className="module-item-button">
          CSU44098 - Group Design Project
        </button>
      </Link>
      {modules.map((module) => (
        <div key={module.id} className="module-item">
          <p>{module.id} - {module.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ModulesList;
