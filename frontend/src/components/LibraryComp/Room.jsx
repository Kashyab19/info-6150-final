import React from "react";
import { Row, Col } from "reactstrap";

export default props => {
  const getRow1 = _ => {
    let chairs = [];
    for (var i = 0; i < Math.ceil(props.chairs / 2); i++) {
      chairs.push(
        <span
          key={i}
          className={props.empty ? "empty-room" : "full-room"}
        ></span>
      );
    }
    return chairs;
  };
  const getRow2 = _ => {
    let chairs2 = [];
    for (var i = 0; i < Math.floor(props.chairs / 2); i++) {
      chairs2.push(
        <span
          key={i}
          className={props.empty ? "empty-room" : "full-room"}
        ></span>
      );
    }
    return chairs2;
  };

  return (
    <div className="room-container">
      <Col
        className={props.empty ? "room selectable-room" : "room"}
        onClick={_ => {
          props.empty
            ? props.selectRoom(props.name, props.id)
            : console.log("Tried to select a full room");
        }}
      >
        <Row noGutters className="room-row">
          <Col className="text-center">{getRow1()}</Col>
        </Row>
        <Row noGutters className="room-row">
          <Col className="text-center">{getRow2()}</Col>
        </Row>

        <p className="text-center room-name">{props.name}</p>
      </Col>
    </div>
  );
};