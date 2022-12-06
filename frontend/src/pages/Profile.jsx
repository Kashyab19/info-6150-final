import "./Profile.css";
import {
  faUser,
  faBars,
  faBook,
  faNotesMedical,
  faCar,
  faShop,
  faClose
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React ,{ useRef } from "react";
import { useState } from "react";
const ProfilePage = () => {
    const navRef = useRef();
    const [navbarActive, setNavBarActive] = useState(false);
    const toggleNavBar = () => {
        if(!navbarActive){
            navRef.current.classList.add('mobile-nav-active');
            setNavBarActive(true);
        }
        else{
            navRef.current.classList.remove('mobile-nav-active');
            setNavBarActive(false)
        }
    }
  return (
    <div ref = {navRef}>
      {navbarActive ?<FontAwesomeIcon
        icon={faClose}
        className=" mobile-nav-toggle d-lg-none"
        onClick={toggleNavBar}
      ></FontAwesomeIcon> : <FontAwesomeIcon
        icon={faBars}
        className=" mobile-nav-toggle d-lg-none"
        onClick={toggleNavBar}
      ></FontAwesomeIcon>}
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
              <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>{" "}<span>Library Booking</span>
              </a>
            </li>
            <li>
              <a href="#resume" className="nav-link scrollto">
              <FontAwesomeIcon icon={faNotesMedical}></FontAwesomeIcon><span>Health insurance</span>
              </a>
            </li>
            <li>
              <a href="#portfolio" className="nav-link scrollto">
              <FontAwesomeIcon icon={faCar}></FontAwesomeIcon><span>Redeye</span>
              </a>
            </li>
            <li>
              <a href="#services" className="nav-link scrollto">
              <FontAwesomeIcon icon={faShop}></FontAwesomeIcon><span>Market Place</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default ProfilePage;
