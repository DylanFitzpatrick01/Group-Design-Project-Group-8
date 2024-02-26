import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './NotificationsPage.css'; // import the CSS file
import NotificationBlock from './NotificationBlock';  // adjust the path if necessary
import { useNavigate } from 'react-router-dom';

function NotificationsPage() {
  const [getMessage, setGetMessage] = useState({})

  // if the user is not logged in, redirect to the login page
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="NotificationsPage">
      <div className="NotificationsList">
        <NotificationBlock notificationType="societyPost" />
        <NotificationBlock notificationType="directReply" />
      </div>
    </div>
  );
}

export default NotificationsPage;