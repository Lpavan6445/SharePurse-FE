import axios from "axios";
import ApiUrls from "./apiUrls";
import { toast } from "react-toastify";
import cookies from "../cookie/cookie";
import { AUTH_COOKIE_KEY, XCSR_TOKEN } from "../cookie/cookieConstants";

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

/**
 * Adds Interceptor to axios to add token in every request header
 */
export function initHttp() {
  let networkErrorNotification;

  axiosInstance.interceptors.request.use(
    function (config) {
      // eslint-disable-line
      // Add user token to header
      // window.cookies = cookies
      const authCokie = cookies.get(AUTH_COOKIE_KEY);
      if (authCokie) {
        config.headers["Authorization"] = `Bearer ${authCokie}`; // eslint-disable-line
      }

      // if (cookies.get('csrftoken')) {
      //   config.headers[XCSR_TOKEN] = cookies.get('csrftoken'); // eslint-disable-line
      // }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    function (error) {
      // eslint-disable-line
      // Do something with request error3
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (config) {
      // eslint-disable-line
      try {
        if (networkErrorNotification) {
          networkErrorNotification = false;
        }
      } catch (ex) {
        /* ignored */
      }

      return config;
    },
    function (error) {
      // eslint-disable-line
      if (error?.response?.status === 503) {
        if (!networkErrorNotification) {
          networkErrorNotification = true;
          toast.error(
            "Could not reach our servers. Please re-try or refresh your browser."
          );
        }

        return Promise.reject(error);
      }

      if (error.message === "Network Error") {
        if (!networkErrorNotification) {
          networkErrorNotification = true;
          toast.error(
            "Could not reach our servers. Please check your internet connection"
          );
        }

        return Promise.reject(error);
      }

      if (error.response && [403, 401].includes(error.response.status)) {
        // When token fails, The below authorization error occurs
        // toast.error('User is not authorized to access');
        cookies.remove(AUTH_COOKIE_KEY);
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
