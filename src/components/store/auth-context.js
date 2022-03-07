import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calcRemTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = expirationTime.getTime();
  const remDuration = adjExpTime - currentTime;

  return remDuration;
};

const getStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpDate = new Date(localStorage.getItem("expTime"));

  const remainingTime = calcRemTime(storedExpDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = getStoredToken();
  let initToken;
  if (tokenData) {
    initToken = tokenData.token;
  }
  const [token, setToken] = useState(initToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");

    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expTime", expirationTime.toISOString());

    const remTime = calcRemTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(() => logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
