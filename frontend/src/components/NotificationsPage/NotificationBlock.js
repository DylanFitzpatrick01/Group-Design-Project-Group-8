import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './NotificationBlock.css';

function DirectReplyNotificationComponent({mentionedBy, moduleCode, timestamp, message}) {

    return (
        <div className="NotificationComponentOuter">
            <div className="NotificationComponent">
                <div className="NotificationComponent-header">
                    <h2>User {mentionedBy} mentioned you in Module {moduleCode}</h2>
                    <div className="NotificationTimeStamp">{timestamp}</div>
                </div>
                <div className="NotificationComponent-body">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}


function SocietyNotificationComponent({mentionedBy, moduleCode, timestamp, message}) {
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

function NotificationBlock({ notificationType, mentionedBy, moduleCode, timestamp, message}) {
    switch (notificationType) {
        case 'societyPost':
            return <SocietyNotificationComponent mentionedBy={mentionedBy} timestamp={timestamp} message={message}/>;
        case 'directReply':
            return <DirectReplyNotificationComponent mentionedBy={mentionedBy} moduleCode={moduleCode} timestamp={timestamp} message={message}/>;
        default:
            throw new Error(`Unknown notification type: ${notificationType}`);
    }
}

export default NotificationBlock;