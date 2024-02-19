import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatComponent from './ChatComponent';
import { useUpdatedChats } from './SendReceiveChats';

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

function AllChatsForAModule({ moduleCode }) {
    const chats = useUpdatedChats(moduleCode);

    return (
        <>
            {chats.map((chat, index) => (
                <ChatComponent key={chat.id} message={chat.text} isMyMessage={false} timestamp={formatTimestamp(chat.timestamp)} name={chat.displayName}/>
            ))}
        </>
    );
}

export default AllChatsForAModule;