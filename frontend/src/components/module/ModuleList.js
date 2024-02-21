// src/ModulesList.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './ModuleList.css';
import { Link } from 'react-router-dom';
import AddChatsCollections from './AddChatCollections';
import AddChatCollections from './AddChatCollections';
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

  useEffect(() => {
    const addChats = async () => {
      await AddChatCollections();
    };

    addChats();
  }, []);


  return (
    <div className="module-list-container">
      <h1 className="module-title">Module List</h1>
      {modules.map((module) => (
        <Link key={module.id} to={`/modules/${module.id}`}>
          <button className="module-item-button">
            {module.id} - {module.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ModulesList;
