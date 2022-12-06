import { useState, useRef, useEffect, useContext } from "react";
import axios from "../api/axios";
import AuthenticationContext from "../context/AuthenticationContext";
import { useNavigate, useLocation } from "react-router-dom";

const VERIFICATION_URL = "api/verifyCode";

const VerificationComponent = () => {
  const codeRef = useRef();
  const errRef = useRef();
  const { auth, setAuth } = useContext(AuthenticationContext);
  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location?.state?.location === "/authenticate/login") {
      setSuccessMsg(
        "Email not verified yet, please enter the code sent to your email to verify your account"
      );
    }
    codeRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        VERIFICATION_URL,
        JSON.stringify({
          email: auth.email,
          code,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      let json = response?.data;
      console.log(json);
      if (json.status === "SUCCESS") {
        setAuth({ ...auth, accessToken: json.data.accessToken });
        navigate("/");
      } else {
        setErrMsg(
          "Invalid/ Expired veririfaction code, please try with the new code sent to your email"
        );
      }
    } catch (err) {
      let responseJSON = err?.response?.data;
      setErrMsg(
        "No server response, please try again after some time"
      );
      console.log(err.response);
      errRef.current.focus();
    }
  };

  const sendCodeAgain = () => {};
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
            successMsg ? "alert alert-danger alert-dismissible show" : "d-none"
          }
          role="alert"
          aria-live="assertive"
        >
          {successMsg}
        </div>
        {successMsg ? (
          <></>
        ) : (
          <h5 className="fw-normal mb-3 pb-3 text-center">
            Hi <strong>{auth.firstName}</strong>, Enter the code to cofirm your
            email.
          </h5>
        )}
        <div className="mb-4">
          <label htmlFor="codeInput">Verification Code</label>
          <input
            type="text"
            id="codeInput"
            className="form-control form-control-lg "
            ref={codeRef}
            autoComplete="off"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            required
            placeholder="Enter code sent to you email"
          />
        </div>

        <div className="pt-1 mb-4 text-center">
          <button
            className="btn btn-danger btn-lg btn-block"
            type="button"
            onClick={handleSubmit}
          >
            Verify
          </button>
        </div>

        <p>
          Didn't recive the code yet,{" "}
          <a onClick={sendCodeAgain} className="link-info">
            Send a new code
          </a>
        </p>
      </form>
    </>
  );
};

export default VerificationComponent;
