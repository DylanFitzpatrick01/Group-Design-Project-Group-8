import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'



import NewPage from './components/NewPage'; // import NewPage
import Societies from './components/Societies'; // import Societies page
import NotificationsPage from './components/NotificationsPage/NotificationsPage';
import RegistrationPage from './components/registrationPage/RegistrationPage';
import ModulesList from './components/module/ModuleList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './components/chatPage/ChatPage'; // import ChatPage



function App() {

  return (
    <div className="App">
      // Navigation Bar component will go here
      <RegistrationPage/>
    </div>
  );
}

export default App;