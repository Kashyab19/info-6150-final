import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";



export default _ => {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [word, setWord] = useState();


useEffect(() => {
  console.log('Page Loaded');
  // fetch('http://localhost:3001/bookings/')
  axios.get('http://localhost:3001/bookings/', {
    params: { email: 'Reddy'},
    
}).then(
  response => {
    console.log(response.data)
    const roomData = response.data
    setWord(roomData)
  }
)
  // .then((data) => {
  //   setWord(data[0]);
  //   console.log(data)
  // })
  .catch(err => {
      console.log(err);
     });
  },[]);

  return (
    
    <div className="library-main-container vh-100">
      <Row noGutters className="text-center align-items-center">
        <Col>
          <p className="modify-header">Your Bookings</p>
          {
            word?.map(e =>{
              return(
                <div class="card-booking  card text-bg-secondary mb-3" style= {{"max-width" : "18rem"}}>
                  <div class="card-header">{e.name}</div>
                  <div class="card-body">
                  <h5 class="card-title">{e.location}</h5>
                  <p>Capacity : {e.capacity}</p>
                  <p>Booking Date : {e.bookingtime.split("T")[0]}</p>
                  <p>Booking Time : {e.bookingtime.split("T")[1]}</p>
                  </div>
                </div>
              )
            })
          }
        </Col>
      </Row>
      {/* <Row>
        <Col className="text-center align-items-center">
         
        </Col>
      </Row> */}
    </div>
  );
};