import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axiosInstance from 'Base/api/axios';
import { toast } from 'react-toastify';
import cookies from 'Base/cookie/cookie';
import { AUTH_COOKIE_KEY } from 'Base/cookie/cookieConstants';
window.cookie = cookies;
/**
   * Adds Interceptor to axios to add token in every request header
   */
let networkErrorNotification;

axiosInstance.interceptors.request.use(function (config) { // eslint-disable-line
  // Add user token to header
  // window.cookies = cookies
  const authCokie = cookies.get(AUTH_COOKIE_KEY)
  if (authCokie) {
    config.headers['Authorization'] = `Bearer ${authCokie}`; // eslint-disable-line
  }

  // if (cookies.get('csrftoken')) {
  //   config.headers[XCSR_TOKEN] = cookies.get('csrftoken'); // eslint-disable-line
  // }
  // config.headers['Content-Type'] = 'application/json';
  return config;
}, function (error) { // eslint-disable-line
  // Do something with request error3
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (config) { // eslint-disable-line
  try {
    if (networkErrorNotification) {
      networkErrorNotification = false;
    }
  } catch (ex) { /* ignored */ }

  return config
}, function (error) { // eslint-disable-line
  if (error?.response?.status === 503) {
    if (!networkErrorNotification) {
      networkErrorNotification = true;
      toast.error('Could not reach our servers. Please re-try or refresh your browser.');
    }

    return Promise.reject(error);
  }

  if (error.message === 'Network Error') {
    if (!networkErrorNotification) {
      networkErrorNotification = true;
      toast.error('Could not reach our servers. Please check your internet connection');
    }

    return Promise.reject(error);
  }


  if (error.response && [403, 401].includes(error.response.status)) {
    // When token fails, The below authorization error occurs
    // toast.error('User is not authorized to access');
    cookies.remove(AUTH_COOKIE_KEY)
    window.location.reload();
  }
  return Promise.reject(error);
});

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
