import React, { Component } from "react";
import UserLoginPage from "../pages/UserLoginPage";
import UserSignupPage from '../pages/UserSignupPage';
import LanguageSelector from "../components/LanguageSelector";
import HomePages from "../pages/HomePages";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from "../components/TopBar";
import { Authentication } from "../shared/AuthenticationContext";

class App extends Component {

  static contextType = Authentication;

  render() {

    const isLoggedIn = this.context.state.isLoggedIn;

    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePages} />
            {!isLoggedIn && <Route path="/login" component={UserLoginPage} />}
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