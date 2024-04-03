import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './SocietyList.css';
import AddSocietyBar from './AddSocietyBar';
import AddSocietyChatCollections from './AddSocietyChatCollections';

const SocietyList = () => {
  const [societies, setSocieties] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [mySociety, setMySociety] = useState([]);
  const societiesCollectionRef = collection(db, 'societies');
  const auth = getAuth();

  // if the user is not logged in, redirect to the login page
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        console.log('User is not logged in');
        navigate('/');
      } else {
        fetchUserFavorites(user);
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // if user logged in as a society, redirect to society chat page
  useEffect(() => {
    const societyExists = localStorage.getItem('society') !== 'false';
    if (societyExists) {
      navigate(`/societies/${localStorage.getItem('society')}/info`);
    }
  }, [])

  const fetchSocieties = async () => {
    const data = await getDocs(societiesCollectionRef);
    setSocieties(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  useEffect(() => {
    const addChats = async () => {
      await AddSocietyChatCollections();
    };
    addChats();
  }, []);

  const fetchUserFavorites = (user) => {
    const userFavoritesRef = doc(db, 'userFavorites', user.email.split("@")[0]);
    onSnapshot(userFavoritesRef, (doc) => {
      if (doc.exists()) {
        setMySociety(doc.data().societies || []);
      } else {
        console.log('No user document');
      }
    });
  };

  const handleSearch = (searchTerm) => {
    const results = societies.filter(society =>
      society.id.toLowerCase().includes(searchTerm.toLowerCase())
      ,
    );
    setSearchResults(results);
  };

  const handleAddTomySociety = async (societyToAdd) => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }

    const user = auth.currentUser;
    const userFavoritesRef = doc(db, 'userFavorites', user.email.split("@")[0]);
    await updateDoc(userFavoritesRef, {
      societies: arrayUnion(societyToAdd),
    }).catch(async (error) => {
      if (error.code === 'not-found') {
        await setDoc(userFavoritesRef, { societies: [societyToAdd] });
      }
    });
  };

  return (
    <div>
      <div className='content-container'>
        <div className="societies-list-container">
          <h2 className="societies-title">Societies List</h2>
          {mySociety.map((society) => (
            <Link key={society.id} to={`/societies/${society.id}`}>
              <button className="society-item-button">
                {society.id}
              </button>
            </Link>
          ))}
        </div>
        <div className='search-section'>
          <AddSocietyBar onSearch={handleSearch} />
          {searchResults.length > 0 && (
            <div className='search-results'><br /><br /><br />
              <h2>&#8195;Results:</h2>
              {searchResults.map(society => (
                <div key={society.id} className='search-result-item'>
                  <div>
                    {society.id}<br />&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;
                    <button
                      className='add-button'
                      onClick={() => handleAddTomySociety(society)}
                    >
                      Add
                    </button>
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

export default SocietyList;
