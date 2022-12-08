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
