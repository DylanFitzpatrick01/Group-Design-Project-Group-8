import React from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllChatsForAModule from './AllChatsForAModule';  
import TextInput from './TextInput'; 
import { useUpdatedChats } from './SendReceiveChats';
import User from '../../models/User';

function ChatPage() {
    const chats = useUpdatedChats('csu44098');

    useEffect(() => {
        console.log(chats);
    }, [chats]);

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
            <AllChatsForAModule moduleCode='csu44098' />
            <TextInput moduleCode='csu44098' user={userOne}/>
        </>
    );
}

export default ChatPage;