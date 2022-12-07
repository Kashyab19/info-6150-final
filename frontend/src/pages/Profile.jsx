import "./Profile.css";
import {
  faUser,
  faBars,
  faBook,
  faNotesMedical,
  faCar,
  faShop,
  faClose,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useState, useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContext";
import { useEffect } from "react";
import ProfileComponent from "../components/ProfileComponent";
import LibraryBooking from "../components/LibraryComp/LibraryBooking";
import RedEye from "./RedEye";

import { Route, Routes, Link, useLocation } from "react-router-dom";
import AddProducts from "./AddProducts";
import ProductNavigationBar from "../components/ProductNavigationBar";

const SIZE = 5;
const list = new Array(SIZE).fill(0);
const ProfilePage = () => {
  const navRef = useRef();
  const { auth } = useContext(AuthenticationContext);
  const [navbarActive, setNavBarActive] = useState(false);
  const sectionRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const data = [
    "Contact information",
    "About me",
    "Projects",
    "Skills and expertise",
    "Schools and education",
    "Interests and hobbies",
  ];
  const toggleNavBar = () => {
    if (!navbarActive) {
      navRef.current.classList.add("mobile-nav-active");
      setNavBarActive(true);
    } else {
      navRef.current.classList.remove("mobile-nav-active");
      setNavBarActive(false);
    }
  };
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  });
  return (
    <div ref={navRef}>
      {navbarActive ? (
        <FontAwesomeIcon
          icon={faClose}
          className=" mobile-nav-toggle d-lg-none"
          onClick={toggleNavBar}
        ></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon
          icon={faBars}
          className=" mobile-nav-toggle d-lg-none"
          onClick={toggleNavBar}
        ></FontAwesomeIcon>
      )}
      <nav class="navbar navbar-dark bg-dark px-3 fixed-top">
        <Link class="navbar-brand" to="/profile">
          <img src="./NU_MonoLVX_RGB_RW.png" width="30" height="30" alt="" />
        </Link>
      </nav>
      <header id="header" className="d-flex flex-column justify-content-center">
        <nav id="navbar" className="navbar nav-menu">
          <ul>
            <li>
              <Link
                to="/profile"
                className={
                  location.pathname === "/profile"
                    ? "nav-link scrollto active"
                    : "nav-link scrollto"
                }
              >
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/library"
                className={
                  location.pathname === "/library"
                    ? "nav-link scrollto active"
                    : "nav-link scrollto"
                }
              >
                <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>{" "}
                <span>Library Booking</span>
              </Link>
            </li>
            <li>
              <a href="#resume" className="nav-link scrollto">
                <FontAwesomeIcon icon={faNotesMedical}></FontAwesomeIcon>
                <span>Health insurance</span>
              </a>
            </li>
            <li>
              <Link
                to="/redeye"
                className={
                  location.pathname === "/redeye"
                    ? "nav-link scrollto active"
                    : "nav-link scrollto"
                }
              >
                <FontAwesomeIcon icon={faCar}></FontAwesomeIcon>
                <span>Redeye</span>
              </Link>
            </li>
            <li>
              <Link
                to="/marketplace"
                className={
                  location.pathname === "/marketplace"
                    ? "nav-link scrollto active"
                    : "nav-link scrollto"
                }
              >
                <FontAwesomeIcon icon={faShop}></FontAwesomeIcon>
                <span>Market Place</span>
              </Link>
            </li>
            <li>
              <a href="#services" className="nav-link scrollto">
                <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="mt-5">
        <Routes>
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/library" element={<LibraryBooking />} />
          <Route path="/redEye" element={<RedEye />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/marketPlace" element={<ProductNavigationBar />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProfilePage;
