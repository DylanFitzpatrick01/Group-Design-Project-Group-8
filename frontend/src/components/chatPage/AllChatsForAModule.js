import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatComponent from './ChatComponent';
import { useUpdatedChats } from './SendReceiveChats';
import {checkAndReplaceBadWords} from './BadWordDetection';

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

function checkUser(username) {
    if (username === localStorage.getItem('userEmail')) {
        return true;
    }
    else return false;
}

function AllChatsForAModule({ societyOrModule, moduleCode }) {
    const rawChats = useUpdatedChats(societyOrModule, moduleCode);
    const [chats, setChats] = useState([]);

    // reference to the latest message so we can auto scroll there
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        console.log('Raw Chats:', rawChats); // Check the original timestamps

        const processChats = async () => {
            const promises = rawChats.map(async (chat) => {
                console.log('Processing chat:', chat); // Inspect each chat being processed
                const cleanedText = await checkAndReplaceBadWords(chat.text);
                return { ...chat, text: cleanedText };
            });
            const cleanedChats = await Promise.all(promises);
            console.log('Processed Chats:', cleanedChats); // Inspect the timestamps after processing
            setChats(cleanedChats);
        };

        processChats();
    }, [rawChats]);

    // Auto-scroll to the latest message
    useEffect(() => {
        console.log('Raw Chats:', rawChats); // Check the original timestamps

        const processChats = async () => {
            const promises = rawChats.map(async (chat) => {
                console.log('Processing chat:', chat); // Inspect each chat being processed
                const cleanedText = await checkAndReplaceBadWords(chat.text);
                return { ...chat, text: cleanedText };
            });
            const cleanedChats = await Promise.all(promises);
            console.log('Processed Chats:', cleanedChats); // Inspect the timestamps after processing
            setProcessedChats(cleanedChats);
        };

        processChats();
    }, [rawChats]);

    // Auto-scroll to the latest message
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [processedChats]);

    return (
        <>
            <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                {processedChats.map((chat, index) => (
                    <ChatComponent
                        key={chat.id}
                        message={chat.text} // Now using processed text
                        isMyMessage={checkUser(chat.uid)}
                        timestamp={formatTimestamp(chat.timestamp)}
                        name={chat.displayName}
                        avatar={chat.avatar}
                        prefix={chat.uid.split('@')[0]}
                        imageUrl={chat.imageUrl}
                    />
                ))}
                <div ref={endOfMessagesRef} />
            </div>
        </>
    );
}

export default AllChatsForAModule;