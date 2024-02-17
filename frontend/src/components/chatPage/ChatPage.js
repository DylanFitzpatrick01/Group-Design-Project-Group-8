import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatComponent from './ChatComponent';
import TextInput from './TextInput'; 

function ChatPage() {
    return (
        <>
            <ChatComponent />
            <TextInput />
        </>
    );
}

export default ChatPage;