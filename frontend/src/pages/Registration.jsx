import { useRef, useState, useEffect,useContext } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Registration.css";
import axios from "../api/axios";
import { useNavigate,Link } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";

const EMAIL_REGEX = /^[a-z0-9.]{1,64}@northeastern.edu$/;
const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
const NAME_REGEX = /^[A-Za-z]{1,}$/;
const NUID_REGEX = /^[A-Za-z1-9]{9}$/;
const REGISTER_URL = "api/signup";

const Register = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const { setAuth } = useContext(AuthenticationContext);
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [nuId, setNuId] = useState("");
  const [validNuId, setValidNuId] = useState(false);
  const [nuIdFocus, setNuIdFocus] = useState(false);

  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");
  const [majorList, setMajorList] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
   
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setErrMsg("");
  }, [lastName, firstName, email, password, confirmPassword, nuId]);

  useEffect(() => {
    setValidNuId(NUID_REGEX.test(nuId));
  }, [nuId]);

  useEffect(() => {

    if (degree !== "GR" && degree) {
      setMajor("");
      setMajorList([]);
    } else if (college === "COE") {
      setMajorList([
        { major: "SES", name: "Software Enginnering and Systems" },
        { major: "MIS", name: "Information Systems" },
      ]);
    } else if (college === "KCS") {
      setMajorList([
        { major: "CS", name: "Computer science" },
        { major: "AI", name: "Artificial Intelligence" },
      ]);
    } else if (college === "CPS") {
      setMajorList([
        { major: "AN", name: "Analytics" },
        { major: "RA", name: "Regulatory Affairs" },
      ]);
    }
  }, [degree, college]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);
    const v3 = NAME_REGEX.test(firstName);
    const v4 = NAME_REGEX.test(lastName);
    const v5 = NUID_REGEX.test(nuId);
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid entries, please check the required details");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, password, firstName, lastName,nuId, role: "S" , "studentDetails" :  {
          college ,  degree , major 
        } }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const responseJson = response.data;
      if(responseJson.status === 'SUCCESS'){
        clear()
        setAuth({email , firstName});
        navigation("/authenticate/verify");
      }else if(responseJson.message === 'SINGUP_FAILED_DUE_TO_SYSTEM_ERROR'){
        setErrMsg("Facing issue with the server, please contact support or try again after some time");
      }else if(responseJson.message === 'EMAILID_ALREADY_EXISTS'){
        setValidEmail(false);
        setErrMsg("Account already existis with provided email id, please try with new email id or use a different email to Sign up");
      }else{
        setErrMsg("Unexpected error , please check the details and try again");
      }
      
      
    } catch (err) {
      console.log(err);
      setErrMsg("Unexpected error , please check the details and try again ")
      errorRef.current.focus();
      clear("")
    }
  };
  const clear = ()=> {
      setEmail("");
      setNuId("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setDegree("")
      setMajor("")
      setCollege("")
  }
  return (
    <div >
      <h3 className="fw-normal pb-3 text-center">Welcome, Register with us</h3>
      {/* <p
        ref={errorRef}
        className={errMsg ? "errMsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>*/}
      <form
        className="justify-content-center needs-validation"
        onSubmit={handleSubmit} style={{ width: "33rem" }}
      >
        <div
          className={
            errMsg ? "alert alert-danger alert-dismissible show" : "d-none"
          }
          role="alert"
          aria-live="assertive"
          ref={errorRef}
        >
          {errMsg}
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput">
            
              Email
              <span className={validEmail ? "icon-green" : "d-none"}>
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              </span>
              <span className={validEmail || !email ? "d-none" : "icon-red"}>
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
              </span>
            
          </label>
          <input
            type="email"
            id="emailInput"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            className={
              email
                ? validEmail
                  ? "form-control is-valid"
                  : "form-control is-invalid"
                : "form-control"
            }
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail ? "invalid-feedback" : "d-none"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Enter email ending with @northeastern.edu
            <br />
          </p>
        </div>
        <div className="row">
          <div className="mb-3 col-sm-6">
            <label htmlFor="firstNameInput">
              
                FirstName
                <span className={validFirstName ? "icon-green" : "d-none"}>
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </span>
                <span
                  className={
                    validFirstName || !firstName ? "d-none" : "icon-red"
                  }
                >
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </span>
              
            </label>
            <input
              type="text"
              id="firstNameInput"
              onChange={(e) => setFirstName(e.target.value)}
              required
              value={firstName}
              className={
                firstName
                  ? validFirstName
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                  : "form-control"
              }
              aria-invalid={validFirstName ? "false" : "true"}
              aria-describedby="firstnameNote"
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
            />
            <span
              id="firstnameNote"
              className={
                firstNameFocus && firstName && !validFirstName
                  ? "invalid-feedback"
                  : "d-none"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              First name should contain only alphabets
              <br />
            </span>
          </div>
          <div className="mb-3 col-sm-6">
            <label htmlFor="lastNameInput">
              
                Lastname
                <span className={validLastName ? "icon-green" : "d-none"}>
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </span>
                <span
                  className={validLastName || !lastName ? "d-none" : "icon-red"}
                >
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </span>
              
            </label>
            <input
              type="text"
              id="lastNameInput"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={
                lastName
                  ? validLastName
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                  : "form-control"
              }
              aria-invalid={validLastName ? "false" : "true"}
              aria-describedby="lsnote"
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
            />
            <p
              id="lsnote"
              className={
                lastNameFocus && lastName && !validLastName
                  ? "invalid-feedback"
                  : "d-none"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Lastname should contain only alphabets
              <br />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-sm-6">
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
              Must include uppercase and <br/>
              lower case letters, a number and a
              special character.
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
          <div className="mb-3 col-sm-6">
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
                    validConfirmPassword || !confirmPassword
                      ? "d-none"
                      : "icon-red"
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
        </div>
        <div className="mb-3">
          <label htmlFor="nuIdInput">
            
              Northeaster ID
              <span className={validNuId ? "icon-green" : "d-none"}>
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              </span>
              <span className={validNuId || !nuId ? "d-none" : "icon-red"}>
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
              </span>
            
          </label>
          <input
            type="text"
            id="nuIdInput"
            autoComplete="off"
            onChange={(e) => setNuId(e.target.value)}
            required
            value={nuId}
            className={
              nuId
                ? validNuId
                  ? "form-control is-valid"
                  : "form-control is-invalid"
                : "form-control"
            }
            aria-invalid={validNuId ? "false" : "true"}
            aria-describedby="nuIdNote"
            onFocus={() => setNuIdFocus(true)}
            onBlur={() => setNuIdFocus(false)}
          />
          <p
            id="emailnote"
            className={
              nuIdFocus && nuId && !validNuId ? "invalid-feedback" : "d-none"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Northeastern Idenfication number should be of 9 characters
            <br />
            Only Alphabets and numeric characters are allowed.
            <br />
          </p>
        </div>
        <div className="row mb-3">
          <div className="col-sm-6 mb-3">
            <select
              class="form-select"
              
              aria-label="Select College"
              value={college}
              onChange={(e) => {
                setCollege(e.target.value);
              }}
            >
              <option value="" disabled>Select College</option>
              <option value="COE">College Of Enginnering</option>
              <option value="CPS">College of professional Studies</option>
              <option value="KCS">Khoury College of Computer Sciences</option>
            </select>
          </div>
          <div className="col-sm-6 mb-3">
            <select
              class="form-select"
              
              aria-label="Select degree"
              value={degree}
              onChange={(e) => {
                setDegree(e.target.value);
              }}
            >
              <option value="" disabled>Select Degree</option>
              <option value="UG">Undergraduate</option>
              <option value="GR">Graduate</option>
              <option value="PHD">Doctor of Philosophy</option>
            </select>
          </div>
          </div>
          {
            majorList.length >0 ? 
            <div className="col-sm-6 mb-3">
              <select
                class="form-select"
                
                aria-label="Select major"
                value={major}
                onChange={(e) => {
                  setMajor(e.target.value);
                }}
              >
                <option disabled value="">Selct major</option>
                {
                majorList.map((data) => {
                  return <option key = {data.major} value={data.major}>{data.name}</option>
                })}
              </select>
            </div> : <></>
          }
        
        <div className="pt-1 mb-4 text-center">
          <button
            disabled={
              !validEmail ||
              !validFirstName ||
              !validLastName ||
              !validPassword ||
              !validConfirmPassword ||
              !validNuId
                ? true
                : false
            }
            className="btn btn-danger btn-lg btn-block"
          >
            Sign up!!
          </button>
        </div> 
        <p>
          Already registered? 
          <span>
            {" "}
            <Link to="/authenticate/login">Sign In</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
