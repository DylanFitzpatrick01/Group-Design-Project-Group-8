import React from 'react';
import { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllChatsForAModule from './AllChatsForAModule';
import TextInput from './TextInput';
import { useUpdatedChats } from './SendReceiveChats';
import User from '../../models/User';
import { useParams } from 'react-router-dom';
import './ChatPage.css';

function ChatPage() {
    const { moduleCode } = useParams();

    const textInputRef = useRef(null);

    useEffect(() => {
        textInputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // dummy user for testing
    const userOne = new User(
        0,
        "https://images.unsplash.com/photo-1587723958656-ee042cc565a1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Freshman at TCD 📚 | Diving into the world of Computer Science 💻",
        "Computer Science",
        "ballk@tcd.ie",
        "Karen Ball",
        1
    );

    return (
        <>
            <div className="chat-container">
                <div className="module-chat-title">{moduleCode} Chats</div>
                <AllChatsForAModule moduleCode={moduleCode} />
                <TextInput ref={textInputRef} moduleCode={moduleCode} user={userOne} />
                {/* // user should be logged in user but using dummy user for now */}
            </div>
        </>
    );
}

export default ChatPage;