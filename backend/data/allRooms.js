// Processes allRooms JSON file into Mongo room objects

var mongoose = require("mongoose");
const Room = require("../models/room").model;
const fs = require("fs");

let roomData = fs.readFileSync(__dirname + "/allRooms.json");
roomData = JSON.parse(roomData).rooms;

let allRooms = [];
roomData.forEach(room => {
    allRooms.push(new Room(room));
});

module.exports = allRooms;