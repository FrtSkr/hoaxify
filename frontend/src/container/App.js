import React from "react";
import UserLoginPage from "../pages/UserLoginPage";
import UserSignupPage from '../pages/UserSignupPage';
import LanguageSelector from "../components/LanguageSelector";
import HomePages from "../pages/HomePages";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from "../components/TopBar";


function App() {
  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePages} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/signup" component={UserSignupPage} />
          <Route path="/user/:username" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
      <LanguageSelector />
    </div>
  );
}

export default App;
