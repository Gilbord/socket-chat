import React, { Component } from 'react';
import '../styles/Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
    }
  }

  handleChange(e) {
    this.setState({
      username: e.target.value,
    })
  }

  handleLogInClick() {
    this.props.handleLogInClick(this.state.username);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.props.handleLogInClick(this.state.username);
        e.preventDefault();
    }
  }

  render() {
    return (
      <div className="loginContainer modal opened">
        <div className="modal-dialog">
          <div className="modal-header">
            <h2>Enter your nickname for chat</h2>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="user"
              placeholder="Username"
              size="20"
              value={this.props.username}
              onKeyPress={this.handleKeyPress.bind(this)}
              onChange={this.handleChange.bind(this)} />
            <div className="modal-footer">
              <button href="#" className="btn" onClick={this.handleLogInClick.bind(this)}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
