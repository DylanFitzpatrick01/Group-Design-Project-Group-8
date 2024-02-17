import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TextInput.css';

function TextInput() {
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
        if (message.trim() !== '') {
            // send to firebase here
            console.log('message:', message);
            setMessage('');
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