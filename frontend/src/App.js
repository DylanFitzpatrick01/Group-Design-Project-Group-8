import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'


import Navbar from './components/NavBar';
import NewPage from './components/NewPage'; // import NewPage
import Societies from './components/Societies'; // import Societies page
import NotificationsPage from './components/NotificationsPage/NotificationsPage';
import ModulesList from './components/module/ModuleList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './components/chatPage/ChatPage'; // import ChatPage
import Login from './components/Login';

const navLinks = [
  { to: "/modules", label: "Modules" },
  { to: "/societies", label: "Societies" },
  { to: "/", label: "Login" },
  { to: "/notifications", label: <img src="bell.png" alt="Notifications"/> },

];

function App() {

  return (
    <div className="App">
      <Router>
      <Navbar navLinks={navLinks} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/modules" element={<ModulesList />} />
          <Route path="/modules/:moduleCode" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;