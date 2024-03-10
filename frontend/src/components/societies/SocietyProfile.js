import React, { useEffect, useState } from 'react';
import './SocietyProfile.css'; // import the CSS file
import { db } from '../../firebase.js';
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Profile takes a society name (the name of the collection in FB) as a prop

function SocietyProfile({ name }) {
  const params = useParams();
  name = params.name;
  const [societyInfo, setSocietyInfo] = useState({
    name: name,
    email: '',
    avatar: './',
    instagram: '',
    into: 'Loading...',
    twitter: '',
    website: ''
  });

  const [posts, setPosts] = useState([
    {}]);

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
    // get user profile from firebase
    const getSociety = async () => {
      try {
        const docRef = doc(db, "societiesProfile", name);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setSocietyInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    const getPosts = async () => {
      try {
        // get user posts from firebase
        // query: where('author', '==', societyName);
        const q = query(collection(db, "posts"), where("author", "==", name));
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

    console.log("Name:");
    console.log(name);
    getSociety();
    getPosts();
  }, [name])


  return (
    <div className="Profile">
      <div className="container">
        {/* profile card */}
        <div className="row mt-5 p-4 rounded border-0" id="profileCard">
          <div className="col-4 ">
            <div className="soc-profile-picture">
              <img src={societyInfo.avatar} alt="User avatar" className="img-fluid" />
            </div>
          </div>
          <div className="col-8 border-0 ">
            <div className="row ">
              <p className="text-start">
                <h1 id="societyName">{societyInfo.name}
                  {societyInfo.instagram && <a href={"https://www.instagram.com/" + societyInfo.instagram} target="_blank" rel="noreferrer">
                    <i className="bi bi-instagram icon"></i>
                  </a>}
                  {societyInfo.twitter && <a href={"https://www.twitter.com/" + societyInfo.twitter} target="_blank" rel="noreferrer">
                    <i className="bi bi-twitter-x icon"></i>
                  </a>}
                  {societyInfo.facebook && <a href={"https://www.facebook.com/" + societyInfo.facebook} target="_blank" rel="noreferrer">
                    <i className="bi bi-facebook icon"></i>
                  </a>}
                  {societyInfo.website && <a href={societyInfo.website} target="_blank" rel="noreferrer">
                    <i className="bi bi-globe icon"></i>
                  </a>}
                </h1>
              </p>
            </div>
            <div className="row">
              <div className="col border-0 rounded d-flex justify-content-center align-items-center" id="bioCard">
                <p className="m-4">{societyInfo.intro}</p>
              </div>
            </div>
          </div>
        </div>


        {/* society posts */}
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

export default SocietyProfile;