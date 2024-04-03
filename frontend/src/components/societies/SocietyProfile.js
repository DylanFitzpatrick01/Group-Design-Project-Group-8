import React, { useEffect, useState } from 'react';
import './SocietyProfile.css'; // import the CSS file
import { db } from '../../firebase.js';
import { doc, getDoc, getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios'; // Import Axios library for making HTTP requests

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

  const [summary, setSummary] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([
    {}]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAddEventButton, setShowAddEventButton] = useState(false); // State to manage visibility of the Add Event button

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the event object with the form values
    const event = {
      summary,
      location,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Europe/Dublin',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Europe/Dublin',
      },
      recurrence: [''],
      attendees: [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };
    const eventString = JSON.stringify(event);
    // Now you can send this event object to your backend API to create the event
    try {
      // Make HTTP POST request to Flask backend
      const currentDate = new Date();
      const docRef = await addDoc(collection(db, "posts"), {
        author: name,
        comment: 0,
        content: name + " has just created a new event! \nEvent: " + event.summary + "\nWhen: " + new Date(event.start.dateTime).toLocaleString() + " - " + new Date(event.end.dateTime).toLocaleString() + "\nWhere: " + event.location + "\nDescription: " + event.description,
        date: currentDate.toISOString(),
        like: 0,
        share: 0,
        title: `New Event! ${event.summary}`,
        isEvent: true,
        eventDetails: eventString
      });
      setShowEventForm(false);
      const response = await axios.post('http://localhost:8000//societies/:name/info', event);
      console.log('Event created:', response.data);
    } catch (error) {
      console.error('Error creating event:', error.response.data);
    }
  };

  const handleAddEventClick = () => {
    setShowEventForm(true); // Set showEventForm to true when "Add Event" button is clicked
    setShowAddEventButton(false); // Hide the Add Event button
  };

  const handleCloseEventBoxClick = () => {
    setShowEventForm(false);
    setShowAddEventButton(true);
  };

  const handleAddToCalendarClick = async (event) => {
    try {
      // Make HTTP POST request to Flask backend
      const response = await axios.post('http://localhost:8000/societies/:name/info', event, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Event created:', response.data);
    } catch (error) {
      console.error('Error creating event:', error.response.data);
    }
  };

  // if the user's society is the same as the profile, show the add event button
  useEffect(() => {
    if (localStorage.getItem('society') === name) {
      setShowAddEventButton(true);
    }
  }, [name]);

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
                      <pre className="m-0 mb-3">{post.content}</pre>
                      {post.isEvent && (
                        <div className="row border-0">
                          <button className='btn btn-primary' id="addToCalendar" onClick={() => handleAddToCalendarClick(post.eventDetails)}>Add to Calendar</button>
                        </div>
                      )}
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

        {showEventForm && (
          <div className="container mt-4 p-4 rounded border-0" id="createEvent">
            <h2 id="createEventTitle">Create Event</h2>
            <form onSubmit={handleSubmit}>
              <div class="row mb-3">
                <div class="col">
                  <label for="eventTitle" class="form-label">Title:</label>
                  <input type="text" class="form-control" id="eventTitle" value={summary} onChange={(e) => setSummary(e.target.value)} />
                </div>
                <div class="col">
                  <label for="eventLocation" class="form-label">Location:</label>
                  <input type="text" class="form-control" id="eventLocation" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col">
                  <label for="start" class="form-label">Start Date Time:</label>
                  <input type="datetime-local" class="form-control" id="start" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} />
                </div>
                <div class="col">
                  <label for="end" class="form-label">End Date Time:</label>
                  <input type="datetime-local" class="form-control" id="end" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col">
                  <label for="eventDescription" class="form-label">Description:</label>
                  <textarea class="form-control" id="eventDescription" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
              </div>
              <button class="btn btn-primary" type="submit" onClick={handleSubmit} id="createEventButton">Create Event</button>
              <button type="button" class="btn btn-secondary ms-2" onClick={handleCloseEventBoxClick} id="closeEventBoxButton">Close</button>
            </form>
          </div>
        )}


        {showAddEventButton && (
          <div className="row mt-4">
            <div className="col">
              <button onClick={handleAddEventClick} className="btn btn-primary" id="addEventButton">Add Event</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SocietyProfile;