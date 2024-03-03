import React, { createContext, useEffect, useState } from "react";
import cookies from "./cookie/cookie";
import { AUTH_COOKIE_KEY } from "./cookie/cookieConstants";
import ApiUrls from "./api/apiUrls";
import axiosInstance from "./api/axios";
import getThemes from './themes/index';
import { ThemeProvider } from "@material-ui/core";
import { formatNumberWithCurrency } from "global/utils";

const AppContextBase = createContext({});
const AppContext = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userMetaData, setUserMetaData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = () => {
    // Check Is Logged In by checking cookie from cookie.
    if (cookies.get(AUTH_COOKIE_KEY)) {
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logOutUser = () => {
    setUserData({});
    cookies.remove(AUTH_COOKIE_KEY);
  };

  const getUserMetaData = async (activateLoader=true) => {
    try {
      activateLoader && setIsLoading(true);
      const logCheck = isLoggedIn();
      if (logCheck) {
        const res = await axiosInstance.get(ApiUrls.GET_USER_META_DATA);
        const formatedUsersData = res.data.users.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {});
        const data = {
          ...res.data,
          users: formatedUsersData,
        };
        setUserMetaData(data);
      }
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
    } finally {
      activateLoader && setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
    getUserMetaData();
  }, []);
  
  const userUtils = (number = '', type='formateNumberWithCurrency') => {
    const currencySymbol = '₹';

     const utilsEnum = {
        formateNumberWithCurrency: () => formatNumberWithCurrency(number, currencySymbol),
        getCurrencySymbol: () => currencySymbol
     }

     return utilsEnum[type] ? utilsEnum[type]() : number
  };
  return (
    <AppContextBase.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        logOutUser,
        userData,
        userMetaData,
        setUserMetaData,
        getUserMetaData,
        userUtils,
        isLoading,
      }}
    >
      <ThemeProvider theme={getThemes()}>
        {children}
      </ThemeProvider>
    </AppContextBase.Provider>
  );
};

AppContextBase.Wrapper = AppContext;
export default AppContextBase;
