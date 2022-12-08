import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button
} from "reactstrap";

import Room from "./Room";

export default props => {
  const [totalRooms, setTotalRooms] = useState([]);

  // User's selections
  const [selection, setSelection] = useState({
    room: {
      name: null,
      id: null
    },
    date: new Date(),
    time: null,
    location: "Any Location",
    size: 0
  });

  // User's booking details
  const [booking, setBooking] = useState({
    name: "",
    // phone: "",
    email: ""
  });

  // List of potential locations
  const [locations] = useState(["Any Location", "First Floor", "Second Floor", "Third Floor"]);
  const [times] = useState([
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM"
  ]);
  // Basic reservation "validation"
  const [reservationError, setReservationError] = useState(false);

  const getDate = _ => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();
    let time = selection.time.slice(0, -2);
    time = selection.time > 12 ? time + 12 + ":00" : time + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
  };

  const getEmptyRooms = _ => {
    let rooms = totalRooms.filter(room => room.isAvailable);
    return rooms.length;
  };

  useEffect(() => {
    // Check availability of rooms from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async _ => {
        let datetime = getDate();
        let res = await fetch("http://localhost:3001/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            date: datetime
          })
        });
        res = await res.json();
        // Filter available rooms with location and group size criteria
        let rooms = res.rooms.filter(
          room =>
            (selection.size > 0 ? room.capacity >= selection.size : true) &&
            (selection.location !== "Any Location"
              ? room.location === selection.location
              : true)
        );
        setTotalRooms(rooms);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.location]);

  // Make the reservation if all details are filled out
  const reserve = async _ => {
    if (
      (booking.name.length === 0) |
      // (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {
      const datetime = getDate();
      let res = await fetch("http://localhost:3001/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          room: selection.room.id
        })
      });
      res = await res.text();
      console.log("Reserved: " + res);
      props.setPage(2);
    }
  };

  // Clicking on a room sets the selection state
  const selectRoom = (room_name, room_id) => {
    setSelection({
      ...selection,
      room: {
        name: room_name,
        id: room_id
      }
    });
  };

  // Generate Team size dropdown
  const getSizes = _ => {
    let newSizes = [];

    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          onClick={e => {
            let newSel = {
              ...selection,
              room: {
                ...selection.room
              },
              size: i
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = _ => {
    let newLocations = [];
    locations.forEach(loc => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              room: {
                ...selection.room
              },
              location: loc
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });
    return newLocations;
  };

  // Generate locations dropdown
  const getTimes = _ => {
    let newTimes = [];
    times.forEach(time => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              room: {
                ...selection.room
              },
              time: time
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  // Generating rooms from available rooms state
  const getRooms = _ => {
    console.log("Getting rooms");
    if (getEmptyRooms() > 0) {
      let rooms = [];
      totalRooms.forEach(room => {
        if (room.isAvailable) {
          rooms.push(
            <Room
              key={room._id}
              id={room._id}
              chairs={room.capacity}
              name={room.name}
              empty
              selectRoom={selectRoom}
            />
          );
        } else {
          rooms.push(
            <Room
              key={room._id}
              id={room._id}
              chairs={room.capacity}
              name={room.name}
              selectRoom={selectRoom}
            />
          );
        }
      });
      return rooms;
    }
  };

  return (
    <div className="library-book-container vh-100  justify-content-center">
      <Row noGutters className="text-center align-items-center room-cta">
        <Col>
          <p className="looking-for-room">
            {!selection.room.id ? "Book a Room" : "Confirm Reservation"}
            <i
              className={
                !selection.room.id
                  ? "fas fa-chair room-space"
                  : "fas fa-clipboard-check room-space"
              }
            ></i>
          </p>
          <p className="selected-room">
            {selection.room.id
              ? "You are booking room " + selection.room.name
              : null}
          </p>

          {reservationError ? (
            <p className="reservation-error">
              * Please fill out all of the details.
            </p>
          ) : null}
        </Col>
      </Row>

      {!selection.room.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="text-center align-items-center offset-lg-1">
            <Col xs="12" sm="3">
              <input
                type="date"
                min = "2022-12-08"
                required="required"
                className="booking-dropdown"
                value={selection.date.toISOString().split("T")[0]}
                onChange={e => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      room: {
                        ...selection.room
                      },
                      date: new Date(e.target.value)
                    };
                    setSelection(newSel);
                  } else {
                    console.log("Invalid date");
                    let newSel = {
                      ...selection,
                      room: {
                        ...selection.room
                      },
                      date: new Date()
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.time === null ? "Select a Time" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.location}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.size === 0
                    ? "Select a Team Size"
                    : selection.size.toString()}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getSizes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          <Row noGutters className="rooms-display">
            <Col>
              {getEmptyRooms() > 0 ? (
                <p className="available-rooms">{getEmptyRooms()} available</p>
              ) : null}

              {selection.date && selection.time ? (
                getEmptyRooms() > 0 ? (
                  <div>
                    <div className="room-key">
                      <span className="empty-room"></span> &nbsp; Available
                      &nbsp;&nbsp;
                      <span className="full-room"></span> &nbsp; Unavailable
                      &nbsp;&nbsp;
                    </div>
                    <Row noGutters xs="2" sm="6" md="4">{getRooms()}</Row>
                  </div>
                ) : (
                  <p className="room-display-message">No Available Rooms</p>
                )
              ) : (
                <p className="room-display-message ">
                  Please select a date and time for your reservation.
                </p>
              )}
            </Col>
          </Row>
          {/* <Row>
                
          </Row>
          <Row>
                
          </Row>
          <Row>
                
          </Row> */}
          
          
        </div>
      ) : (
        <div id="confirm-reservation-stuff">
          <Row
            noGutters
            className="text-center justify-content-center reservation-details-container"
          >
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Name"
                className="reservation-input"
                value={booking.name}
                onChange={e => {
                  setBooking({
                    ...booking,
                    name: e.target.value
                  });
                }}
              />
            </Col>
            {/* <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Phone Number"
                className="reservation-input"
                value={booking.phone}
                onChange={e => {
                  setBooking({
                    ...booking,
                    phone: e.target.value
                  });
                }}
              />
            </Col> */}
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Email"
                className="reservation-input"
                value={booking.email}
                onChange={e => {
                  setBooking({
                    ...booking,
                    email: e.target.value
                  });
                }}
              />
            </Col>
          </Row>
          <Row noGutters className="text-center">
            <Col>
              <Button
                color="none"
                className="book-room-btn"
                onClick={_ => {
                  reserve();
                }}
              >
                Book Now
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};