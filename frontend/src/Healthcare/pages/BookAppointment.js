import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import './css/App.css';
import Time from './Time'
import { Form, Button } from "react-bootstrap";
//import  from "react-bootstrap/Button";
import { UserContext } from '../../App.js'







function BookAppointment() {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [fullName, setfullName] = useState("");


  const { isValueFilled, setisValueFilled } = useContext(UserContext);

  function handleClick() {
    /* if (email.length > 0 && phoneNum.length > 0 && fullName.length > 0) {
      setisValueFilled(true);
    } */
    setisValueFilled(true);

  }

  function validateForm() {
    //if(loginState)
    if(email.length > 0 && phoneNum.length > 0 && fullName.length > 0){
      //setisValueFilled(true);
        }
    return email.length > 0 && phoneNum.length > 0 && fullName.length > 0;
  }

  return (
    <div className='mainDiv myBgFC mainDivAppointmentBooking'><br></br>
      <h1 className='header myTextColor'>**Make An Appointment**</h1><br></br>
      <h2 className='myTextColor'>Students who have the <a href='https://studenthealthplan.northeastern.edu' target={'blank'}>Northeastern University Student Health Plan (NUSHP)</a> can access live virtual clinical visits through<a href='https://studenthealthplan.northeastern.edu/telehealth-benefit/#_ga=2.169370977.1301097557.1670258119-912079606.1669502458' target={'blank'}> Well Connection.</a> This service provides licensed doctors and clinicians for minor medical and behavioral health care using their preferred device (cell phone, laptop, tablet, etc.). For more information <a href='https://cpb-us-w2.wpmucdn.com/404.html' target={'blank'}>click here</a>. When UHCS is closed, please visit a local urgent care or emergency department for immediate concerns.</h2>
      <div className='app'><br></br><br></br>
        <div>
          <Calendar onChange={setDate} value={date} onClickDay={() => setShowTime(true)} />
        </div>

        {date.length > 0 ? (
          <p>
            <span>Start:</span>
            {date[0].toDateString()}
            &nbsp;
            &nbsp;
            <span>End:</span>{date[1].toDateString()}
          </p>
        ) : (
          <p className='datePopulate'><br></br>
            <span >Default selected date:</span>{date.toDateString()}
          </p>
        )
        }
        <Time showTime={showTime} date={date} />

      </div><br></br>



      <Form className='appointmentForm'>
        <Form.Group size="lg">
          <Form.Label className="fullName">Full Name :</Form.Label><br></br>
          <Form.Control
            autoFocus
            id="fullName1"
            type="text"
            placeholder='Please Enter Your Full Name'
            required
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" >
          <Form.Label className="email1">Email :</Form.Label><br></br>
          <Form.Control
            autoFocus
            id="email1"
            type="email"
            placeholder='Please Type in Your Email Address'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" >
          <Form.Label className="phoneNum">Phone Num :</Form.Label><br></br>
          <Form.Control
            autoFocus
            id="phoneNum"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder='Please Type in Your Mobile Number (123-456-7890)'
            required
            value={phoneNum}
            onChange={(e) => setphoneNum(e.target.value)} />
        </Form.Group>

        <Button block="true" size="lg" id="buttonAppointment" onClick={handleClick} disabled={!validateForm()}>
          Book Appointment</Button>
      </Form>
    </div>


  )
}

export default BookAppointment;