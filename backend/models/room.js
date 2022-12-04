var mongoose = require("mongoose");

const reservationSchema = require("./reservation").schema;

var roomSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  isAvailable: Boolean,
  location: String,
  reservation: {
    required: false,
    type: reservationSchema
  }
});
var Room = mongoose.model("Room", roomSchema);

module.exports.model = Room;
module.exports.schema = roomSchema;