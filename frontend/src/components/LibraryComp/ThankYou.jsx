import React from "react";
import { Row, Col } from "reactstrap";

export default _ => {
  return (
    <div className="library-main-container vh-100">
      <Row noGutters className="text-center">
        <Col>
          <p className="thanks-header">Thank You!</p>
          <i className="fas fa-regular fa-school thank-you-room"></i>
          <p className="thanks-subtext">
            Have a productive hour!!.
          </p>
        </Col>
      </Row>
    </div>
  );
};