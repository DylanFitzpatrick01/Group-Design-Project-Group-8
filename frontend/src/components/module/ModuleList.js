import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './ModuleList.css';
import AddModuleBar from './AddModuleBar';
import AddChatCollections from './AddChatCollections';

const ModulesList = () => {
  const [modules, setModules] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [myModule, setmyModule] = useState([]);
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
    fetchModules();
  }, []);

  useEffect(() => {
    const addChats = async () => {
      await AddChatCollections();
    };

    addChats();
  }, []);

  const fetchModules = async () => {
    const data = await getDocs(modulesCollectionRef);
    setModules(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleSearch = (searchTerm) => {
    const results = modules.filter(module =>
      module.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddTomyModule = (moduleToAdd) => {
    setmyModule(prevList => {
      // Check if the module is already in the list to avoid duplicates
      const isAlreadyAdded = prevList.some(module => module.id === moduleToAdd.id);
      if (!isAlreadyAdded) {
        return [...prevList, moduleToAdd];
      }
      return prevList;
    });
  };

  return (
    <div>
      <div className="content-container">
        <div className="my-modules">
          <h2>My Modules</h2>
          {myModule.map((module) => (
            <Link key={module.id} to={`/modules/${module.id}`}>
              <button key={module.id} className="module-item-button">
                <div>{module.name}</div>
                <div>{module.id}</div>
              </button>
            </Link>
          ))}
        </div>
        <div className="search-section">
          <AddModuleBar onSearch={handleSearch} />
          {searchResults.length > 0 && (
            <div className="search-results"><br/><br/><br/>
              <h2>&#8195;Results:</h2>
              {searchResults.map((module) => (
                <div key={module.id} className="search-result-item">
                  <div>{module.name}</div>
                  <div>{module.id}&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;
                  <button className="add-button" onClick={() => handleAddTomyModule(module)}>Add</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    );
};

export default ModulesList;
