import React, { Component } from 'react';
import { Message } from './Message';
import '../styles/MessagesArea.css';

class MessageArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className={ `messagesArea ${this.props.className}` }>
                {this.props.messages.map((message, index) => <Message key={index} from={message.from} text={message.text} time={message.time}/>)}
            </div>
        )
    }

}

export default MessageArea;
