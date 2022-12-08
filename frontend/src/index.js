import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./components/LibraryComp/Library.css";
import App from "./App";

//External
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";

//NPMs
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import AddProducts from "./pages/AddProducts";
import { AuthenticationContextProvider } from "./context/AuthenticationContext";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import ProfilePage from "./pages/Profile";
import RedEye from "./pages/RedEye";
// import NotFoundPage from './pages/NotFoundPage';
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import HomePage from "./pages/HomePageComp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthenticationContextProvider>
      <Routes>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/authenticate/*" element={<Login />} />
        {/* <Route exact={true} path="/signup" element={<Register/>} />
        <Route exact={true} path="/verify" element={<Verification/>} /> */}
        {/* <Route element={<PersistLogin></PersistLogin>}> */}
          <Route element={<RequireAuth />}>
            <Route path="/home/*" element={<App />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </AuthenticationContextProvider>
  </BrowserRouter>
);
