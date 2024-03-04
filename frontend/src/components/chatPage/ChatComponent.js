import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatComponent.css';
import Modal from './Modal.js'; 



function MyText({ message, timestamp, name, avatar, imageUrl }) {
    return (
        <>
            <div className='rightAlign2'>
                <div className='myUsername'>
                    <a href={`/profile`}>{name}</a>
                </div>
            </div>
            <div className='rightAlign'>
                <div className='message myText'>
                {imageUrl && <ImageWithModal imageUrl={imageUrl} />}
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

function TheirText({ message, timestamp, name, avatar, prefix, imageUrl}) {

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
                {imageUrl && <ImageWithModal imageUrl={imageUrl} />}
                    {message}
                    <div className='timestamp'>{timestamp}</div>
                </div>
            </div>
        </>
    );
}

function ChatComponent({ message, isMyMessage, timestamp, name, avatar, prefix, imageUrl}) {
    return (
        <div className="textContainer">
            {isMyMessage ? 
                <MyText message={message} timestamp={timestamp} name={name} avatar={avatar} imageUrl={imageUrl}/> : 
                <TheirText message={message} timestamp={timestamp} name={name} avatar={avatar} prefix={prefix} imageUrl={imageUrl}/>}
        </div>
    );
}


function ImageWithModal({ imageUrl }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <img 
                src={imageUrl} 
                alt="" 
                style={{ maxWidth: '500px', maxHeight: '300px', cursor: 'pointer' }} 
                onClick={() => setShowModal(true)} 
            />

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <img src={imageUrl} alt="" style={{ maxWidth: '90vw', maxHeight: '90vh' }} />
            </Modal>
        </>
    );
}

export default ChatComponent;