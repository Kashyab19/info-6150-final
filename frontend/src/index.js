import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './components/LibraryComp/Library.css';
import App from './App';



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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthenticationContextProvider>
      <Routes>
        <Route exact={true} path="/" element={<App />} />
        <Route exact={true} path="/profile" element={<ProfilePage />} />

        <Route exact={true} path="/add-products" element={<AddProducts />} />
        <Route exact={true} path="/authenticate/*" element={<Login/>} />
        <Route exact={true} path="/signup" element={<Register/>} />
        <Route exact={true} path="/verify" element={<Verification/>} />
        {/* <Route exact={true} path="/signup" element={<Register/>} /> */}
      </Routes>
    </AuthenticationContextProvider>
  </BrowserRouter>
);
