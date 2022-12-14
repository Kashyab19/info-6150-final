var mongoose = require("mongoose");

const reservationSchema = require("./Reservation").schema;

var roomSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  isAvailable: Boolean,
  location: String,
  isBlocked : {
    type: Boolean,
    default : false
  },
  reservation: {
    required: false,
    type: reservationSchema
  }
});
var Room = mongoose.model("Room", roomSchema);
// module.exports = mongoose.model("ROOM", roomSchema);
module.exports.model = Room;
module.exports.schema = roomSchema;