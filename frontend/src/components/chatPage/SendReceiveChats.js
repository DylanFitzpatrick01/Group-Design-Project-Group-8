import { useEffect, useState } from 'react';
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

        // since some usernames have multiple spaces
            // we need to check for usernames after an '@' symbol
        
        const allUserNames = await getAllUserNames();
        if (text.includes('@')) {
            const wordsAfterAt = text.split('@')[1].split(' ');
            if (wordsAfterAt[0] === 'everyone') {
                sendEveryoneNotification(moduleCode, text, user.name, user.avatar, user.id, serverTimestamp());
            } else {
                let username = '';
                let mentionedUserObj = null; 
                for (let i = 0; i < wordsAfterAt.length; i++) {
                    username += (i > 0 ? ' ' : '') + wordsAfterAt[i];
                    mentionedUserObj = allUserNames.find(user => user.name === username);
                    if (mentionedUserObj) {
                        break;
                    }
                }
                if (mentionedUserObj) { 
                    sendMentionedNotification(moduleCode, text, user.name, user.avatar, user.id, mentionedUserObj.id, serverTimestamp());
                } else {
                    console.log('no user found');
                }
            }
        }
        await addDoc(collection(db, 'modules', moduleCode, 'chats'), messageData);
    } catch (error) {
        console.error("Failed to send chat:", error);
    }
}

async function sendMentionedNotification(moduleCode, text, mentionedByUsername, mentionedByUserAvatar, mentionedByUserID, mentionedUserID, timestamp) {
    try {
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

async function sendEveryoneNotification(moduleCode, text, mentionedByUsername, mentionedByUserAvatar, mentionedByUserID, timestamp) {  
    try {
        // get all the usernames of the people who have favourited the module
        // add a notification for each of them from the person who mentioned everyone
        console.log('sending everyone notification');
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
