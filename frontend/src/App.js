import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

import NotificationsPage from './components/NotificationsPage/NotificationsPage';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <NotificationsPage />
      </header>
    </div>
  );
}

export default App;