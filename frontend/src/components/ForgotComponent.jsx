import { useState, useRef, useEffect, useContext } from "react";
import axios from "../api/axios";
import AuthenticationContext from "../context/AuthenticationContext";
import { useNavigate,useLocation } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RESET_URL = "api/passwordReset";
const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
const ResetPassword = () => {
  const codeRef = useRef();
  const errRef = useRef();
  const { auth } = useContext(AuthenticationContext);
  const [code, setCode] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    codeRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [code, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let v1 = PASSWORD_REGEX.test(password);
    let v2 = code.length == 6;
    if (!v1 || !v2) {
      setErrMsg(
        "Password should contian lower case and upper case alphabets, numeric and a special character"
      );
      return;
    }
    try {
      const response = await axios.post(
        RESET_URL,
        JSON.stringify({
          email: auth.email,
          code,
          newPassword:password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const json = response?.data;
      if (json.status === "SUCCESS") {
        navigate("/authenticate/login",{state : {location : location.pathname}});
        setCode("");
        setPassword("");
        setConfirmPassword("");
      } else if (json.message === "VERIFICATION_CODE_EXPIRED_SENDING_NEW_ONE") {
        setErrMsg(
          "Code exipered, please try again with new code send to your email"
        );
      } else if (json.message === "INVALID_CODE_CHECK_PLEASE_CHECK_DETAILS") {
        setErrMsg("Invalid code, please try once again");
      }
    } catch (err) {
      let responseJSON = err?.response?.data;
      console.log(responseJSON);
      setErrMsg('No server response, Please try again after some time')
      setCode("");
      setPassword("");
      setConfirmPassword("");
      errRef.current.focus();
    }
  };
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
        <h3 className="fw-normal mb-3 pb-3 text-center"></h3>

        <div className="mb-4">
          <label htmlFor="codeInput">Code</label>
          <input
            type="password"
            id="codeInput"
            className="form-control form-control-lg "
            ref={codeRef}
            autoComplete="off"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput">
            Password
            <span className={validPassword ? "icon-green" : "d-none"}>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            </span>
            <span
              className={validPassword || !password ? "d-none" : "icon-red"}
            >
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </span>
          </label>
          <input
            type="password"
            id="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
            className={
              password
                ? validPassword
                  ? "form-control is-valid"
                  : "form-control is-invalid"
                : "form-control"
            }
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <p
            id="pnote"
            className={
              passwordFocus && password && !validPassword
                ? "invalid-feedback"
                : "d-none"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 t0 16 characters <br />
            Must include uppercase and <br />
            lower case letters, a number and a special character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollor sign">$</span>
            <span aria-label="percent ">%</span>
            <br />
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPasswordInput">
            Confirm password
            <span
              className={
                confirmPassword && validConfirmPassword
                  ? "icon-green"
                  : "d-none"
              }
            >
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            </span>
            <span
              className={
                validConfirmPassword || !confirmPassword ? "d-none" : "icon-red"
              }
            >
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </span>
          </label>
          <input
            type="password"
            id="confirmPasswordInput"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            value={confirmPassword}
            className={
              confirmPassword
                ? validConfirmPassword
                  ? "form-control is-valid"
                  : "form-control is-invalid"
                : "form-control"
            }
            aria-invalid={validConfirmPassword ? "false" : "true"}
            aria-describedby="cpnote"
            onFocus={() => setConfirmPasswordFocus(true)}
            onBlur={() => setConfirmPasswordFocus(false)}
          />
          <p
            id="cpnote"
            className={
              confirmPasswordFocus && confirmPassword && !validConfirmPassword
                ? "invalid-feedback"
                : "visually-hidden"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Password and confirm password should match
            <br />
          </p>
        </div>

        <div className="pt-1 mb-4 text-center">
          <button
            className="btn btn-danger btn-lg btn-block"
            type="button"
            onClick={handleSubmit}
          >
            Reset password
          </button>
        </div>

        <p className="small mb-5 pb-lg-2">
          <a className="text-muted" href="#!">
            Send code again
          </a>
        </p>
      </form>
    </>
  );
};

export default ResetPassword;
