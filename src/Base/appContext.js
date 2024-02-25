import React, { createContext, useEffect, useState } from "react";
import cookies from "./cookie/cookie";
import { AUTH_COOKIE_KEY } from "./cookie/cookieConstants";
import ApiUrls from "./api/apiUrls";
import axiosInstance from "./api/axios";

const AppContextBase = createContext({});
const AppContext = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userMetaData, setUserMetaData] = useState({});

  const isLoggedIn = () => {
    // Check Is Logged In by checking cookie from cookie.
    if (cookies.get(AUTH_COOKIE_KEY)) {
      return true;
    }

    return false;
  };

  const logOutUser = () => {
    setUserData({});
    cookies.remove(AUTH_COOKIE_KEY);
  };

  const getUserMetaData = async () => {
    try {
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
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
    } finally {
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      getUserMetaData();
    }
  }, [isLoggedIn()]);

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
      }}
    >
      {children}
    </AppContextBase.Provider>
  );
};

AppContextBase.Wrapper = AppContext;
export default AppContextBase;
