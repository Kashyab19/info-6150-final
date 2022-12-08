import React, { useState, useContext } from 'react';
import { UserContext } from '/Users/rushikeshdeore/Desktop/Fall22/INFO6150/FinalProject/info6150-project/frontend/src/App.js';
const time = ['08:00 |', '09:00 |', '10:00 |', '14:00 |', '15:00']

function Times(props) {
  const { isValueFilled, setisValueFilled } = useContext(UserContext);

  const [event, setEvent] = useState(null)
  const [info, setInfo] = useState(false)

  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
  }

  /* const time = async () => {
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
  }; */

  return (

    <>
     {isValueFilled && <div className="times shownTime">
        {time.map(times => {
          return (
            <div>
              <button onClick={(e) => displayInfo(e)}> {times} </button>
            </div>
          )
        })}
      </div>} 
      {isValueFilled && <div className='appConfirmation'>
        {info ? <marquee className="appConfirmMarquee">Your appointment is set to {event} {props.date.toDateString()}</marquee> : null}
{/*         {info ? `Your appointment is set to ${event} ${props.date.toDateString()}` : null}
 */}      </div>}

    </>
  )
}

export default Times;
