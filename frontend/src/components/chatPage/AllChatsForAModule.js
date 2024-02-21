import React, { useEffect, useRef } from 'react';
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

function checkUser(username, currentUser) {
    if (username === currentUser) {
        return true;
    }
    else return false;
}

function AllChatsForAModule({ moduleCode }) {
    const chats = useUpdatedChats(moduleCode);

    // for testing purposes only but when user is logged in, this will be the current user
    const currentUser = "Karen Ball";

    // reference to the latest message so we can auto scroll there
    const endOfMessagesRef = useRef(null);
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    return (
        <>
            <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                {chats.map((chat, index) => (
                    <ChatComponent
                        key={chat.id}
                        message={chat.text}
                        isMyMessage={checkUser(chat.displayName, currentUser)} // testing
                        timestamp={formatTimestamp(chat.timestamp)}
                        name={chat.displayName}
                    />
                ))}
                <div ref={endOfMessagesRef} />
            </div>
        </>
    );
}

export default AllChatsForAModule;