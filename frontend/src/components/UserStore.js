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
  const [loaded, setLoaded] = useState(false);

  function setUser(user) {
    setUserData(prevState => {
      return { ...prevState, user };
    });
  }

  function setToken(token, expiry) {
    setUserData(prevState => {
      return { ...prevState, token: token, tokenExpire: expiry };
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

  if (!loaded) {
    const cookies = new Cookies();
    const expire = new Date(cookies.get("token expire"));
    const date = new Date();
    if (date > expire) {
      cookies.remove("token", { path: "/" });
      cookies.remove("token expire", { path: "/" });
      cookies.remove("user", { path: "/" });
      setUserData({ ...userData, expired: true, user: null });
    } else if (cookies.get("token", { path: "/" })) {
      setToken(cookies.get("token", { path: "/" }));
      setUserData(prevState => {
        return {
          ...prevState,
          tokenExpire: cookies.get("token expire", { path: "/" }),
          loggedIn: true
        };
      });
      setUser(cookies.get("user", { path: "/" }));
    }
    setLoaded(true);
  }

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
