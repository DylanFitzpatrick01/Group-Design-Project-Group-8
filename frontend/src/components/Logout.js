import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import changeActiveStatus from './changeActiveStatus.js';

function LogoutPage() {
  const navigate = useNavigate();
  // if the user is not logged in, redirect to the login page
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
    const auth = getAuth();
    const user = auth.currentUser;


    if (user && !localStorage.getItem('society')) {
      // if the user is logged in, change the active status to offline
      changeActiveStatus(0).then(() => {
        console.log('Status updated to offline.');
        // sign out the user
        signOut(auth).then(() => {
          console.log('Logged out successfully.');
          // remove the user's data from local storage
          localStorage.clear();
          window.location.href = '/';
        }).catch((error) => {
          console.error('Error occurred during logging out', error);
        });
      }).catch((error) => {
        console.error('Error updating status', error);
      });
    } else if (user && localStorage.getItem('society')) {
      // if the user is logged in as a society, sign out the user
      signOut(auth).then(() => {
        console.log('Logged out successfully.');
        // remove the user's data from local storage
        localStorage.clear();
        window.location.href = '/';
      }).catch((error) => {
        console.error('Error occurred during logging out', error);
      });
    }
  }, [navigate]);
  return null;
}

export default LogoutPage;
