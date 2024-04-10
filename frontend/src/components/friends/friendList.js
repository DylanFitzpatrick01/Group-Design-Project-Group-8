import React, { useEffect, useState } from 'react';

import { db } from '../../firebase.js';
import { doc, getDocs, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './friendList.css';

export default function FriendList() {
    const [friends, setFriends] = useState([]);
    const [edit, setEdit] = useState(false);
    const username = localStorage.getItem('userPrefix');
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                // Assuming the structure is /users/{userId}/friends
                // and each friend document contains the friend's details
                const friendsCollectionRef = collection(db, "users", username, "friends");
                const q = query(friendsCollectionRef, orderBy("name")); // Sort by name
                const querySnapshot = await getDocs(q);

                const friendsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log("Friends list: ", friendsList);
                setFriends(friendsList);
            } catch (error) {
                console.error("Failed to fetch friends: ", error);
            }
        };


        fetchFriends();

    }, []); // Rerun the effect if the userId parameter changes

    const navigate = useNavigate(); // Hook for navigation
    const handleCardClick = (uid) => {
        navigate(`/direct-messages/${uid}`);
    };

    const handleDeleteClick = async (friendId, event) => {
        event.stopPropagation(); // Stop the event from bubbling up to the parent
        try {
            // Assuming `username` is available in your component's scope
            // and corresponds to the current user's username.
            const docRef = doc(db, "users", username, "friends", friendId);
            await deleteDoc(docRef);
            console.log(`Friend with ID ${friendId} deleted successfully.`);

            // Optionally, refresh the friends list in the UI by removing the deleted friend
            setFriends(friends.filter(friend => friend.id !== friendId));
        } catch (error) {
            console.error("Error deleting friend: ", error);
        }
    };




    return (
        <div className="container position-relative">
            <h2 className="mt-4 mb-4 title">My Friends</h2>
            {/* Edit button positioned in the top right */}
            {friends.length > 0 && <button
                className="btn btn-secondary position-absolute top-0 end-0 mt-2 me-2 editbtn"
                onClick={() => setEdit(!edit)}
            >
                {edit ? "Done" : "Edit"}
            </button>
            }
            <div className="row">
                {friends.map(friend => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch" key={friend.id} onClick={() => handleCardClick(friend.uid)}>
                        <div className="card d-flex flex-column friendcard" style={{ cursor: 'pointer', position: 'relative' }}>
                            {edit && (
                                <button
                                    className="btn btn-danger position-absolute top-0 end-0"
                                    aria-label="Delete"
                                    onClick={(event) => handleDeleteClick(friend.uid, event)}
                                    style={{ zIndex: 99 }} // Ensure the button is clickable
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            )}
                            <img src={friend.avatar} className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt={friend.name} />
                            <div className="card-body d-flex flex-column flex-grow-1">
                                <h5 className="card-title">{friend.name}</h5>
                                <p className="card-text">{friend.courseTitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>


    );

}
