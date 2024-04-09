import { db } from '../firebase.js';
import { doc, updateDoc } from "firebase/firestore";

// update the active status of the user
export default async function changeActiveStatus(status) {
    console.log("Changing active status...");

    try {
        const userPrefix = localStorage.getItem('userPrefix'); // Assuming 'userPrefix' is stored in localStorage
        if (!userPrefix) {
            throw new Error("No userPrefix found in localStorage");
        }

        const userDocRef = doc(db, "users", userPrefix);
        await updateDoc(userDocRef, {
            activeStatus: status
        });
        console.log("Document successfully updated!");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}
