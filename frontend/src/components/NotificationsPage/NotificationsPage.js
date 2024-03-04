import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './NotificationsPage.css'; // import the CSS file
import NotificationBlock from './NotificationBlock';  // adjust the path if necessary
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { RetrieveNotifications, formatTimestamp } from './retrieveNotifications';

function NotificationsPage() {
  const [getMessage, setGetMessage] = useState({})
  const [directMentions, setDirectMentions] = useState([]); // Add this line
  // if the user is not logged in, redirect to the login page
  const navigate = useNavigate();

  useEffect(() => {
    RetrieveNotifications()
      .then(notifs => {
        if (Array.isArray(notifs)) {
          setDirectMentions(notifs);
        } else {
          console.error("Error: RetrieveNotifications did not return an array");
        }
      })
      .catch(error => console.error("Error retrieving notifications: ", error));


    // if the user is not logged in, redirect to the login page
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
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })
  }, []);
  return (
    <div className="NotificationsPage">
      <div className="NotificationsList">
        {directMentions.length > 0 ? (
          directMentions.map((notification) => (
            <NotificationBlock
              notificationType="directReply"
              mentionedBy={notification.mentionedBy}
              mentionedByAvatar={notification.mentionedByAvatar}
              mentionedByUserID={notification.mentionedByUserID}
              moduleCode={notification.moduleCode}
              timestamp={formatTimestamp(notification.timestamp)}
              message={notification.text}
            />
          ))
        ) : (
          <div className='no-notifs-block-outer'>
            <div className="no-notifs-block"><p>No Notifications</p></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;