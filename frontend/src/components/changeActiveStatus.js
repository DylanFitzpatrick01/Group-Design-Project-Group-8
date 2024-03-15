import React from 'react';
import { db } from '../firebase.js';
import { doc, updateDoc } from "firebase/firestore";

// update the active status of the user
export default function changeActiveStatus(status) {
    console.log("Changing active status...");
    const userDocRef = doc(db, "users", localStorage.getItem('userPrefix'));

    return updateDoc(userDocRef, {
        activeStatus: status
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}
