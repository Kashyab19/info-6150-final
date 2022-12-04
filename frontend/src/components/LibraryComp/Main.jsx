import React from "react";
import {Row, Col, Button} from "reactstrap";

const Main = props => {
    return (
    <div>
      <Row noGutters className="text-center align-items-center room-cta">
        <Col>
          <p className="looking-for-room">
            If you're looking space to study
            <i className="fas fa-regular fa-book room-space"></i>    
                    
          </p>

          <Button
            color="none"
            className="book-room-btn mx-md-5 my-1"
            onClick={_ => {
              props.setPage(1);
            }}
          >
            Book a Room
          </Button>

          <Button
          color="none"
          className="modify-room-btn mx-md-5"
          onClick={_=> {
            props.setPage(3);
          }}
          >
            Your Bookings
          </Button>
         
        </Col>
      </Row>
      <Row noGutters className="text-center big-img-container">
        <Col md="6">
        
          <img
            src={require("./Images/Library.jpg")}
            alt="Library"
            className="big-img"
          />
        </Col>
        
        <Col className="messaga-text" md="6">
          
          <h3 className="message-header"> <i className="fas fa-light fa-comments message-icon"></i> Message from the Dean </h3>
          <br/>
          <p>In Snell Library and online, we serve the Northeastern community, the neighborhoods around our campuses, and a global audience, making resources, services, and spaces available for learning and research. Our staff is always ready to help out whenever and wherever you are.</p>
        </Col>
      </Row>

      <Row noGutters className="text-center big-img-container">
        <Col md="6" className="hours-text">
          <h1>Hours</h1>
          <h2>Snell Library Open 24 Hours</h2>
          <p><strong>The library building is open 24 hours! </strong></p>
          <p>Building access is limited to<strong> current Northeastern University students, faculty, and staff</strong> with a valid Husky ID.</p>
          <p> Times listed below are in the Boston, Massachusetts time zone. </p>
          <table className="col-12 hours-table">
            <tbody className="hours-table-body">
              <tr>
                <th colspan="2">
			              <h4>Help &amp; Information Desk Service Hours</h4>
			          </th>
		          </tr>
              <tr>
                <td>Mon - Thurs:</td>
			          <td>8 AM - 10 PM</td>
		          </tr>
              <tr>
                <td>Fri:</td>
			          <td>8 AM - 9 PM</td>
		          </tr>
              <tr>
                <td>Sat:</td>
			          <td>11 AM - 9 PM</td>
		          </tr>
              <tr>
                <td>Sun:</td>
			          <td>11 AM - 10 PM</td>
		          </tr>
            </tbody>
          </table>
        </Col>

        <Col md="6">
          <img
              src={require("./Images/Library2.jpg")}
              alt="Library"
             className="big-img-2"
           />
        </Col>

      </Row>
    </div>
    );
};

export default Main;