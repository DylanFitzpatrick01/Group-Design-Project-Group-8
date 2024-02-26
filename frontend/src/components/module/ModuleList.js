// src/ModulesList.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './ModuleList.css';
import { Link, useNavigate } from 'react-router-dom';
import AddChatCollections from './AddChatCollections';
import AddModuleBar from './AddModuleBar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const ModulesList = () => {
  const [modules, setModules] = useState([]);
  const modulesCollectionRef = collection(db, "modules");

  // if the user is not logged in, redirect to the login page
  const navigate = useNavigate();
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
    <div>
      <AddModuleBar />
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
    </div>
  );
};

export default ModulesList;