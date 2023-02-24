import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-override.scss';
import reportWebVitals from './reportWebVitals';
import UserSignupPage from './pages/UserSignupPage';
import UserLoginPage from './pages/UserLoginPage';
import './i18n';
import LanguageSelector from './components/LanguageSelector';
import ApiProgress from './shared/ApiProgress';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <ApiProgress>
        <UserSignupPage />
      </ApiProgress>
      <LanguageSelector />
    </div>
  </React.StrictMode>
);

reportWebVitals();
