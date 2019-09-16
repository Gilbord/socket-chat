import React, { Component } from 'react';
import '../styles/Chat.css'
import io from "socket.io-client";
import MessagesArea from './MessagesArea';
import InputArea from './InputArea';
import { OnlineArea } from './OnlineArea';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMessageSending: false,
            messages: [],
            onlineUsers: [],
        }
        this.socket = io('http://192.168.1.56:3001/', { query: { username: this.props.username, roomId: this.props.match.params.id } });
        this.socket.on('online', (data) => this.setState({onlineUsers: data}));
        this.socket.on('message', (message) => {
            this.addMessage(message);
        })
        this.socket.on('system message', (message) => {
            this.handleSystemMessage(message);
        })
    }

    handleSystemMessage(message) {
        switch (message.type) {
            case 'user online': {
                this.addMessage({ from: 'system', time: message.time, text: `${message.username} is online` });
                this.setState({ onlineUsers: [...this.state.onlineUsers, message.username] })
                break;
            }
            case 'user offline': {
                this.addMessage({ from: 'system', time: message.time, text: `${message.username} is offline` });
                this.setState({ onlineUsers: this.state.onlineUsers.filter(username => username !== message.username) })
                break;
            }
            default: {
                break;
            }
        }
    }

    handleChange(e) {
        this.setState({ message: e.target.value })
    }

    sendMessage(text) {
        this.setState({ isMessageSending: true })
        this.socket.send(text, (message) => {
            this.setState({ isMessageSending: false });
            this.addMessage(message);
        });
    }

    addMessage(message) {
        this.setState({ messages: [...this.state.messages, message] })
    }

    render() {
            return (
                <div className="container">
                    <div className="upContainer">
                        <MessagesArea className="messagesContainer" messages={this.state.messages}></MessagesArea>
                        <OnlineArea className="onlineContainer" onlineUsers={this.state.onlineUsers}></OnlineArea>
                    </div>
                    <InputArea className="inputContainer" isMessageSending={this.state.isMessageSending} onEnterMessage={this.sendMessage.bind(this)}></InputArea>
                </div>
            )
    }
}

export default Chat;
