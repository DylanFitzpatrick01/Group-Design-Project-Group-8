import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatComponent.css';

function MyText({ message, timestamp, name, avatar }) {
    return (
        <>
            <div className='rightAlign2'>
                <div className='myUsername'>
                    <a href={`/profile`}>{name}</a>
                </div>
            </div>
            <div className='rightAlign'>

                <div className='message myText'>
                    {message}
                    <div className='timestamp'>{timestamp}</div>
                </div>
                <div className="profile-picture-right">
                    <a href={`/profile`}>
                        <img src={avatar} alt="User avatar" />
                    </a>
                </div>
            </div>
        </>
    );
}

function TheirText({ message, timestamp, name, avatar, prefix }) {

    return (
        <>
            <div className='leftAlign2'>
                <div className='theirUsername'>
                    <a href={`/user/${prefix}`}>{name}</a></div>
            </div>
            <div className='leftAlign'>
                <div className="profile-picture-left">
                    <a href={`/user/${prefix}`}>
                        <img src={avatar} alt="User avatar" />
                    </a>
                </div>
                <div className='message theirText'>
                    {message}
                    <div className='timestamp'>{timestamp}</div>
                </div>
            </div>
        </>
    );
}

function ChatComponent({ message, isMyMessage, timestamp, name, avatar, prefix }) {
    return (
        <div className="textContainer">
            {isMyMessage ? <MyText message={message} timestamp={timestamp} name={name} avatar={avatar} /> : <TheirText message={message} timestamp={timestamp} name={name} avatar={avatar} prefix={prefix} />}
        </div>
    );
}


export default ChatComponent;