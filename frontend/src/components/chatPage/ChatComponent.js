import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatComponent.css';

function MyText({ message, timestamp, name }) {
    return (
        <>
            <div className='rightAlign2'>
                <div className='myUsername'>{name}</div>
            </div>
            <div className='rightAlign'>

                <div className='message myText'>
                    {message}
                    <div className='timestamp'>{timestamp}</div>
                </div>
                <div className="profile-picture-right">
                    <img
                        src='https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt="User avatar"
                    />
                </div>
            </div>
        </>
    );
}

function TheirText({ message, timestamp, name }) {

    return (
        <>
            <div className='leftAlign2'>
                <div className='theirUsername'>{name}</div>
            </div>
            <div className='leftAlign'>
                <div className="profile-picture">
                    <img
                        src='https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt="User avatar"
                    />
                </div>
                <div className='message theirText'>
                    {message}
                    <div className='timestamp'>{timestamp}</div>
                </div>
            </div>
        </>
    );
}

function ChatComponent({ message, isMyMessage, timestamp, name }) {
    return (
        <div className="textContainer">
            {isMyMessage ? <MyText message={message} timestamp={timestamp} name={name} /> : <TheirText message={message} timestamp={timestamp} name={name} />}
        </div>
    );
}


export default ChatComponent;