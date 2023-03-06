import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-override.scss';
import reportWebVitals from './reportWebVitals';
import './i18n';
import App from './container/App';
// import AuthenticationContext from './shared/AuthenticationContext';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore();

root.render(
  <Provider store={store}>

    <App />
  </Provider>
);

reportWebVitals();
