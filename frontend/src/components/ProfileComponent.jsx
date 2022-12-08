import "../pages/Profile.css";
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
const ProfileComponent = () => {
  const {auth} = useContext(AuthenticationContext);
  const sectionRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const data = [
    "Contact information",
    "About me",
    "Projects",
    "Skills and expertise",
    "Schools and education",
    "Interests and hobbies",
  ];

  return (
    <div>
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

export default ProfileComponent;
