import React, { useEffect, useState } from 'react';
import { db } from '../../firebase.js';
import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    getDocs
} from 'firebase/firestore';


function getAllUserNames() {
    return getDocs(query(collection(db, 'users'), orderBy('name', 'asc')))
        .then(querySnapshot => {
            return querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
        })
        .catch(error => {
            console.error("Error getting user names: ", error);
            return [];
        });
}

// add new chat to a module's chat collection
async function sendChat(moduleCode, text, user) {
    try {
        const allUserNames = await getAllUserNames();
        await addDoc(collection(db, 'modules', moduleCode, 'chats'), {
            displayName: user.name,
            text: text,
            timestamp: serverTimestamp(),
            uid: user.email,
            avatar: user.avatar,
        });

        if (text.includes('@')) {
            const mentionedUser = text.split('@')[1].split(' ', 2).join(' ');
            const mentionedUserObj = allUserNames.find(user => user.name === mentionedUser);
            if (mentionedUserObj) {
                sendMentionedNotification(moduleCode, text, user.name, user.avatar, user.id, mentionedUserObj.id, serverTimestamp());
            }
            else {
                console.log('no user found');
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function sendMentionedNotification(moduleCode, text, mentionedByUsername, mentionedByUserAvatar, mentionedByUserID, mentionedUserID, timestamp) {
    try{
        await addDoc(collection(db, 'users', mentionedUserID, 'notifications'), {
            mentionedBy: mentionedByUsername,
            mentionedByAvatar: mentionedByUserAvatar,
            mentionedByUserID: mentionedByUserID,
            text: text,
            timestamp: timestamp,
            moduleCode: moduleCode,
        });
    }
    catch (error) {
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
