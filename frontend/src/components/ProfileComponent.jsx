import "../pages/Profile.css";

import React, { useRef } from "react";
import { useState, useContext } from "react";
import { Scrollspy } from "@makotot/ghostui";
import AuthenticationContext from "../context/AuthenticationContext";
import { useEffect } from "react";
import {
  faUserCircle,
  faCakeCandles,
  faEarthOceania,
  faPencil,
  faLocationDot,
  faEnvelope,
  faMobile,
  faHouseUser,
  faQuoteLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const SIZE = 5;
const list = new Array(SIZE).fill(0);
const PROFILE_URL = "api/profile";
const PROFILE_UPDATE_URL = "api/updateProfile";
const ProfileComponent = () => {
  const { auth } = useContext(AuthenticationContext);
  const [user, setUser] = useState({});
  const [editBirthDate, setEditBirthDate] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editMobileNum, setEditMobileNum] = useState(false);
  const [editHomeNum, setEditHomeNum] = useState(false);
  useEffect(() => {
    axios
      .get(
        PROFILE_URL,
        { params: { email: "tummalapalli.n@northeastern.edu" } },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        setUser(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateProfile = async (field, value) => {
    if (!value || user[field] == value) {
      setEditBirthDate(false);
      setEditLocation(false);
      setEditMobileNum(false);
      setEditHomeNum(false);
      return;
    }
    console.log(field + " " + value);
    axios
      .post(
        PROFILE_UPDATE_URL,
        JSON.stringify({
          field,
          value,
          email: "tummalapalli.n@northeastern.edu",
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        setUser(res.data.data);
        setEditBirthDate(false);
        setEditLocation(false);
        setEditMobileNum(false);
      });
  };
  const sectionRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const data = [
    "Contact information",
    "About me",
    "Projects",
    "Skills and expertise",
    "Schools and education",
    "Interests and hobbies",
  ];
  const getMaxDate = () => {
    function subtractYears(numOfYears, date = new Date()) {
      date.setFullYear(date.getFullYear() - numOfYears);

      return date;
    }
    return subtractYears(18).toISOString().split("T")[0];
  };
  return (
    <div
      style={{
        paddingTop: "1rem",
      }}
    >
      <div id="#avathar" className="container">
        <div className="col-lg-10 offset-lg-2">
          <span className="fw-normal h1" style={{ color: "#0078d4" }}>
            {user.firstName} {">"}
          </span>{" "}
          <span className="h3">View/Update your profile</span>
        </div>
      </div>

      <Scrollspy sectionRefs={sectionRefs}>
        {({ currentElementIndexInViewport }) => (
          <div className="row">
            <div
              className="col-lg-4 d-none d-lg-block"
              style={{ paddingRight: 0 }}
            >
              <ul
                className="scrollSpyUl sticky-top"
                data-cy="nav-wrapper"
                style={{
                  listStyle: "none",
                  backgroundColor: "white",
                  textAlign: "right",
                  paddingTop: "4rem",
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
              className="scrollspy-section-wrapper col-lg-8 col-md-12 ps-lg-5"
            >
              <div
                id="section-0"
                ref={sectionRefs[0]}
                className={
                  currentElementIndexInViewport === 0 ? "row active" : "row"
                }
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "white",
                  paddingTop: "4rem",
                }}
              >
                <div
                  aria-label="contact information"
                  className="d-flex align-middle"
                >
                  <span>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        textAlign: "center",
                        display: "inline-block",
                      }}
                    ></FontAwesomeIcon>
                  </span>
                  <span className="fw-normal h3 align-middle ms-3 my-1">
                    {" "}
                    Contact Information
                  </span>
                </div>
                <div className="col-6">
                  <h5 className="disabled my-4">Personal Information</h5>
                  <p>
                    {user.firstName} {"  "} {user.lastName}
                  </p>
                  <p>{user.role === "S" ? "Student" : "Admin"}</p>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <FontAwesomeIcon icon={faCakeCandles} size="lg" />
                    </div>
                    {editBirthDate ? (
                      <input
                        type="date"
                        max={getMaxDate()}
                        className="form-control mx-5 flex-fill"
                        autoFocus
                        onBlur={(e) => {
                          updateProfile("birthDay", e.target.value);
                        }}
                      ></input>
                    ) : user?.birthDay ? (
                      <div className="ms-2 ms-lg-4 flex-fill">
                        {user.birthDay}
                      </div>
                    ) : (
                      <div className="ms-2"> </div>
                    )}

                    <div
                      role="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Click to edit birthday"
                      onClick={() => {
                        setEditBirthDate(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencil} size="lg" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <FontAwesomeIcon icon={faLocationDot} size="lg" />
                    </div>
                    {editLocation ? (
                      <input
                        type="text"
                        autoFocus
                        className="form-control mx-5"
                        onBlur={(e) => {
                          updateProfile("location", e.target.value);
                        }}
                      ></input>
                    ) : user?.location ? (
                      <div className="ms-2 ms-lg-4 flex-fill">
                        {user.location}
                      </div>
                    ) : (
                      <div className="ms-2"> </div>
                    )}

                    <div
                      role="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Click to edit address"
                      onClick={() => {
                        setEditLocation(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencil} size="lg" />
                    </div>
                  </div>
                  <br />
                </div>
                <div className="col-6">
                  <h5 className="disabled my-4">Contact me</h5>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <FontAwesomeIcon  size="lg"
                      icon={faEnvelope}
                    ></FontAwesomeIcon>
                    <a href={`mailto:${user.email}`} className="ms-2">
                      {user.email}
                    </a>
                    <div
                      role="button"
                      className="invisible"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Click to edit mobile number"
                      onClick={() => {
                        setEditMobileNum(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencil} size="lg" />
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <FontAwesomeIcon icon={faMobile} size="lg" />
                    </div>
                    {editMobileNum ? (
                      <input
                        type="min"
                        max="9999999999"
                        min="1000000000"
                        className="mx-5 flex-fill"
                        placeholder="Edit mobile number"
                        autoFocus
                        onBlur={(e) => {
                          updateProfile("mobileNumber", e.target.value);
                        }}
                      ></input>
                    ) : user?.mobileNumber ? (
                      <div className="ms-2 ms-lg-4 flex-fill">
                        <a href={`tel:${user.mobileNumber}`} className="ms-2">
                          {user.mobileNumber}
                        </a>
                      </div>
                    ) : (
                      <div className="ms-2"> </div>
                    )}

                    <div
                      role="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Click to edit mobile number"
                      onClick={() => {
                        setEditMobileNum(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencil} size="lg" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <FontAwesomeIcon icon={faHouseUser} size="lg" />
                    </div>
                    {editHomeNum ? (
                      <input
                        type="min"
                        max="9999999999"
                        min="1000000000"
                        className="mx-5 flex-fill"
                        autoFocus
                        placeholder="Enter home number"
                        onBlur={(e) => {
                          updateProfile("homeNumber", e.target.value);
                        }}
                      ></input>
                    ) : user?.homeNumber ? (
                      <div className="ms-2 ms-lg-4 flex-fill">
                        <a href={`tel:${user.homeNumber}`} className="ms-2">
                          {user.homeNumber}
                        </a>
                      </div>
                    ) : (
                      <div className="ms-2"> </div>
                    )}

                    <div
                      role="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Click to edit home mobile number"
                      onClick={() => {
                        setEditHomeNum(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencil} size="lg" />
                    </div>
                  </div>
                  <br />
                </div>
              </div>
              <div className="p-3 border-bottom"></div>
              <div
                id="section-1"
                ref={sectionRefs[1]}
                className={
                  currentElementIndexInViewport === 1
                    ? "row pt-2 active"
                    : "row pt-2"
                }
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  fontSize: "2rem",
                }}
              >
                 <span>
                    <FontAwesomeIcon
                      icon={faQuoteLeft}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        textAlign: "center",
                        display: "inline-block",
                      }}
                    ></FontAwesomeIcon>
                  </span>
                  <span className="fw-normal h3 align-middle ms-3 my-1">
                    {" "}
                    Contact Information
                  </span>
                <div className="col-12  ">
                  <h2>h1. Bootstrap heading</h2>
                </div>
              </div>
              <div
                id="section-2"
                ref={sectionRefs[2]}
                className={
                  currentElementIndexInViewport === 2
                    ? "row pt-2 active"
                    : "row pt-2"
                }
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "500px",
                  backgroundColor: "white",

                  fontSize: "2rem",
                }}
              >
                <div className="col-6">
                  <h2>h1. Bootstrap heading</h2>
                </div>
                <div className="col-6">
                  <h2>h1. Bootstrap heading</h2>
                </div>
              </div>
              <div
                id="section-3"
                ref={sectionRefs[3]}
                className={
                  currentElementIndexInViewport === 3
                    ? "row pt-2 active"
                    : "row pt-2"
                }
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "500px",
                  backgroundColor: "white",

                  fontSize: "2rem",
                }}
              >
                <div className="col-6">
                  <h2>h1. Bootstrap heading</h2>
                </div>
                <div className="col-6">
                  <h2>h1. Bootstrap heading</h2>
                </div>
              </div>
              <div
                id="section-4"
                ref={sectionRefs[4]}
                className={
                  currentElementIndexInViewport === 4
                    ? "row pt-2 active"
                    : "row pt-2"
                }
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "500px",
                  backgroundColor: "white",

                  fontSize: "2rem",
                }}
              >
                <div className="col-6">
                  <h2>h1. Bootstrap heading</h2>
                </div>
                <div className="col-6">
                  <h2>h1. Bootstrap heading</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </Scrollspy>
    </div>
  );
};

export default ProfileComponent;
