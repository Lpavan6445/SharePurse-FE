import axios from 'axios';
import ApiUrls from './apiUrls';
import { toast } from 'react-toastify';
import cookies from '../cookie/cookie';
import { AUTH_COOKIE_KEY, XCSR_TOKEN } from '../cookie/cookieConstants';

// import ApiUrls from 'src/constants/apiUrls';
// import AppUrls from 'src/constants/appUrls';

/**
 * Axios instances to talk to the API.
 */
const axiosInstance = axios.create({
  timeout: 1000 * 120, // 60 seconds timeout
  headers: {
    // 'Content-Type': 'application/json',
  },
});

let networkErrorNotification;


export default axiosInstance;
