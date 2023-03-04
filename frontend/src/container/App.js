import React, { Component } from "react";
import UserLoginPage from "../pages/UserLoginPage";
import UserSignupPage from '../pages/UserSignupPage';
import LanguageSelector from "../components/LanguageSelector";
import HomePages from "../pages/HomePages";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from "../components/TopBar";


class App extends Component {

  state = {
    isLoggedIn: false,
    username: undefined
  }

  onLoginSuccess = username => {
    this.setState({
      username,
      isLoggedIn: true
    })
  }

  onLogoutSuccess = _ => {
    this.setState({
      username: undefined,
      isLoggedIn: false
    });
  }


  render() {

    const { isLoggedIn, username } = this.state;

    return (
      <div>
        <Router>
          <TopBar isLoggedIn={isLoggedIn} username={username} onLogoutSuccess={this.onLogoutSuccess} />
          <Switch>
            <Route exact path="/" component={HomePages} />
            {!isLoggedIn && <Route path="/login" component={props => {
              return <UserLoginPage  {...props} onLoginSuccess={this.onLoginSuccess} />
            }} />}
            {!isLoggedIn && <Route path="/signup" component={UserSignupPage} />}
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div >
    );
  }
}

export default App;