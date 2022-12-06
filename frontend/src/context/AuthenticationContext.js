import { createContext,useState } from "react";


const AuthenticationContext = createContext({});


export const AuthenticationContextProvider= ({children}) => {

    const [auth, setAuth] =  useState({});

    return (
        <AuthenticationContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext;