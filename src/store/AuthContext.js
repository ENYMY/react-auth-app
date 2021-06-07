import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
});

const calculateRemaingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = new Date(exp).getTime();

  const remainingTime = expTime - currentTime;
  return remainingTime;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (tok, expirationTime) => {
    setToken(tok);
    localStorage.setItem("token", token);

    const remainingTime = calculateRemaingTime(expirationTime);
    setTimeout(logOutHandler, remainingTime);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    logIn: loginHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
