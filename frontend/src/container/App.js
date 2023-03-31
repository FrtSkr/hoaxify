import React, { Component } from "react";
import UserLoginPage from "../pages/UserLoginPage";
import UserSignupPage from '../pages/UserSignupPage';
import LanguageSelector from "../components/LanguageSelector";
import HomePages from "../pages/HomePages";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from "../components/TopBar";
import { useSelector } from "react-redux";
// import { Authentication } from "../shared/AuthenticationContext";

const App = () => {
  const { isLoggedIn } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn
  }));

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
    </div >
  );
}

export default App;