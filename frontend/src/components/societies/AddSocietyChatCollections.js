import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AddSocietyChatCollections = async () => {
    try {
        // Fetch all the modules in the modules collection
        const societiesSnapshot = await getDocs(collection(db, 'societies'));

        // Add a chats collection to evry fetched module
        await Promise.all(societiesSnapshot.docs.map(async doc => {
            const chatsCollection = collection(db, 'societies', doc.id, 'chats');
            const chatsSnapshot = await getDocs(chatsCollection);

            // only create chats sub collection if one doesn't already exist
            if (chatsSnapshot.empty) {
                await addDoc(chatsCollection, { });
              }        }));

        console.log("Chats added to all modules, yay!");
    } catch (error) {
        console.error("Error adding chats: ", error);
    }
};
export default AddSocietyChatCollections;