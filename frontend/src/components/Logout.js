import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userPrefix');
    localStorage.removeItem('userEmail');

    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Logged out successfully.');
      navigate('/');
    }).catch((error) => {
      console.error('Error occurred during logging out', error);
    });
  }, [navigate]);
  return null;
}

export default LogoutPage;
