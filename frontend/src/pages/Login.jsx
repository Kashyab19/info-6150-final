import "./Login.css";
import LoginComponent from "../components/LoginComponent";
import ResetPassword from "../components/ForgotComponent";
import { Route, Routes } from "react-router-dom";
import Register from "./Registration";
import VerificationComponent from "./Verification";

const Login = () => {
  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-8 text-black">
              <div className="mt-4 ms-xl-4 text-center">
                <span className="h1 fw-bold mb-0">Northeastern University</span>
              </div>

              <div className="d-flex align-items-center mt-5 justify-content-center">
                <Routes>
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/register" element={<Register />}></Route>
                  <Route
                    path="/verify"
                    element={<VerificationComponent />}
                  ></Route>
                  <Route
                    path="/resetPassword"
                    element={<ResetPassword />}
                  ></Route>
                </Routes>
              </div>
            </div>
            <div className="col-lg-6 col-md-4 px-0 d-none d-md-block">
              <img
                src="/northeastern.webp"
                alt="Login image"
                className="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "right" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
