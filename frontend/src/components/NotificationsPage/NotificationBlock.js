import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './NotificationBlock.css';

function DirectReplyNotificationComponent() {
    return (
        <div className="NotificationComponentOuter">
            <div className="NotificationComponent">
                <div className="NotificationComponent-header">
                    <h2>User XXXXX replied to you in Module X</h2>
                    <div className="NotificationTimeStamp">4 hours ago</div>
                </div>
                <div className="NotificationComponent-body">
                    <p>Want to get lunch after this lecture?</p>
                </div>
            </div>
        </div>
    );
}


function SocietyNotificationComponent() {
    return (
        <div className='NotificationComponentOuter'>
            <div className="NotificationComponent">
                <div className="NotificationComponent-header">
                    <h2>New Post from Society XXXXX</h2>
                    <div className="NotificationTimeStamp">2 hours ago</div>
                </div>
                <div className="NotificationComponent-body">
                    <p>Pride, Prejudice and Pizza night with the Lit Soc this Friday!!!</p>
                </div>
            </div>
        </div>
    );
}

function NotificationBlock({ notificationType }) {
    switch (notificationType) {
        case 'societyPost':
            return <SocietyNotificationComponent />;
        case 'directReply':
            return <DirectReplyNotificationComponent />;
        default:
            throw new Error(`Unknown notification type: ${notificationType}`);
    }
}

export default NotificationBlock;