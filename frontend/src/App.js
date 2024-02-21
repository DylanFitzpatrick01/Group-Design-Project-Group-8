import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'



import NewPage from './components/NewPage'; // import NewPage
import Societies from './components/Societies'; // import Societies page
import NotificationsPage from './components/NotificationsPage/NotificationsPage';
import ModulesList from './components/module/ModuleList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './components/chatPage/ChatPage'; // import ChatPage



function App() {

  return (
    <div className="App">
      <Router>
      // Navigation Bar component will go here
        
        <Routes>
          <Route path="/modules" element={<ModulesList />} />
          <Route path="/modules/:moduleCode" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;