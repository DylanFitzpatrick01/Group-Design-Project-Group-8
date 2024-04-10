import React, { useEffect, useState } from 'react';
import { db } from '../../firebase.js';
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
import User from '../../models/User.js';


function formatTimestamp(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const getUser = async () => {
    try {
        const docRef = doc(db, "users", localStorage.getItem('userPrefix'));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userID = docSnap.id;
            const { activeStatus, avatar, bio, courseTitle, email, name, yearOfStudy } = userData;
            const user = new User(userID, activeStatus, avatar, bio, courseTitle, email, name, yearOfStudy);
            return user;
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error fetching document: ", e);
    }
};


function GetAllNotificationsForUser(onNewNotification) {
    return getUser().then(user => {
        return onSnapshot(
            query(
                collection(db, 'users', user.id, 'notifications'),
                orderBy('timestamp', 'desc')
            ),
            (querySnapshot) => {
                const notifications = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return { 
                        mentionedBy: data.mentionedBy,
                        mentionedByAvatar: data.mentionedByAvatar,
                        mentionedByUserID: data.mentionedByUserID,
                        text: data.text,
                        timestamp: data.timestamp,
                        moduleCode: data.moduleCode,
                        type: data.type
                    };
                });

                onNewNotification(notifications);
            },
            (error) => {
                console.error("Error getting notifications: ", error);
            }
        );
    }).catch(error => {
        console.error("Error getting user: ", error);
    });
}

function useUpdatedNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [unsubscribe, setUnsubscribe] = useState(null);

    // have to do this because we can't use async in useEffect
    useEffect(() => {
        GetAllNotificationsForUser(setNotifications).then(unsub => {
            setUnsubscribe(() => unsub);
        });
    }, []);

    // then cleanup function once the async functin is done!
    useEffect(() => {
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [unsubscribe]);

    return notifications;
}


export {useUpdatedNotifications, formatTimestamp};