import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";

const RequireAuth = () => {
  const { auth } = useContext(AuthenticationContext);
  const location = useLocation();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/authenticate/login" state={{ from: location }} replace />
  );
};


export default RequireAuth;
