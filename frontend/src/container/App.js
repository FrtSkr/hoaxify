import React from "react";
import ApiProgress from "../shared/ApiProgress";
import UserLoginPage from "../pages/UserLoginPage";
import UserSignupPage from '../pages/UserSignupPage';
import LanguageSelector from "../components/LanguageSelector";
import HomePages from "../pages/HomePages";
import UserPage from "../pages/UserPage";
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';


function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePages} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/signup" component={UserSignupPage} />
          <Route path="/user/:username" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
      <LanguageSelector />
    </div>
  );
}

export default App;
