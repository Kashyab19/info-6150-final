import React, { useState } from 'react'
//import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Popup from './Popup';
import "./css/StylesCommon.css";
import img from './Images/neu.png';
import { Button } from 'react-bootstrap';
import "./css/aboutUs.css";
 

function PolicyDetails() {
  const [searchInput, setSearchInput] = useState("");
  const element = <FontAwesomeIcon icon={faSearch} />
  const [isOpen, setIsOpen] = useState(false);
  const [ifNotFound, setIfNotFound] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const toggleIfNotFound = () => {
    setIfNotFound(!ifNotFound);
  }

  /* const policyDetails = [

    { PolicyNum: "NUQ66666", PolicyInfo: "You have a result here" },
    { PolicyNum: "NUQ55555", PolicyInfo: "You have a result here" },
    { PolicyNum: "NUQ11111", PolicyInfo: "You have a result here" },
    { PolicyNum: "NUQ22222", PolicyInfo: "You have a result here" },
    { PolicyNum: "NUQ33333", PolicyInfo: "You have a result here" },
    { PolicyNum: "NUQ44444", PolicyInfo: "You have a result here" },


  ] */

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };


  const onClickOfButton = () => {
    // using Java Script method to get PDF file
    fetch('./content/PolicyPDF.pdf').then(response => {
      response.blob().then(blob => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = './content/PolicyPDF.pdf';
        alink.click();
      })
    })
  }

  function validateForm() {
    //if(loginState)
    return searchInput.length > 4;
  };


  const handleClick = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ policyNum: searchInput})
      };
      console.log('Body sent to backend is ' + requestOptions.body);
      const response = await fetch('http://localhost:3001/getPolicyDetails', requestOptions);
      const responseText = await response.text();
      console.log(responseText);
      if (JSON.parse(responseText).response === "SUCCESS") {
        setIfNotFound(false);
        togglePopup();
        //console.log("My loginState in Login.js success is " + loginState);
      }
      else {
        //console.log("My loginState in Login.js failure is " + loginState);
        setIfNotFound(true);
      }
    } catch (error) {
      setIfNotFound(true);
      //console.log("My loginState in Login.js failure is " + loginState);
      alert("Request error!");
    }
  };

  /* function searchPolicy() {
    for (let i = 0; i < policyDetails.length; i++) {
      if (policyDetails[i].PolicyNum === searchInput) {
        //alert("Hey Buddy, " + policyDetails[i].PolicyInfo);
        setIfNotFound(false);
        togglePopup();
        return;
      }
    }
    setIfNotFound(true);
    //throw Error("Match Not Found, try again");


  }; */
  return (
    <div className='mainDiv myBgFC mainDivPolDet'>
      <div>
        <div className="policyImage"><img src={img} alt=""></img>
          <h2 className='welcomeNote'>Welcome Students</h2>
        </div>
        <input
          type="text"
          className='containerPolicyDetails'
          placeholder="Enter Your Policy Number"
          onChange={handleChange}
          value={searchInput} />
        <Button block="true" size="lg" type="submit" id="button1" onClick={handleClick} disabled={!validateForm()}>
          <span>{element}</span>
        </Button>

        <div className='sections policyDetSection'>
        <div>
          <div className='mySection'><h3 className='headerStyle'>Resources</h3>
            <ul>
              <li>Help Center</li>
              <li>University Health and Counselling Services</li>
              <li>Mental Health</li>
              <li>Student Discounts</li>
              <li>Free Health Webinars</li>

            </ul>
          </div>
        </div>
        <div>
          <div className='mySection1'>
            <h3 className='headerStyle'>Plan Summary</h3>
            <h1 className='header1Section1'>Carrier Name: Blue Cross Blue Shield of Massachusetts</h1>
            <p>Enroll in or Waive the 2022-2023 Northeastern University Student Health Insurance Plan before the posted deadline.</p><br></br>
            <div className='borderLine'></div><br></br>
            <h1>2022-2023 Annual Coverage Period: 09/01/2022 - 08/31/2023</h1>
            <p>Waiver Period: 07/18/2022 - 11/23/2022</p>
            <br></br>
            <marquee className='myMarquee'>Please contact UHCS if you seem to find any discrepancy in the information provided.</marquee>
          </div>
        </div>
      </div>


      </div><br></br>
      {/* <div className='sections'>
        <div>
          <div className='mySection'><h3 className='headerStyle'>Resources</h3>
            <ul>
              <li>Help Center</li>
              <li>University Health and Counselling Services</li>
              <li>Mental Health</li>
              <li>Student Discounts</li>
              <li>Free Health Webinars</li>

            </ul>
          </div>
        </div>
        <div>
          <div className='mySection1'>
            <h3 className='headerStyle'>Plan Summary</h3>
            <h1>Carrier Name: Blue Cross Blue Shield of Massachusetts</h1>
            <p>Enroll in or Waive the 2022-2023 Northeastern University Student Health Insurance Plan before the posted deadline.</p>
            <div className='borderLine'></div>
            <h1>2022-2023 Annual Coverage Period: 09/01/2022 - 08/31/2023</h1>
            <p>Waiver Period: 07/18/2022 - 11/23/2022</p>
          </div>
        </div>
      </div> */}

      <div>
        {/* <input
          type="button"
          value="Click to Open Popup"
          onClick={togglePopup}
        /> */}
        {isOpen && <Popup
          content={<>
            <b>Please find your policy details below:</b><br></br>
            <p>This letter is to verify that, Insurance ID# NUQ {searchInput}, is insured under the 2022-2023 Northeastern University Student Health Insurance Plan Student Health Insurance, Policy number 4955301. The effective dates of coverage are listed in the pdf below and may be subject to change.</p>
            <button onClick={onClickOfButton} className='policyDownButton'>Download Policy</button>
          </>}
          handleClose={togglePopup}
        />}

        {ifNotFound && <Popup
          content={<>
            <b>Policy Details Not Found</b>
            <p>NUQ {searchInput}, is not a valid policy number we have. Request you to kindly try again with the correct details or contact UHCS team for better alternative solution.</p>
            <button className='policyDownButton' disabled>Download Policy</button>
          </>}
          handleClose={toggleIfNotFound}
        />}
      </div>

    </div>
  )
}

export default PolicyDetails;