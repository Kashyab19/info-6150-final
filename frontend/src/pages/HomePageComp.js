import { useState } from "react";
import axios from "../api/axios";
import "./styles/styles.css";
import "./styles/styles2.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
const HomePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow1(false);
  const handleShow = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [show4, setShow4] = useState(false);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [show5, setShow5] = useState(false);

  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);
  const [show6, setShow6] = useState(false);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/saveFeedback",
        JSON.stringify({
          email,
          name,
          phoneNumber,
          message,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log(err);
    }

    setEmail("");
    setMessage("");
    setPhoneNumber("");
    setMessage("");
    return;
  };
  return (
    <div>
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

          <Navbar className="justify-content-end">
            <Button
              variant="danger"
              onClick={() => {
                navigate("/authenticate/login");
              }}
            >
              Login/Register
            </Button>
          </Navbar>
        </Container>
      </Navbar>
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <img
            className="masthead-avatar rounded mb-5"
            src="./img/Husky-.png"
            alt="..."
          />

          <h1 className="masthead-heading mb-0">Northeastern University</h1>

          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fa fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>

          <p className="masthead-subheading font-weight-light mb-0">
            Fed up of visiting multiple sites? You came to the perfect place!{" "}
          </p>
        </div>
      </header>

      <section className="page-section portfolio" id="portfolio">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Important Features
          </h2>

          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 mb-5">
              <div
                className="portfolio-item mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#portfolioModal1"
                onClick={handleShow}
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <figure className="figure">
                  <img
                    className="img-fluid"
                    src="img/undraw_bookshelves_re_lxoy.svg"
                    alt="..."
                  />
                  <figcaption
                    className="figure-caption text-center text-secondary fig-caption-class p-1"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Library Services
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-5">
              <div
                className="portfolio-item mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#portfolioModal2"
                onClick={handleShow2}
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <figure className="figure">
                  <img
                    className="img-fluid"
                    src="img/undraw_eating_together_re_ux62.svg"
                    alt="..."
                  />
                  <figcaption
                    className="figure-caption text-center text-secondary fig-caption-class p-1"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Meal Plan
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-5">
              <div
                className="portfolio-item mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#portfolioModal3"
                onClick={handleShow3}
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <figure className="figure">
                  <img
                    className="img-fluid"
                    src="img/undraw_empty_cart_co35.svg"
                    alt="..."
                  />
                  <figcaption
                    className="figure-caption text-center text-secondary fig-caption-class p-1"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Market Place
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
              <div
                className="portfolio-item mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#portfolioModal4"
                onClick={handleShow4}
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <figure className="figure">
                  <img
                    className="img-fluid"
                    src="img/undraw_medical_care_movn.svg"
                    alt="..."
                  />
                  <figcaption
                    className="figure-caption text-center text-secondary fig-caption-class p-1"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Health care
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-5 mb-md-0">
              <div
                className="portfolio-item mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#portfolioModal5"
                onClick={handleShow5}
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <figure className="figure">
                  <img
                    className="img-fluid"
                    src="img/undraw_environmental_study_re_q4q8.svg"
                    alt="..."
                  />
                  <figcaption
                    className="figure-caption text-center text-secondary fig-caption-class p-1"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Course Registration
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="portfolio-item mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#portfolioModal6"
                onClick={handleShow6}
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <figure className="figure">
                  <img
                    className="img-fluid"
                    src="img/undraw_electric_car_b-7-hl.svg"
                    alt="..."
                  />
                  <figcaption
                    className="figure-caption text-center text-secondary fig-caption-class p-1"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Red eye
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section bg-primary text-white mb-0" id="about">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-white">
            About
          </h2>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row">
            <div className="col-lg-4 ms-auto">
              <p className="lead">
                With more than 3,300+ corporate partners in 90 countries, on
                every continent, Northeastern forges educational, experiential,
                and research partnerships. Our worldwide network of
                professionals and engaged university citizens includes more than
                255,000 alumni. <br />
                <strong>Keep Pace with the Speed of Innovation </strong>In this
                hyper-connected world, students can choose when, where, and how
                they learn. Consider it a new paradigm of education and access,
                tailored to working professionals and lifelong learners.
                Northeastern offers customizable courses of study, flexible
                formats, and challenging work experiences that propel careers
                forward.
              </p>
            </div>
            <div className="col-lg-4 me-auto">
              <p className="lead">
                <strong>Using Knowledge To Change the World </strong>As a tier-1 research
                university, Northeastern puts a premium on high-impact
                discovery—research that’s “use-inspired.” Students and faculty
                tackle challenges while working across disciplines, in fields
                from health and security to sustainability. And in our
                pioneering experiential PhD programs, students learn in
                environments relevant to their work, such as companies,
                laboratories, nonprofits, universities, and global
                organizations.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section" id="contact">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Feedback
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    data-sb-validations="required"
                  />
                  <label htmlFor="name">Full name</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    A name is required.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    data-sb-validations="required"
                  />
                  <label htmlFor="name">Enter your email</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    Email id required
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    data-sb-validations="required"
                  />
                  <label htmlFor="phone">Phone number</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="phone:required"
                  >
                    Phone number is required.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <FloatingLabel
                    controlId="floatingTextarea"
                    label="Comments"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Leave a comment here"
                    />
                  </FloatingLabel>
                </div>
                <div className="d-none" id="submitSuccessMessage">
                  <div className="text-center mb-3">
                    <div className="fw-bolder">Form submission successful!</div>
                  </div>
                </div>
                <div className="d-none" id="submitErrorMessage">
                  <div className="text-center text-danger mb-3">
                    Error sending message!
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-xl mx-auto"
                  id="submitButton"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Modal
        className="portfolio-modal modal fade"
        id="portfolioModal1"
        tabindex={"-1"}
        aria-labelledby="portfolioModal1"
        aria-hidden="true"
        show={show1}
        onHide={handleClose}
      >
        <div className="modal-dialog modal-l">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body text-center pb-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Library Services
                    </h2>
                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="divider-custom-line"></div>
                    </div>
                    <img
                      className="img-fluid rounded mb-5"
                      src="img/undraw_bookshelves_re_lxoy.svg"
                      alt="..."
                    />
                    <p className="mb-4">
                      Find the details about the Library , check avalability of
                      the private rooms and more with just a click
                    </p>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate("/home/library", {
                            state: { from: location },
                            replace: true,
                          });
                        }}
                      >
                        Access library 
                      </Button>
                    </Modal.Footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="portfolio-modal modal fade"
        id="portfolioModal2"
        tabindex="-1"
        aria-labelledby="portfolioModal2"
        aria-hidden="true"
        show={show2}
        onHide={handleClose2}
      >
        <div className="modal-dialog modal-l">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose2}
              ></button>
            </div>
            <div className="text-center pb-5" onHide={handleClose2}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Meal Plans
                    </h2>

                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="divider-custom-line"></div>
                    </div>

                    <img
                      className="img-fluid rounded mb-5"
                      src="img/undraw_eating_together_re_ux62.svg"
                      alt="..."
                    />

                    <p className="mb-4">
                      Find the details about various meal plans available on
                      campus
                    </p>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose2}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose2}>
                        Coming soon
                      </Button>
                    </Modal.Footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="portfolio-modal modal fade"
        id="portfolioModal3"
        tabindex="-1"
        aria-labelledby="portfolioModal3"
        aria-hidden="true"
        show={show3}
        onHide={handleClose3}
      >
        <div className="modal-dialog modal-l">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose3}
              ></button>
            </div>
            <div className="modal-body text-center pb-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Market Place
                    </h2>

                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="divider-custom-line"></div>
                    </div>

                    <img
                      className="img-fluid rounded mb-5"
                      src="img/undraw_empty_cart_co35.svg"
                      alt="..."
                    />

                    <p className="mb-4">Buy and sell products </p>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose3}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate("/home/marketPlace", {
                            state: { from: location },
                            replace: true,
                          });
                        }}
                      >
                        Market place
                      </Button>
                    </Modal.Footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="portfolio-modal modal fade"
        id="portfolioModal4"
        tabindex="-1"
        aria-labelledby="portfolioModal4"
        aria-hidden="true"
        onHide={handleClose4}
        show = {show4}
      >
        <div className="modal-dialog modal-l">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose4}
              ></button>
            </div>
            <div className="modal-body text-center pb-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Health center
                    </h2>

                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="divider-custom-line"></div>
                    </div>
                    <img
                      className="img-fluid rounded mb-5"
                      src="img/undraw_medical_care_movn.svg"
                      alt="..."
                    />
                    <p className="mb-4">
                      Check the details about the health center and insurance
                      plans available for students
                    </p>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose4}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate("/home/healthCare/about", {
                            state: { from: location },
                            replace: true,
                          });
                        }}
                      >
                        Health Care
                      </Button>
                    </Modal.Footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        className="portfolio-modal modal fade"
        id="portfolioModal5"
        tabindex="-1"
        aria-labelledby="portfolioModal5"
        aria-hidden="true"
        onHide={handleClose5}
        show= {show5}
      >
        <div className="modal-dialog modal-l">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center pb-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Course Registration
                    </h2>
                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="divider-custom-line"></div>
                    </div>
                    <img
                      className="img-fluid rounded mb-5"
                      src="img/undraw_environmental_study_re_q4q8.svg"
                      alt="..."
                    />
                    <p className="mb-4">
                      Register and view details about the courses
                    </p>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose4}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate("/home/courseRegistration", {
                            state: { from: location },
                            replace: true,
                          });
                        }}
                      >
                        Registration
                      </Button>
                    </Modal.Footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="portfolio-modal modal fade"
        id="portfolioModal6"
        tabindex="-1"
        aria-labelledby="portfolioModal6"
        aria-hidden="true"
        onHide={handleClose6}
        show= {show6}
      >
        <div className="modal-dialog modal-l">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose6}
              ></button>
            </div>
            <div className="modal-body text-center pb-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Red eye
                    </h2>

                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="divider-custom-line"></div>
                    </div>

                    <img
                      className="img-fluid rounded mb-5"
                      src="img/undraw_electric_car_b-7-hl.svg"
                      alt="..."
                    />

                    <p className="mb-4">
                      Check the availablity and book a safe ride to reach home
                    </p>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose4}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate("/home/redEye", {
                            state: { from: location },
                            replace: true,
                          });
                        }}
                      >
                        Red eye 
                      </Button>
                    </Modal.Footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <footer className="px-5 mt-5">
        <div className="row ">
          <div className="col-md-3  col-6">
            <h5>Connect</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Facebook
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Twitter
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  YouTube
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  LinkedIn
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3  col-6">
            <h5>Information</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Service Desk
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3  col-6">
            <h5>Contact</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">360 Hunting Ave.,</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Boston, Massachusetts</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">02115</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">617.373.2000</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">
                  Northastern University
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3  col-6">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of whats new and exciting from us.</p>
              <div className="d-flex gap-2 row">
                <input
                  id="newsletter1"
                  type="text"
                  className="col-md-5 col-12"
                  placeholder="Email address"
                />
                <a
                  className="btn btn-primary col-md-5 col-12"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Subscribe
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-center border-top mt-2 pt-2">
          <p>© 2022 Northeastern University. All rights reserved.</p>
        </div>
      </footer>

      <div
        className="modal animated fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Subscribed to the greatest! 🥳
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Go Huskies! 🐺</div>
            <div
              className="progress"
              style={{ marginLeft: "20px", marginRight: "20px" }}
            >
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "80%" }}
                aria-valuenow="80"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                80%
              </div>
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: "20%" }}
                aria-valuenow="20"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                20%
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
