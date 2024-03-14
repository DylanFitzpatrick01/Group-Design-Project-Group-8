import React, { useEffect, useState } from 'react';
import { db } from '../firebase.js';
import { doc, updateDoc } from "firebase/firestore";
import { getStatus } from './getStatus.js';

// a function to change the active status of current user
export default function changeActiveStatus(status) {
    console.log("Changing active status...");
    const userDocRef = doc(db, "users", localStorage.getItem('userPrefix'));
    updateDoc(userDocRef, {
        activeStatus: status
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}
