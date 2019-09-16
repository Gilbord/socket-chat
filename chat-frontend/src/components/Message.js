import React from "react";
import "../styles/Message.css"

export const Message = (props) => {
    return (
        <div className="messageContainer">
            <div className="metaInfoContainer">
                <div className="messageFrom">{props.from}</div>
                <div className="messageTime">{props.time}</div>
            </div>
            <div className="mainContainer">
                <div className="messageText">{props.text}</div>
            </div>
        </div>
    )
}