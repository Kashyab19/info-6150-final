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
import Container from "react-bootstrap/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useState, useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContext";
import ProfileComponent from "../components/ProfileComponent";
import LibraryBooking from "../components/LibraryComp/LibraryBooking";
import RedEye from "./RedEye";
import Navbar from "react-bootstrap/Navbar";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import AddProducts from "./AddProducts";
import ProductNavigationBar from "../components/ProductNavigationBar";
import About from "../Healthcare/pages/About";

import GeneralInfo from "../Healthcare/pages/GeneralInfo";
import BookAppointment from "../Healthcare/pages/BookAppointment";
import FAQ from "../Healthcare/pages/FAQ/FAQ";
import Contact from "../Healthcare/pages/Contact";
import PolicyDetails from "../Healthcare/pages/PolicyDetails";
import Feedback from "../Healthcare/pages/Feedback";
import Dropdown from "react-bootstrap/Dropdown";
import BookCourses from "./BookCourses";
import ViewCourses from "./ViewCourses";
import useRefereshToken from "../context/useRefreshToken";
import { useEffect } from "react";

const SIZE = 5;
const list = new Array(SIZE).fill(0);
const ProfilePage = () => {
  const navRef = useRef();
  const { auth, setAuth } = useContext(AuthenticationContext);
  const [navbarActive, setNavBarActive] = useState(false);
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

  const refresh = useRefereshToken();

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
      
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/home">
              <img
                alt=""
                src="./NU_MonoLVX_RGB_RW.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Northastern University
            </Navbar.Brand>
          </Container>
        </Navbar>
      
      <header id="header" className="d-flex flex-column justify-content-center">
        <nav id="navbar" className="navbar nav-menu">
          <ul>
            <li>
              <Link
                to="/home/profile"
                className={
                  location.pathname === "/" ||
                  location.pathname === "/home/profile"
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
                to="/home/library"
                className={
                  location.pathname === "/home/library"
                    ? "nav-link scrollto active"
                    : "nav-link scrollto"
                }
              >
                <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>{" "}
                <span>Library Booking</span>
              </Link>
            </li>
            <li>
              <Link
                to="/home/healthCare/about"
                className={
                  location.pathname.includes("/home/healthCare")
                    ? "nav-link scrollto active"
                    : "nav-link scrollto"
                }
              >
                <FontAwesomeIcon icon={faNotesMedical}></FontAwesomeIcon>
                <span>Health Care</span>
              </Link>
            </li>
            <li>
              <Link
                to="/home/redeye"
                className={
                  location.pathname === "/home/redeye"
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
                to="/home/marketplace"
                className={
                  location.pathname === "/home/marketplace"
                    ? "nav-link scrollto active"
                    : "nav-link scrollto"
                }
              >
                <FontAwesomeIcon icon={faShop}></FontAwesomeIcon>
                <span>Market Place</span>
              </Link>
            </li>
            <li>
              <Link
                to="/home/courseRegistration"
                className={
                  location.pathname === "/home/courseRegistration" ||
                  location.pathname === "/home/view-course"
                    ? "nav-link scrollto active"
                    : "nav-link scrollto"
                }
              >
                <FontAwesomeIcon icon={faShop}></FontAwesomeIcon>
                <span>Course registration</span>
              </Link>
            </li>
            <li>
              <Link to={"/authenticate/login"} state={{ from: "logout" }}>
                <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div >
        <Routes>
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/library" element={<LibraryBooking />} />
          <Route path="/redEye" element={<RedEye />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/marketPlace" element={<ProductNavigationBar />} />
          <Route path="/healthCare/">
            <Route path="/healthCare/about" element={<About />} />
            <Route path="/healthCare/checkups" element={<GeneralInfo />} />
            <Route path="/healthCare/book" element={<BookAppointment />} />
            <Route path="/healthCare/faq" element={<FAQ />} />
            <Route path="/healthCare/contactUs" element={<Contact />} />
            <Route path="/healthCare/details" element={<PolicyDetails />} />
            <Route path="/healthCare/feedBack" element={<Feedback />} />
          </Route>
          <Route path="/courseRegistration" element={<BookCourses />} />
          <Route path="/view-course" element={<ViewCourses />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProfilePage;
