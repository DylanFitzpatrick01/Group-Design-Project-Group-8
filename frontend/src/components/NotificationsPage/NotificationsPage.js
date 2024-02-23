import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './NotificationsPage.css'; // import the CSS file
import NotificationBlock from './NotificationBlock';  // adjust the path if necessary

function NotificationsPage() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
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