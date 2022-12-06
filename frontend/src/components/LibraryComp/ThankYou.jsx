import React from "react";
import { Row, Col } from "reactstrap";

export default _ => {
  return (
    <div>
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