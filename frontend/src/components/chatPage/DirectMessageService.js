import { db } from '../../firebase.js';
import {
    collection,
    doc,
    addDoc,
    getDoc,
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
        console.log(uid1 + "   " + uid2);
        const conversationId = this.generateConversationId(uid1, uid2);
        const conversationRef = doc(db, 'directMessages', conversationId);
        await setDoc(conversationRef, {
            createdAt: serverTimestamp(),
            uid1: uid1,
            uid2: uid2
        }, { merge: true });
        return conversationId;
    }

    static async sendMessage(conversationId, senderUid, text, imageUrl = null, displayName = '', senderEmail = '') {
        let timestamp = serverTimestamp();
        const messageData = {
            senderUid,
            text,
            imageUrl,
            timestamp: timestamp,
            displayName,
            senderEmail,
        };
        const messageRef = collection(db, `directMessages/${conversationId}/messages`);
        await addDoc(messageRef, messageData);
        await DirectMessageService.sendMentionedNotification(conversationId, text, senderUid, timestamp, displayName)
    }

    static async getReceiverfromConversationID(conversationId, sender) {
        const conversationRef = doc(db, 'directMessages', conversationId);
        const conversationSnap = await getDoc(conversationRef);

        if (!conversationSnap.exists()) {
            console.log('No such conversation!');
            return;
        }

        const { uid1, uid2 } = conversationSnap.data();

        let receiverId = sender === uid1 ? uid2 : uid1;
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("uid", "==", receiverId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log('No such user!');
            return;
        }
        return querySnapshot.docs[0].id;
    }

    static async getSenderIDAndAvatarByUID(uid) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('No such user!');
            return;
        }
        return { id: querySnapshot.docs[0].id, avatar: querySnapshot.docs[0].data().avatar };
    }


    // trying to use same format as notifications but need to get the receiver id too
    static async sendMentionedNotification(conversationId, text, senderUid, timestamp, displayName) {
        try {
            try {
                const receiverId = await DirectMessageService.getReceiverfromConversationID(conversationId, senderUid);
                if (!receiverId) {
                    console.log('No receiver found!');
                    return;
                }

                try {
                    const { id, avatar } = await DirectMessageService.getSenderIDAndAvatarByUID(senderUid);
                    await addDoc(collection(db, 'users', receiverId, 'notifications'), {
                        mentionedBy: displayName,
                        mentionedByAvatar: avatar,
                        mentionedByUserID: id,
                        text: text,
                        type: 'newDm',
                        timestamp: timestamp,
                        moduleCode: conversationId,
                    });
                } catch (error) {
                    console.error('Error getting sender ID and avatar:', error);
                }

            } catch (error) {
                console.error('Error getting receiver ID:', error);
            }
        }
        catch (error) {
            console.error(error);
        }
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
        const messagesRef = query(collection(db, `directMessages/${conversationId}/messages`), orderBy('timestamp', 'asc'));
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
                return { ...data, timestamp: formattedDateTime };
            });
            onNewMessages(messages);
        });
    }
}

export default DirectMessageService;