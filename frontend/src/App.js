import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'


import Navbar from './components/NavBar';
import NotificationsPage from './components/NotificationsPage/NotificationsPage';
import RegistrationPage from './components/registrationPage/RegistrationPage';
import ModulesList from './components/module/ModuleList';
import SocietyList from './components/societies/SocietyList'; // import Societies page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './components/chatPage/ChatPage'; // import ChatPage
import Login from './components/LoginPage';
import Profile from './components/Profile';
import LogoutPage from './components/Logout';

const navLinks = [
  { to: "/modules", label: "Modules" },
  { to: "/societies", label: "Societies" },
  { to: "/notifications", label: <img src="bell.png" alt="Notifications" /> },
  { to: "/profile", label: <img src="profile.png" alt="Profile" /> },
  { to: "/logout", label: <img src="logout.png" alt="Logout" /> },

];

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar navLinks={navLinks} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/societies" element={<SocietyList />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/modules" element={<ModulesList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/modules/:moduleCode" element={<ChatPage rootPage={"/modules"} />} />
          <Route path="/societies/:moduleCode" element={<ChatPage rootPage={"/societies"} />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;