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
import { useState,useContext } from "react";
import { Scrollspy } from "@makotot/ghostui";
import AuthenticationContext from "../context/AuthenticationContext";
import { useEffect } from "react";

const SIZE = 5;
const list = new Array(SIZE).fill(0);
const ProfilePage = () => {
  const navRef = useRef();
  const {auth} = useContext(AuthenticationContext);
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
    console.log(auth)
  },[])
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
              <a href="#about" className="nav-link scrollto">
                <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>{" "}
                <span>Library Booking</span>
              </a>
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
      <div id="#avathar"></div>
      <h1>{auth.firstName}</h1>
      <Scrollspy sectionRefs={sectionRefs}>
        {({ currentElementIndexInViewport }) => (
          <div className="row">
            
            <div className="col-lg-4 d-none d-lg-block" style={{paddingRight : 0}}>
              <ul
                className="scrollSpyUl sticky-top"
                data-cy="nav-wrapper"
                style={{
                  listStyle: "none",
                  backgroundColor: "white",
                  textAlign: "right",
                }}
              >
                {list.map((_, i) => (
                  <li
                    key={i}
                    className={
                      currentElementIndexInViewport === i ? "active" : ""
                    }
                    style={{
                      padding: "10px",
                      borderRight: "0.2rem solid",
                      borderRightColor:
                        currentElementIndexInViewport === i ? "red" : "white",
                    }}
                  >
                    <a
                      href={`#section-${i}`}
                      className="fw-normal"
                      style={{
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      {data[i]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-cy="section-wrapper"
              className="scrollspy-section-wrapper col-lg-8 col-md-12 " style={{paddingLeft : 0}}
            >
              {list.map((_, i) => (
                <div
                  id={`section-${i}`}
                  key={i}
                  ref={sectionRefs[i]}
                  className={
                    currentElementIndexInViewport === i ? "active" : ""
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "500px",
                    backgroundColor: "white",
                    color: "#fff",
                    fontSize: "2rem",
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        )}
      </Scrollspy>
    </div>
  );
};

export default ProfilePage;
