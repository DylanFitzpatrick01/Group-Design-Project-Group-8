// Post.js
import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, deleteDoc } from "firebase/firestore";
import axios from 'axios';



function Posts({ initialPosts }) {

    const [posts, setPosts] = useState(initialPosts);

    const deletePost = async (postId) => {
        try {
            const docRef = doc(db, "posts", postId);
            await deleteDoc(docRef);
            console.log("Post deleted successfully");
            setPosts(posts.filter(post => post.id !== postId));
        } catch (e) {
            console.error("Error deleting post: ", e);
        }
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


    return (
        <div className="col">
            {
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
                            {post.author === localStorage.getItem('society') && <div className="row border-0">
                                <a href="#" onClick={() => deletePost(post.id)}>Delete</a>
                            </div>}

                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Posts;
