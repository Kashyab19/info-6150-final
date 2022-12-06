var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/Day").model;
const Reservation = require("../models/Reservation").model;

// Parameters:
// {
//   "date": String ("Dec 02 2022 06:00"),
//   "table": table id,
// 	"name": String,
// 	"phone": String,
// 	"email": String
// }

router.get("/", async (req, res, next) => {
  const days = await Day.find().lean();
      let room ;
      let rooms = [];
      if (days.length > 0) {
        for(let i=0;i< days.length;i++){
          for(let j=0;j < days[i].rooms.length;j++){
            room = days[i].rooms[j];
            if(!room.isAvailable && room?.reservation?.email == 'wejdnjewn'){
              console.log("Entered inside if block")
              rooms.push(room);
            }
          }
        }
        return res.status(200).send(rooms);
      } else {
        console.log("Day not found");
      }
    })

module.exports = router;