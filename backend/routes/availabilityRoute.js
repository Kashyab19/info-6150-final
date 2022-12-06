var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const RoomSchema = require('../models/Room');
const Day = require("../models/Day").model;

// Parameters:
// {
//   "date": String ("Dec 02 2022 06:00")
// }

router.post("/", function(req, res, next) {
  console.log("request attempted");

  console.log(req.body);
  const dateTime = new Date(req.body.date);

  Day.find({ date: dateTime }, async(err, docs) => {
    if (!err) {
      if (docs.length > 0) {
        // Record already exists
        console.log("Record exists. Sent docs.");
        res.status(200).send(docs[0]);
      } else {
        // Searched date does not exist and we need to create it
        const allRooms = await RoomSchema.find({isAvailable : true});
        const day = new Day({
          date: dateTime,
          rooms: allRooms
        });
        day.save(err => {
          if (err) {
            res.status(400).send("Error saving new date");
          } else {
            // Saved date and need to return all rooms (because all are now available)
            console.log("Created new datetime. Here are the default docs");
            Day.find({ date: dateTime }, (err, docs) => {
              err ? res.sendStatus(400) : res.status(200).send(docs[0]);
            });
          }
        });
      }
    } else {
      res.status(400).send("Could not search for date");
    }
  });
});

module.exports = router;