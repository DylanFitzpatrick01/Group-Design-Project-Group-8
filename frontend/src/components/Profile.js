import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Profile.css'; // import the CSS file

function Profile() {
  const [getMessage, setGetMessage] = useState({})
  const [userInfo, setUserInfo] = useState({
    name: 'FIRSTNAME SURNAME', // Example name
    avatar: 'https://img2.doubanio.com/icon/ul135503917-1.jpg', // Example avatar URL
    yearOfStudy: 'Sophomore', // Example year of study
    courseTitle: 'Computer Science', // Example course title
  });
  const [posts, setPosts] = useState([
    {
      id: 1, title: 'My first post', content: 'This is my first post content!', date: '2023-01-01T12:00:00'
    },
    {
      id: 2, title: 'My second post', content: 'This is my second post content!', date: '2024-02-01T15:30:00'
    },
    // Add more posts here
  ]);


  useEffect(() => {
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="Profile">
      <header className="Profile-header">
        <p>React + Flask Tutorial @ Profile</p>
        <div>
          {getMessage.status === 200 ?
            <h3>{getMessage.data.message}</h3>
            :
            <h3>LOADING</h3>
          }
        </div>
      </header>
      <div className="profile-container">
        <div className="user-info">
          <div className="profile-picture">
            <img src={userInfo.avatar} alt="User avatar" />
          </div>
          <div className="user-details">
            <h1>{userInfo.name}</h1>
            <p>Year of study: {userInfo.yearOfStudy}</p>
            <p>Course title:  {userInfo.courseTitle}</p>
            <button className="btn add">Add</button>
            <button className="btn dm">DM</button>
          </div>
        </div>
        <div className="recent-posts">
          <h2>Recent Posts</h2>
          {posts.map(post => (
            <div key={post.id} className="post">
              <div className="post-date">POSTED - {new Date(post.date).toLocaleString()}</div>
              <div className="post-content">{post.content}</div>
              <div className="post-interactions">
                <span>Like (5)</span>
                <span>Comment (2)</span>
                <span>Share (0)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Profile;