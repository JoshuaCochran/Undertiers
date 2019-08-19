import React, { useState } from "react";
import Cookies from "universal-cookie";

export const UserContext = React.createContext();
export default function UserStore({ children }) {
  const [userData, setUserData] = useState({
    user: null,
    token: null,
    tokenExpire: null,
    expired: false,
    loggedIn: false,
    setUser: setUser,
    setToken: setToken,
    setLogin: setLogin,
    logOut: logOut
  });

  function setUser(user) {
    setUserData(prevState => {
        return { ...prevState, user };
      });
  }

  function setToken(token) {
    setUserData(prevState => {
      return { ...prevState, token };
    });
  }

  function setLogin(loggedIn) {
    setUserData(prevState => {
        return { ...prevState, loggedIn };
      });
  }

  function logOut() {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    cookies.remove("token expire", { path: "/" });
    setUserData({
      ...userData,
      token: null,
      loggedIn: false,
      tokenExpire: null,
      user: null
    });
  }

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
