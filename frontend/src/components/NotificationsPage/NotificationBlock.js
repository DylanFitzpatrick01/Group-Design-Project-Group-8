import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './NotificationBlock.css';
import { Link } from 'react-router-dom'; // Import Link

function DirectReplyNotificationComponent({ mentionedBy, mentionedByAvatar, mentionedByUserID, moduleCode, timestamp, message }) {
    return (
        <div className="NotificationComponentOuter">
            <div className="NotificationComponent">
                <div className="NotificationComponent-header">
                    <h2>
                        <div className='body-container'>
                            <Link to={`/user/${mentionedByUserID}`} className='link-to-profile'>
                                <div className="profile-info"> 
                                    <img src={mentionedByAvatar} alt="User avatar" />
                                    {mentionedBy}
                                </div>
                            </Link>
                             mentioned you in
                            <Link to={`/modules/${moduleCode}`} className='link-to-module'>
                                 {moduleCode}
                            </Link>
                        </div>
                    </h2>
                    <div className="NotificationTimeStamp">{timestamp}</div>
                </div>
                <div className="NotificationComponent-body">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}


function SocietyNotificationComponent({ moduleCode, timestamp, message }) {
    return (
        <div className='NotificationComponentOuter'>
            <div className="NotificationComponent">
                <div className="NotificationComponent-header">
                    <h2>New Post from Society {moduleCode}</h2>
                    <div className="NotificationTimeStamp">{timestamp}</div>
                </div>
                <div className="NotificationComponent-body">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}

function NotificationBlock({ notificationType, mentionedBy, mentionedByAvatar, mentionedByUserID, moduleCode, timestamp, message }) {
    switch (notificationType) {
        case 'societyPost':
            return <SocietyNotificationComponent mentionedBy={mentionedBy} timestamp={timestamp} message={message} />;
        case 'directReply':
            return <DirectReplyNotificationComponent mentionedBy={mentionedBy} mentionedByUserID={mentionedByUserID} moduleCode={moduleCode} mentionedByAvatar={mentionedByAvatar} timestamp={timestamp} message={message} />;
        default:
            throw new Error(`Unknown notification type: ${notificationType}`);
    }
}

export default NotificationBlock;