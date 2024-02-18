import React, { useEffect, useState } from 'react';
import './Profile.css'; // import the CSS file
import { db } from '../firebase.js';
import { doc, getDoc } from "firebase/firestore";
import { getStatus } from './getStatus.js';
import { getYear } from './getYear.js';


// Profile takes a username (the name of the collection in FB) as a prop

function Profile({ username }) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    avatar: '',
    yearOfStudy: 0,
    courseTitle: '',
    activeStatus: 0,
    bio: ''
  });

  // TODO: replace this with a call to the backend
  const [posts, setPosts] = useState([
    {
      id: 1, title: 'My first post', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '2023-01-01T12:00:00', like: 5, comment: 2, share: 0
    },
    {
      id: 2, title: 'My second post', content: 'This is my second post content!', date: '2024-02-01T15:30:00', like: 14, comment: 6, share: 2
    },
    // Add more posts here
  ]);


  useEffect(() => {
    // get user profile from firebase
    const getUser = async () => {
      try {
        const docRef = doc(db, "users", username);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    getUser();
  }, [username])

  return (
    <div className="Profile">
      <div className="container">
        {/* profile card */}
        <div className="row mt-5 p-4 rounded border-0" id="profileCard">
          <div className="col-5 ">
            <div className="profile-picture">
              <img src={userInfo.avatar} alt="User avatar" className="img-fluid" />
            </div>
          </div>
          <div className="col-7 border-0 ">
            <div className="row ">
              <p className="text-start"><h1 id="userName">{userInfo.name}</h1></p>
            </div>
            <div className="row ">
              <div className="col-5 ">
                <div className="user-details text-start ">
                  <p>{getYear(userInfo.yearOfStudy)}</p>
                  <p>{userInfo.courseTitle}</p>
                  <p>{getStatus(userInfo.activeStatus)}</p>
                </div>
              </div>
              <div className="col-7 border-0 rounded d-flex justify-content-center align-items-center" id="bioCard">
                <p className="m-0">{userInfo.bio}</p>
              </div>
            </div>
          </div>
        </div>
        {/* interact btns */}
        <div className="row mt-3 d-flex justify-content-end">
          <div className="col-auto">
            <button className="btn bioBtn" >ADD</button>
          </div>
          <div className="col-auto" style={{ paddingRight: "0px" }}>
            <button className="btn bioBtn" >DM</button>
          </div>
        </div>
        {/* user posts */}
        <div className="row mt-4 text-start">
          <h2 id="recentPosts">Recent Posts</h2>
        </div>
        <div className="row mt-1 p-4 rounded border-0" id="userPosts">
          {/* head */}
          <div className="col">
            {posts.map(post => (
              <div key={post.id} className="row border-0 mb-4 post rounded">
                <div className="col-10 ms-3">
                  <div className="row border-0 text-start">
                    <p className="mt-3 mb-3 postTitle">{post.title} - {new Date(post.date).toLocaleString()}</p>
                  </div>
                  <div className="row border-0 text-start">
                    <p className="m-0 mb-3">{post.content}</p>
                  </div>
                </div>
                <div className="col-1 ms-3 postLnk d-flex flex-column justify-content-center">
                  <div className="row border-0"><a href="#">Like({post.like})</a></div>
                  <div className="row border-0"><a href="#">Comment({post.comment})</a></div>
                  <div className="row border-0"><a href="#">Share({post.share})</a></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Profile;