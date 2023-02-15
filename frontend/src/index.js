import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-override.scss';
import reportWebVitals from './reportWebVitals';
import UserSignupPage from './pages/UserSignupPage';
import UserLoginPage from './pages/UserLoginPage';
import './i18n';
import LanguageSelector from './components/LanguageSelector';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <UserLoginPage />
      <LanguageSelector />
    </div>
  </React.StrictMode>
);

reportWebVitals();
