import React, { useEffect, useState } from 'react';
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
async function sendChat(moduleCode, text, user) {
    try {
        await addDoc(collection(db, 'modules', moduleCode, 'chats'), {
            displayName: user.name,
            text: text,
            timestamp: serverTimestamp(),
            uid: user.email,
        });
    } catch (error) {
        console.error(error);
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
