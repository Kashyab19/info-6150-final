var mongoose = require("mongoose");
const roomSchema = require("./room").schema;

var daySchema = new mongoose.Schema({
  date: Date,
  rooms: [roomSchema]
});
var Day = mongoose.model("Day", daySchema);

module.exports.model = Day;
module.exports.schema = daySchema;