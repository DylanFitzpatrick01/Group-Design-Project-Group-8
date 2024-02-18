import React, { useEffect, useState } from 'react';
import './Profile.css'; // import the CSS file
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase.js';


function AddUser() {
    const addUser = async () => {
        try {
            const docRef1 = await setDoc(doc(db, "users", "ballk"), {
                email: 'ballk@tcd.ie',
                name: 'Karen Ball',
                avatar: 'https://images.unsplash.com/photo-1587723958656-ee042cc565a1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                yearOfStudy: 1,
                courseTitle: 'Computer Science',
                activeStatus: 0,
                bio: 'Freshman at TCD 📚 | Diving into the world of Computer Science 💻'
            });
            const docRef2 = await setDoc(doc(db, "users", "petersa1"), {
                email: 'petersa1@tcd.ie',
                name: 'Amelia Peters',
                avatar: 'https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                yearOfStudy: 2,
                courseTitle: 'Computer Science',
                activeStatus: 0,
                bio: 'TCD Year 2 | CS Explorer 🚀 '
            });
            const docRef3 = await setDoc(doc(db, "users", "lambertse"), {
                email: 'lambertse@tcd.ie',
                name: 'Sebastian Lambert',
                avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                yearOfStudy: 3,
                courseTitle: 'Computer Science',
                activeStatus: 1,
                bio: 'Year 3 CS Major @ TCD | Tech Visionary 🌟'
            });
            console.log("Document written with ID: ", docRef1.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div className="AddUser">
            <div>
                <button onClick={addUser}>Add Demo Users</button>
            </div>
        </div >
    );
}

export default AddUser;