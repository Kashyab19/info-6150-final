import { createContext, useState } from "react";

const AuthenticationContext = createContext({});

export const AuthenticationContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [closed, setClosed] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  return (
    <AuthenticationContext.Provider value={{ auth, setAuth,persist, setPersist , closed, setClosed}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
