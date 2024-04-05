import { useEffect, useState } from 'react';
import { db } from '../../firebase.js';
import axios from 'axios'
import {
    collection,
    addDoc,
    getDoc,
    doc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    getDocs
} from 'firebase/firestore';

async function getUserEmailByID(userID) {
    try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.email;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (e) {
        console.error("Error fetching document: ", e);
    }
};


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
async function sendChat(userNames, societyOrModule, moduleCode, text, user, imageUrl = null) {
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

        if (typeof text !== 'string') {
            console.error('Invalid text:', text);
        }
        else if (text.includes('@')) {
            const wordsAfterAt = text.split('@')[1].split(' ');
            if (wordsAfterAt[0] === 'everyone') {
                sendEveryoneNotification(societyOrModule, moduleCode, text, user.name, user.avatar, user.id, serverTimestamp());
            } else {
                let username = '';
                let mentionedUserObj = null;
                for (let i = 0; i < wordsAfterAt.length; i++) {
                    username += (i > 0 ? ' ' : '') + wordsAfterAt[i];
                    mentionedUserObj = userNames.find(user => user.name === username);
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
        await addDoc(collection(db, societyOrModule, moduleCode, 'chats'), messageData);
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
    // send email
    const userEmail = await getUserEmailByID(mentionedUserID);
    const senderEmail = await getUserEmailByID(mentionedByUserID);
    axios.get(`http://localhost:5000/send_mail/${userEmail}?sender=${senderEmail}&module=${moduleCode}`)
        .then(response => console.log(response))
        .catch(error => console.error(error));

}

async function sendEveryoneNotification(societyOrModule, moduleCode, text, mentionedByUsername, mentionedByUserAvatar, mentionedByUserID, timestamp) {
    try {
        const querySnapshot = await getDocs(collection(db, societyOrModule, moduleCode, 'users'));
        const usernames = querySnapshot.docs.map((doc) => doc.id);

        for (const username of usernames) {
            if (username != mentionedByUserID) {
                const userNotificationsRef = collection(db, 'users', username, 'notifications');
                await addDoc(userNotificationsRef, {
                    mentionedBy: mentionedByUsername,
                    mentionedByAvatar: mentionedByUserAvatar,
                    mentionedByUserID: mentionedByUserID,
                    text: text,
                    timestamp: timestamp,
                    moduleCode: moduleCode,
                });
            }
        }

        // get all the usernames of the people who have favourited the module
        // add a notification for each of them from the person who mentioned everyone
        console.log('sending everyone notification');
    }
    catch (error) {
        console.error(error);
    }
}

// get all chats from a module and call getChatsOnChange every time the chats change
function getChats(societyOrModule, moduleCode, getChatsOnChange) {
    if (!societyOrModule) {
        console.log('societyOrModule is empty');
        return;
    }
    return onSnapshot(
        query(
            collection(db, societyOrModule, moduleCode, 'chats'),
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



function useUpdatedChats(societyOrModule, moduleCode) {
    const [chats, pullChats] = useState([]);
    useEffect(() => {
        const stopUpdates = getChats(societyOrModule, moduleCode, (newChats) => {
            pullChats(newChats);
        });

        return stopUpdates;
    }, [moduleCode]);

    return chats;
}

export { sendChat, getChats, useUpdatedChats, getAllUserNames };
