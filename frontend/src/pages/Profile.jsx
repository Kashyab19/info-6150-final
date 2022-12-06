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
import { Scrollspy } from "@makotot/ghostui";
import AuthenticationContext from "../context/AuthenticationContext";
import { useEffect } from "react";
import ProfileComponent from "../components/ProfileComponent";
import LibraryBooking from "../components/LibraryComp/LibraryBooking";
import { Route, Routes,Link } from "react-router-dom";

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

  useEffect(() => {
    console.log(auth);
  }, []);
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
      <header id="header" className="d-flex flex-column justify-content-center">
        <nav id="navbar" className="navbar nav-menu">
          <ul>
            <li>
              <a href="#hero" className="nav-link scrollto active">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                <span>Profile</span>
              </a>
            </li>
            <li>
              <Link to="/library" className="nav-link scrollto">
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
              <a href="#portfolio" className="nav-link scrollto">
                <FontAwesomeIcon icon={faCar}></FontAwesomeIcon>
                <span>Redeye</span>
              </a>
            </li>
            <li>
              <a href="#services" className="nav-link scrollto">
                <FontAwesomeIcon icon={faShop}></FontAwesomeIcon>
                <span>Market Place</span>
              </a>
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
      <Routes>
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path="/library" element={<LibraryBooking />}></Route>
      </Routes>
    </div>
  );
};

export default ProfilePage;
