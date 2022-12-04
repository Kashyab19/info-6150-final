var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;

// Parameters:
// {
//   "date": String ("Dec 02 2022 06:00"),
//   "table": table id,
// 	"name": String,
// 	"phone": String,
// 	"email": String
// }

router.get("/", function(req, res, next) {
  Day.find( (err, days) => {
    if (!err) {
      if (days.length > 0) {
        console.log(days)
        // let day = days[0];
        // day.rooms.forEach(room => {
        //   if (room._id == req.body.room) {
        //     room.reservation = new Reservation({
        //       name: req.body.name,
        //       phone: req.body.phone,
        //       email: req.body.email
        //     });
        //     room.isAvailable = false;
        //     day.save(err => {
        //       if (err) {
        //         console.log(err);
        //       } else {
        //         console.log("Reserved");
        //         res.status(200).send("Added Reservation");
        //       }
        //     });
        //   }
        // });
        res.status(200).send("Added Reservation");
      } else {
        console.log("Day not found");
      }
    }
  });
});

module.exports = router;