import { db } from '../../firebase.js';
import {
    collection,
    doc,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    setDoc,
    where,
    getDocs,
    } 
    from 'firebase/firestore';

class DirectMessageService {
    static generateConversationId(uid1, uid2) {
        const sortedUids = [uid1, uid2].sort();
        return `chat_${sortedUids.join('_')}`;
    }

    static async initConversation(uid1, uid2) {
        const conversationId = this.generateConversationId(uid1, uid2);
        const conversationRef = doc(db, 'directMessages', conversationId);
        await setDoc(conversationRef, { createdAt: serverTimestamp() }, { merge: true });
        return conversationId;
    }

    static async sendMessage(conversationId, senderUid, text, imageUrl = null,displayName = '', senderEmail = '') {
        const messageData = {
            senderUid,
            text,
            imageUrl,
            timestamp: serverTimestamp(),
            displayName, 
            senderEmail, 
        };
        const messageRef = collection(db, `directMessages/${conversationId}/messages`);
        await addDoc(messageRef, messageData);
    }

    static async getUserInfo(uid) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
        return snapshot.docs[0].data();
        }
        throw new Error(`No such user with UID: ${uid}`);
    }

    static listenForMessages(conversationId, onNewMessages) {
        const messagesRef = query(collection(db, `directMessages/${conversationId}/messages`), orderBy('timestamp','asc'));
        return onSnapshot(messagesRef, (snapshot) => {
            const messages = snapshot.docs.map(doc => {
                const data = doc.data();
                // Convert the timestamp to a JavaScript Date object
                const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                const formattedDateTime = timestamp.toLocaleDateString('en-GB', {
                    day: '2-digit', month: '2-digit', year: '2-digit'
                }) + ' ' + timestamp.toLocaleTimeString('en-GB', {
                hour: '2-digit', minute: '2-digit', hour12: false
                });
                return { ...data, timestamp: formattedDateTime};
            });
        onNewMessages(messages);
        });
    }
}

export default DirectMessageService;