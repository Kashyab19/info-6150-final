import { useState, useRef, useEffect, useContext } from "react";
import axios from "../api/axios";
import AuthenticationContext from "../context/AuthenticationContext";
import { useNavigate,Link, useLocation } from "react-router-dom";

const LOGIN_URL = "api/login";
const FORGOT_PASSWORD_URL = "api/forgotPassword";

const EMAIL_REGEX = /^[a-z0-9.]{1,64}@northeastern.edu$/;
const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
const LoginComponent = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const { setAuth } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const location  =  useLocation();
  useEffect(() => {
    if(location?.state?.location === '/authenticate/resetPassword'){
      setSuccessMsg("Password reset successful, Please login to continue");
    }
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    setSuccessMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let v1 = EMAIL_REGEX.test(email);
    let v2 = PASSWORD_REGEX.test(password);
    if(!v1 || !v2 ){
      setErrMsg(
        "Incorrect email or password, please check the details and try once again"
      );
      return;
    }
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.data.accessToken;
      setAuth({accessToken,email, "firstName" : response?.data?.data?.firstName})
      navigate("/profile");
      setEmail("");
      setPassword("");
    } catch (err) {
      let responseJSON = err?.response?.data;
      if (responseJSON?.message === "PASSWORD_INCORRECT") {
        setErrMsg(
          "Incorrect email or password, please check the details and try once again"
        );
      } else if (responseJSON?.message === "EMAIL_ID_NOT_FOUND") {
        setErrMsg(
          "Account doesnot exist with the email ID provided , please create account to continue"
        );
      } else if (responseJSON?.message === "PLEASE_VERIFY_EMAIL_TO_PROCEED") {
        setAuth({email})
        navigate("/authenticate/verify", {state :{"location" : location.pathname}});
      } else {
        setErrMsg("No server response");
      }
      errRef.current.focus();
    }
  };
  const forgotPassword = async () => {
    let v1 = EMAIL_REGEX.test(email)
    if(!v1){
      setErrMsg("Please enter valid email, a verification code will be sent to your email to reset the password")
      return;
    }

    const response = await axios.get(
      FORGOT_PASSWORD_URL,{ params: { email } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response?.data);
    if(response?.data?.status === 'SUCCESS'){
      setAuth({email});
      navigate("/authenticate/resetPassword");
    }else{
      setErrMsg("No server response, please try again after some time")
    }

  }
  return (
    <>
      <form style={{ width: "23rem" }} className="needs-validation">
        <div
          className={
            errMsg ? "alert alert-danger alert-dismissible show" : "d-none"
          }
          role="alert"
          aria-live="assertive"
          ref={errRef}
        >
          {errMsg}
        </div>
        <div
          className={
            successMsg ? "alert alert-success alert-dismissible show" : "d-none"
          }
          role="alert"
          aria-live="assertive"
        >
          {successMsg}
        </div>
        <h3 className="fw-normal mb-3 pb-3 text-center">Log in</h3>

        <div className="mb-4">
          <label htmlFor="emailInput">Email address</label>
          <input
            type="email"
            id="emailInput"
            className="form-control form-control-lg "
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email address"
            required
            focus
          />
        </div>

        <div className="mb-4">
          <label htmlFor="passInput">Password</label>
          <input
            type="password"
            className="form-control form-control-lg"
            id="passMDBInput"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            label="Enter"
          />
        </div>

        <div className="pt-1 mb-4 text-center">
          <button
            className="btn btn-danger btn-lg btn-block"
            type="button"
            onClick={handleSubmit}
            disabled = { EMAIL_REGEX.test(email) && PASSWORD_REGEX.test(password) ? false : true}
          >
            Login
          </button>
        </div>

        <p className="small mb-5 pb-lg-2">
          <a className="text-muted" onClick={forgotPassword} style = {{cursor : "pointer"}}>
            Forgot password?
          </a>
        </p>
        <p>
          Don't have an account?{" "}
          <Link to="/authenticate/register" className="link-info">
            Register here
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginComponent;
