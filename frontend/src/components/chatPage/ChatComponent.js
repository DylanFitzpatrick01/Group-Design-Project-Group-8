import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatComponent.css';

function MyText({ message, timestamp }) {
    const { displayName, text } = message;
    return (
        <>
            <div className='myUsername'>{displayName}</div>
            <div className='rightAlign'>
                <div className='message myText'>
                    {text}
                    <div className='timestamp'>{timestamp}</div>
                </div>
            </div>
        </>
    );
}

function TheirText({ message, timestamp }) {
    const { displayName, text } = message;

    return (
        <>
            <div className='theirUsername'>{displayName}</div>
            <div className='leftAlign'>
                <div className='message theirText'>
                    {text}
                    <div className='timestamp'>{timestamp}</div>
                </div>
            </div>
        </>
    );
}

function Text({ message, isMyMessage, timestamp }) {
    return (
        <div className="textContainer">
            {isMyMessage ? <MyText message={message} timestamp={timestamp} /> : <TheirText message={message} timestamp={timestamp}/>}
        </div>
    );
}

function ChatComponent() {
    return (
        <div>
            <Text message={{ displayName: 'John', text: 'Hello, how are you today? Im doing okay :)'}} timestamp="22:21" isMyMessage={true} />
            <Text message={{ displayName: 'Jane', text: 'Hi! Good, actually. Less sick today!'}} timestamp="13:12" isMyMessage={false} />
        </div>
    );
}

export default ChatComponent;