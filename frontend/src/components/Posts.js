// Post.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase.js';
import { doc, deleteDoc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import axios from 'axios';



function Posts({ initialPosts }) {

    const [posts, setPosts] = useState(initialPosts);
    const userEmail = localStorage.getItem('userEmail');

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

    // post fetch like count
    // count the numbers in firestore /posts/{postId}/likes/
    // return the number of likes
    const fetchLikeCount = async (postId) => {
        try {
            const likesRef = collection(db, "posts", postId, "likes");
            const querySnapshot = await getDocs(likesRef);
            return querySnapshot.size; // Returns the number of likes
        } catch (error) {
            console.error("Error getting likes count: ", error);
            return 0; // Return 0 if there's an error
        }
    };


    // Function to check if the current user has liked a post
    const checkUserLikeStatus = async (postId) => {
        try {
            if (!userEmail) {
                console.error("User email is not found.");
                return false; // if no user email is found, return false
            }
            const userLikeRef = doc(db, "posts", postId, "likes", userEmail);
            const userLikeSnap = await getDoc(userLikeRef);
            return userLikeSnap.exists();
        } catch (error) {
            console.error("Error checking user like status: ", error);
            return false;
        }
    };



    // post fetch share count
    // count the numbers in firestore /posts/{postId}/shares/
    // return the number of shares
    const fetchShareCount = async (postId) => {
        try {
            const sharesRef = collection(db, "posts", postId, "shares");
            const querySnapshot = await getDocs(sharesRef);
            return querySnapshot.size; // Returns the number of shares
        } catch (error) {
            console.error("Error getting shares count: ", error);
            return 0; // Return 0 if there's an error
        }
    };


    // Function to add a like or share to the post
    // actionType should be 'likes' or 'shares'
    // return the updated count of likes or shares
    const addInteraction = async (postId, actionType) => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                console.error("No email found in localStorage");
                return 0;
            }
            if (!postId) {
                throw new Error("Invalid post ID");
            }
            if (actionType !== 'likes' && actionType !== 'shares') {
                throw new Error("Invalid action type");
            }

            // Create a reference to the specific document in the collection
            const interactionDocRef = doc(db, "posts", postId, actionType, userEmail);
            // Set the document with the email as the ID
            await setDoc(interactionDocRef, { email: userEmail });

            // Fetch the updated counts
            if (actionType === 'likes') {
                return await fetchLikeCount(postId); // Assumes this function is already defined
            } else {
                return await fetchShareCount(postId); // Assumes this function is already defined
            }
        } catch (error) {
            console.error(`Error adding ${actionType} for user ${userEmail}: `, error);
            return 0;
        }
    };


    // Function to remove a like from the post
    const dislikePost = async (postId) => {
        try {
            if (!userEmail) {
                console.error("User email is not found.");
                return;
            }
            //  find the user's like document and delete it
            const userLikeRef = doc(db, "posts", postId, "likes", userEmail);
            await deleteDoc(userLikeRef);

            // recalculate the like count and return it
            const likesRef = collection(db, "posts", postId, "likes");
            const querySnapshot = await getDocs(likesRef);
            return querySnapshot.size; // return the new like count
        } catch (error) {
            console.error("Error when trying to dislike post: ", error);
            return 0; // return 0 if there's an error
        }
    };


    // update the like count when the page is loaded
    // update the number and save in post.like
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = [];
            for (let post of initialPosts) {
                const like = await fetchLikeCount(post.id);
                const share = await fetchShareCount(post.id);
                const isLiked = await checkUserLikeStatus(post.id);
                posts.push({ ...post, like, share, isLiked });
            }
            setPosts(posts);
        };
        fetchPosts();
    }, [initialPosts]);

    // Function to handle the like button click
    const handleLike = async (post) => {
        try {
            let likeCount;
            if (post.isLiked) {
                // if already liked, then dislike
                likeCount = await dislikePost(post.id);
                console.log(`Post with id ${post.id} unliked! New like count: ${likeCount}`);
            } else {
                // if not liked, then like
                likeCount = await addInteraction(post.id, 'likes');
                console.log(`Post with id ${post.id} liked! New like count: ${likeCount}`);
            }
            // update the like count in the UI
            setPosts(posts.map(p => p.id === post.id ? { ...p, like: likeCount, isLiked: !p.isLiked } : p));
        } catch (error) {
            console.error(`Error when trying to toggle like for post with id ${post.id}: `, error);
        }
    };


    // Function to handle the share button click
    const handleShare = async (post) => {
        try {
            const shareCount = await addInteraction(post.id, 'shares');
            console.log(`Post with id ${post.id} shared! New share count: ${shareCount}`);
            setPosts(posts.map(p => p.id === post.id ? { ...p, share: shareCount } : p));

            // use navigator.share to share the post
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Post from " + post.author,
                        text: post.content,
                        url: window.location.href,
                    });
                    console.log(`Post with id ${post.id} has been shared!`);
                } catch (error) {
                    console.error('Error sharing the post: ', error);
                }
            } else {
                // Web Share API error fallback
                try {
                    // copy the post URL to the clipboard
                    await navigator.clipboard.writeText("Post from " + post.author + " " + window.location.href);
                    alert('Link copied to clipboard. Share it with your friends!');
                    console.log('Link copied to clipboard.');
                } catch (error) {
                    console.error('Failed to copy link: ', error);
                }
            }

        } catch (error) {
            console.error(`Error when trying to share post with id ${post.id}: `, error);
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
                    <div key={post.id} className="row border-0 mb-2 post rounded">
                        <div className="col-10 ps-4">
                            <div className="row border-0 text-start">
                                <p className="mt-3 mb-3  postTitle">{post.title} - {new Date(post.date).toLocaleString()}</p>
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
                        <div className="col-2 postLnk d-flex flex-column justify-content-center">
                            <div className="row border-0"><a className='link' onClick={() => handleLike(post)}>{post.isLiked ? <i class="bi bi-heart-fill"></i> : <i class="bi bi-heart"></i>} Like({post.like})</a></div>
                            <div className="row border-0"><a className='link' onClick={() => handleShare(post)}><i class="bi bi-share-fill"></i> Share({post.share})</a></div>
                            {post.author === localStorage.getItem('society') && <div className="row border-0">
                                <a href="#" onClick={() => deletePost(post.id)}><i class="bi bi-trash3-fill"></i> Delete</a>
                            </div>}

                        </div>
                    </div>
                ))
            }
        </div >
    );
}

export default Posts;
