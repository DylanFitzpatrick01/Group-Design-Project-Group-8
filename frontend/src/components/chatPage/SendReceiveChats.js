import { useEffect, useState } from 'react';
import { db } from '../../firebase.js';
import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';

// add new chat to a module's chat collection
async function sendChat(moduleCode, text, user, imageUrl = null) {
    try {
        const messageData = {
            displayName: user.name,
            text: text, 
            timestamp: serverTimestamp(),
            uid: user.email,
            avatar: user.avatar,
        };

        // If the image URL is provided, add it to the message data
        if (imageUrl) {
            messageData.imageUrl = imageUrl;
        }
        //Adds the message object to the chat collection of the corresponding module
        await addDoc(collection(db, 'modules', moduleCode, 'chats'), messageData);
    } catch (error) {
        console.error("Failed to send chat:", error);
    }
}

// get all chats from a module and call getChatsOnChange every time the chats change
function getChats(moduleCode, getChatsOnChange) {
    return onSnapshot(
        query(
            collection(db, 'modules', moduleCode, 'chats'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const chats = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));

            getChatsOnChange(chats);
        }
    );
}

function useUpdatedChats(moduleCode) {
    const [chats, pullChats] = useState([]);

    useEffect(() => {
        const stopUpdates = getChats(moduleCode, (newChats) => {
            pullChats(newChats);
        });

        return stopUpdates;
    }, [moduleCode]);

    return chats;
}

export { sendChat, getChats, useUpdatedChats };
