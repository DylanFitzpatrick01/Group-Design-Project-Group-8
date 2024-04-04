import { db } from '../../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

async function checkSocietyEmail(email) {
    try {
        // Reference to the societiesProfile collection
        const societiesRef = collection(db, "societiesProfile");
        // Query for documents where the email field matches the provided email
        const q = query(societiesRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming email fields are unique, there should only be one document
            const societyData = querySnapshot.docs[0].data();
            return societyData.name;
        } else {
            return '';
        }
    } catch (error) {
        console.error("Error checking society email: ", error);
        return '';
    }
}

export default checkSocietyEmail;
