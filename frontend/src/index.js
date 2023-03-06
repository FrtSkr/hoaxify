import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-override.scss';
import reportWebVitals from './reportWebVitals';
import './i18n';
import App from './container/App';
// import AuthenticationContext from './shared/AuthenticationContext';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';


const loggedInState = {
  isLoggedIn: true,
  username: "admin",
  displayName: "displayAdmin",
  image: null,
  password: "Admin"
}

const defaultState = {
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const reducer = (state = { ...defaultState }, action) => {
  if (action.type === 'logout-success') {
    console.log(action.type);
    return defaultState;
  }
  return state;
};

const store = createStore(reducer, loggedInState);
root.render(
  <Provider store={store}>

    <App />
  </Provider>
);

reportWebVitals();
