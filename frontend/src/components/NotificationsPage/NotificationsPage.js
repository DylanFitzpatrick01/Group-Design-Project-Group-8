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
      <header className="NotificationsPage-header">
        <p>Notifications Page</p>
        <div>{getMessage.status === 200 ? 
          <h3>{getMessage.data.message}</h3>
          :
          <h3>LOADING</h3>}</div>
      </header>
      <div className="NotificationsList">
      <NotificationBlock notificationType="societyPost" />
      <NotificationBlock notificationType="directReply" />
      </div>
    </div>
  );
}

export default NotificationsPage;