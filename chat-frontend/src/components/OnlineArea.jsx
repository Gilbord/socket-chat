import React from 'react';
import '../styles/OnlineArea.css';

export const OnlineArea = (props) => {
        return (
            <div className={`onlineAreaContainer ${props.className}`}>
                <h4>Users online ({props.onlineUsers.length})</h4>
                {props.onlineUsers.map((username, index) => <div key={index} className='username'>{username}</div>)}
            </div>
        )
    }
