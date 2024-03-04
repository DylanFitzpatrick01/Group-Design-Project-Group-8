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
async function sendChat(moduleCode, text, user, imageUrl = null) {
    try {
        // 构建消息对象，如果提供了imageUrl，则包括这个字段
        const messageData = {
            displayName: user.name,
            text: text, // 文本内容，可以为空如果是仅发送图片
            timestamp: serverTimestamp(),
            uid: user.email,
            avatar: user.avatar,
        };

        // 如果提供了图片URL，将其添加到消息数据中
        if (imageUrl) {
            messageData.imageUrl = imageUrl;
        }

        // 将消息对象添加到对应模块的聊天集合中
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
