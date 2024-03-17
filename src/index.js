import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axiosInstance, { initHttp } from 'Base/api/axios';
import { toast } from 'react-toastify';
import cookies from 'Base/cookie/cookie';
import { AUTH_COOKIE_KEY } from 'Base/cookie/cookieConstants';
window.cookie = cookies;

// Initialize axios interceptors
initHttp();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
