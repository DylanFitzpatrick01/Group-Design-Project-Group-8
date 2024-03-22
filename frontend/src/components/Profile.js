import React, { useEffect, useState } from 'react';
import './Profile.css'; // import the CSS file
import { storage, db } from '../firebase.js';
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { getStatus } from './getStatus.js';
import { getYear } from './getYear.js';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import { updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import changeActiveStatus from './changeActiveStatus.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


// Profile takes a username (the name of the collection in FB) as a prop

function Profile({ username }) {
  const params = useParams();
  username = params.id || localStorage.getItem('userPrefix');
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    avatar: '',
    yearOfStudy: 0,
    courseTitle: '',
    activeStatus: 0,
    bio: ''
  });

  const [posts, setPosts] = useState([
    {}]);

  const [originalAvatar, setOriginalAvatar] = useState(userInfo.avatar); 
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editableBio, setEditableBio] = useState(userInfo.bio); 
  const [originalBio, setOriginalBio] = useState(userInfo.bio);

  const handleStatusChange = (newStatus) => {
    setUserInfo(prevState => ({
      ...prevState,
      activeStatus: newStatus,
    }));
    changeActiveStatus(newStatus);
  };

  const uploadAvatar = async (file) => {
    const storageRef = ref(storage, `avatars/${file.name}`);
    try {
      const uploadResult = await uploadBytes(storageRef, file);
      const avatarUrl = await getDownloadURL(uploadResult.ref);
      return avatarUrl;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const updateProfileAvatar = async (username, avatarUrl) => {
    const userRef = doc(db, "users", username);
    await updateDoc(userRef, { avatar: avatarUrl });
  };
  
  const toggleBioEdit = () => {
    if (!isEditingBio) {
      setOriginalBio(userInfo.bio);
    } else {
      setEditableBio(originalBio);
    }
    setIsEditingBio(!isEditingBio);
  };

// When the edit icon/button is clicked
  const handleEditAvatarClick = () => {
    setIsEditingAvatar(true);
  };

// Handling file input change and upload
  const handleAvatarChange = async (event) => {
    console.log("File input changed"); 
    const file = event.target.files[0];
    if (!file) return;

    try {
      const avatarUrl = await uploadAvatar(file);
      setUserInfo({ ...userInfo, avatar: avatarUrl }); 
      setIsEditingAvatar(false); 
    } catch (error) {
      console.error("Failed to upload new avatar: ", error);
    }
  };

  const cancelAvatarEdit = () => {
    setIsEditingAvatar(false);
    setUserInfo({ ...userInfo, avatar: originalAvatar }); 
  };

  useEffect(() => {
    setOriginalAvatar(userInfo.avatar);
  }, [userInfo.avatar]);


// Function to save the new bio to Firestore
const saveBio = async () => {
  try {
    const userRef = doc(db, "users", username);
    await updateDoc(userRef, { bio: editableBio });
    setIsEditingBio(false);
    setUserInfo({ ...userInfo, bio: editableBio }); // Update local state
  } catch (error) {
    console.error("Error updating bio: ", error);
  }
};

  // if the user is not logged in, redirect to the login page
  const navigate = useNavigate();
  // if the user is not logged in, redirect to the login page
  useEffect(() => {
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
    // Define the function to fetch user profile
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

    // Define the function to fetch user posts
    const getPosts = async () => {
      try {
        const q = query(collection(db, "posts"), where("author", "==", username));
        const docSnap = await getDocs(q);
        if (!docSnap.empty) {
          const posts = [];
          docSnap.forEach((doc) => {
            posts.push(doc.data());
          });
          console.log("Posts data:", posts);
          setPosts(posts);
        } else {
          console.log("No matching documents.");
        }
      } catch (e) {
        console.error("Error getting documents: ", e);
      }
    };

    // Execute getUser and getPosts immediately
    getUser();
    getPosts();

    // Set a timeout to re-fetch the data after 1 second, but only once
    // to update the online status of the user
    const timer = setTimeout(() => {
      getUser();
      getPosts();
      console.log("Data re-fetched after 1 second.");
    }, 1000);

    // Cleanup function to clear the timer if the component unmounts before the timer fires
    return () => clearTimeout(timer);

  }, [username]); // Dependencies array to run the effect when `username` changes


  return (
    <div className="Profile">
      <div className="container">
        {/* profile card */}
        <div className="row mt-5 p-4 rounded border-0" id="profileCard">
          <div className="col-5 ">
            <div className="profile-picture">
            <img src={userInfo.avatar} alt="User avatar" className="img-fluid" />
            {!isEditingAvatar && (
              <button onClick={handleEditAvatarClick} className="editBtn">✏️</button>
            )}
            {isEditingAvatar && (
              <>
                <div className="fileInputBtn">
                  <label htmlFor="file-upload">Choose File</label>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>
                <button onClick={cancelAvatarEdit} className="cancelEditBtn">Cancel</button>
              </>
            )}
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
                  {params.id ? (
                    <p>{getStatus(userInfo.activeStatus)}</p>
                  ) : (
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {userInfo.activeStatus === 0 && "🔘 Invisible"}
                        {userInfo.activeStatus === 1 && "🟢 Online"}
                        {userInfo.activeStatus === 2 && "🔴 Busy"}
                        {userInfo.activeStatus === 3 && "🟡 Away"}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" type="button" onClick={() => handleStatusChange(1)}>🟢 Online</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => handleStatusChange(2)}>🔴 Busy</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => handleStatusChange(3)}>🟡 Away</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => handleStatusChange(0)}>🔘 Invisible</button></li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-7 border-0 rounded d-flex justify-content-center align-items-center" id="bioCard">
                {isEditingBio ? (
                  <>
                    <textarea
                    className="bioTextarea"
                      value={editableBio}
                      onChange={e => setEditableBio(e.target.value)}
                      autoFocus
                    />
                    <div className="editBtnContainer">
                      <button onClick={saveBio} className="bioSaveBtn">Save</button>
                      <button onClick={toggleBioEdit} className="bioCancelBtn">Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="m-0"
                      dangerouslySetInnerHTML={{
                         __html: userInfo.bio.replace(/\n/g, '<br />'),
                      }}
                    ></p>
                    {!params.id && (
                      <div className="editBtnContainer">
                        <button onClick={toggleBioEdit} className="bioEditBtn">✏️</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* interact btns */}
        {/* not visible when checking self profile */}
        {params.id && (
          <div className="row mt-3 d-flex justify-content-end">
            <div className="col-auto">
              <button className="btn bioBtn" >ADD</button>
            </div>
            <div className="col-auto" style={{ paddingRight: "0px" }}>
              <button className="btn bioBtn" >DM</button>
            </div>
          </div>
        )}
        {/* user posts */}
        <div className="row mt-4 text-start">
          <h2 id="recentPosts">Recent Posts</h2>
        </div>
        <div className="row mt-1 p-4 rounded border-0" id="userPosts">
          {/* head */}
          <div className="col">
            {posts[0].date ? (
              posts.map(post => (
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
              ))
            ) : "No posts found."}
          </div>

        </div>
      </div>
    </div >
  );
}

export default Profile;