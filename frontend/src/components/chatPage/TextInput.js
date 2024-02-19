import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TextInput.css';
import { sendChat } from './SendReceiveChats';

function TextInput({ moduleCode, user }) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }, [message]);


    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = (event) => {
        event.preventDefault();
        if (message !== '' && message != null) {
            if ((message || '').trim() !== '') {
                sendChat(moduleCode, message, user);
                setMessage('');
            }
        }
    };

    return (
        <div className="textBoxContainer">
            <form onSubmit={handleSend}>
                <div className='inputContainer'>
                    <textarea type="text"
                        ref={textareaRef}
                        className='textBox'
                        placeholder="Type your message..."
                        value={message} // add username, timestamp, isMyMessage here?
                        onChange={handleInputChange} />
                    <button className={`sendButton ${message ? 'textBoxNotEmpty' : 'textBoxEmpty'}`} type="submit">Send</button>
                </div>
            </form >

        </div>
    );
}

export default TextInput;