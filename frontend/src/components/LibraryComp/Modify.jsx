import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";



export default _ => {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [word, setWord] = useState();

useEffect(() => {
  console.log('Page Loaded');
  fetch('http://localhost:3001/bookings/')
  .then((response) => response.json())
  .then((data) => {
    setWord(data[0]);
    console.log(data)
  })
  .catch(err => {
      console.log(err);
     });
  },[]);

  return (
    
    <div className="library-main-container vh-100">
      <Row noGutters className="text-center align-items-center">
        <Col>
          <p className="modify-header">Your Bookings</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center align-items-center">
          {/* {word.map((booking) => {
            return (
            <p>
              {booking.name}
            </p>
            )
          })} */}
          <div class="card-booking  card text-bg-secondary mb-3" style= {{"max-width" : "18rem"}}>
          <div class="card-header">Header</div>
          <div class="card-body">
          <h5 class="card-title">Secondary card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};