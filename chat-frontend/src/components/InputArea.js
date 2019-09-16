import React, { Component } from 'react';
import "../styles/InputArea.css";

class InputArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }

    handleMessageChange(e) {
        this.setState({ message: e.target.value })
    }

    handleSendClick() {
        this.props.onEnterMessage(this.state.message)
        this.setState({message: ''})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSendClick();
            e.preventDefault();
        }
    }

    render() {
        return (
            <div className={`inputAreaContainer ${this.props.className}`}>
                <textarea className="textarea" onKeyPress={this.handleKeyPress.bind(this)} value={this.state.message} onChange={this.handleMessageChange.bind(this)}></textarea>
                <button className="button" disabled={this.props.isMessageSending} onClick={this.handleSendClick.bind(this)}>{this.props.isMessageSending ? 'Sending...' : 'Send'}</button>
            </div>
        )
    }

}

export default InputArea;
