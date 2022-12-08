import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./css/StylesCommon.css";
import Popup from './Popup';

function Contact() {
  const [isFilled, setisFilled] = useState(false);
  const [email, setEmail] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [fullName, setfullName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [StudentId, setStudentId] = useState("");
  //const [isPickingTopic, setisPickingTopic] = useState("");
  const [messageUs, setmessageUs] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


  function formSubmit() {
    if (email.length > 0 && birthDate.length > 0 && fullName.length > 0 && StudentId.length > 0 && messageUs.length > 0) {
      setisFilled(true);
    }
    else {
      alert('Kindly enter all the details for better assistance.');
    }

  }






  return (
    <div className='mainDiv myBgFC mainDivContact'><br></br>
      <Form>
        <Form.Group size="lg">
          <Form.Label className="fullName">Full Name</Form.Label><br></br>
          <Form.Control
            autoFocus
            id="fullName"
            type="text"
            placeholder='Please Enter Your Full Name'
            required
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg">
          <Form.Label className="studentID">Student Id</Form.Label><br></br>
          <Form.Control
            id="studentID"
            type="text"
            placeholder='Enter Your NUID'
            required
            value={StudentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <Form.Label className="email">Email</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder='Please Type in Your Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" >
          <Form.Label className="DOB">Birth Date</Form.Label><br></br>
          <Form.Control
            autoFocus
            id="DOB"
            type="date"
            required
            value={birthDate}
            onChange={(e) => setbirthDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg">
          <Form.Label className="helpTopic">Pick Topic</Form.Label><br></br>
          <label>
            <select id="helpTopic">
              <option value="Login">Login Assitance</option>
              <option value="Waiver">Waiver Assistance</option>
              <option value="Enrollment">Enrollment Assistance</option>
              <option value="Benefit">Benefit Questions</option>
              <option value="Online">My Online Account</option>
              <option value="Verfication">ID Card/Verfication of Coverage Letter</option>
              <option value="Claims">Claims Status</option>
            </select>
          </label>


          {/*  <Form.Control
            autoFocus
            id="helpTopic"
            type="dropdown"
            placeholder='Choose a Topic For Assistance'
           value={email}
          onChange={(e) => setEmail(e.target.value)}
          /> */}
          <h2 className='myHeader'>How May We Help You Today?</h2><br></br>

        </Form.Group>
        <Form.Group size="lg">
          <Form.Label className="message">Message Us</Form.Label><br></br>
          <Form.Control
            autoFocus
            id="message"
            type="text"
            placeholder='Kindly Type In Your Query, And Brief It So That We Can Help You.'
            required
            value={messageUs}
            onChange={(e) => setmessageUs(e.target.value)}
          />
        </Form.Group>

        <Button block="true" size="lg" id="button" onClick={formSubmit}>
          SEND MESSAGE
        </Button>
      </Form>
      {isFilled && <Popup
        content={<>
          <b>Thank you for submitting your query :</b><br></br>
          <p>We have received your request successfully and our team will reach you with next 24 hours regarding your query. Your ticket number is </p>
        </>}
        handleClose={togglePopup}
      />}
    </div>
  )
}

export default Contact;