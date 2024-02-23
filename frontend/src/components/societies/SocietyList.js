import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './SocietyList.css'; // import the CSS file
import { Link } from 'react-router-dom';
import AddSocietyChatCollections from './AddSocietyChatCollections';


const SocietiesList = () => {
  const [societies, setSocieties] = useState([]);
  const socieitesCollectionRef = collection(db, "societies");

  useEffect(() => {
    const getSocieties = async () => {
      const data = await getDocs(socieitesCollectionRef);
      setSocieties(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getSocieties();
  }, []);

  useEffect(() => {
    const addChats = async () => {
      await AddSocietyChatCollections();
    };

    addChats();
  }, []);


  return (
    <div>
      <div className="societies-list-container">
        <h1 className="societies-title">Societies List</h1>
        {societies.map((society) => (
          <Link key={society.id} to={`/societies/${society.id}`}>
            <button className="society-item-button">
              {society.id}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocietiesList;