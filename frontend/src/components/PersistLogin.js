import { Outlet } from "react-router";

import { useState, useEffect, useContext } from "react";
import useRefereshToken from "../context/useRefreshToken";
import AuthenticationContext from "../context/AuthenticationContext";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefereshToken();
  const { auth, persist } = useContext(AuthenticationContext);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => {
        isMounted =false; 
    }
  }, []);

  useEffect(() => {
    console.log(`isLoadin : ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth)}`);
  }, [isLoading]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <p>Loading....</p>
      ) : (
        <Outlet></Outlet>
      )}
    </>
  );
};

export default PersistLogin;
