import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatComponent.css';

function MyText({ message, timestamp, name }) {
    return (
        <>
            <div className='myUsername'>{name}</div>
            <div className='rightAlign'>
                <div className='message myText'>
                    {message}
                    <div className='timestamp'>{timestamp}</div>
                </div>
            </div>
        </>
    );
}

function TheirText({ message, timestamp, name }) {

    return (
        <>
            <div className='theirUsername'>{name}</div>
            <div className='leftAlign'>
                <div className='message theirText'>
                    {message}
                    <div className='timestamp'>{timestamp}</div>
                </div>
            </div>
        </>
    );
}

function ChatComponent({ message, isMyMessage, timestamp, name}) {
    return (
        <div className="textContainer">
            {isMyMessage ? <MyText message={message} timestamp={timestamp} name={name} /> : <TheirText message={message} timestamp={timestamp} name={name}/>}
        </div>
    );
}

export default ChatComponent;