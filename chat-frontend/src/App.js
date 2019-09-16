import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, generatePath, Switch } from "react-router-dom";
import Chat from './components/Chat';
import Login from './components/Login';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  render() {
    if (this.state.username) {
      return (
        <Router>
          <Switch>
            <Route exact path="/room/:id" render={props => <Chat {...props} username={this.state.username}></Chat>}></Route>
            <Redirect from="/" to={{ pathname: generatePath('/room/:id', { id: window.crypto.getRandomValues(new Uint8Array(10)).join('') }) }}></Redirect>
          </Switch>
        </Router>
      )
    } else {
      return (
        <Login handleLogInClick={(username) => this.setState({ username: username })}></Login>
      )
    }
  }
}

export default App;
