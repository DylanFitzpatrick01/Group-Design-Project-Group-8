import React, { useEffect, useState } from 'react';
import './Profile.css'; // import the CSS file
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase.js';


function AddUserPost() {
    const addUserPost = async () => {
        try {
            const docRef1 = await addDoc(collection(db, "posts"), {
                author: 'ballk',
                title: 'My first post',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                date: '2023-01-01T12:00:00',
                like: 5,
                comment: 2,
                share: 0
            })
            const docRef2 = await addDoc(collection(db, "posts"), {
                author: 'ballk',
                title: 'My second post',
                content: 'This is my second post content!',
                date: '2024-02-01T15:30:00',
                like: 14,
                comment: 6,
                share: 2
            })
            const docRef3 = await addDoc(collection(db, "posts"), {
                author: 'petersa1',
                title: 'Hi Trinity!',
                content: 'I love CS!',
                date: '2024-02-18T10:30:00',
                like: 0,
                comment: 0,
                share: 0
            });
            console.log("Document written with ID: ", docRef1.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div className="AddUserPost">
            <div>
                <button onClick={addUserPost}>Add Demo Posts</button>
            </div>
        </div >
    );
}

export default AddUserPost;