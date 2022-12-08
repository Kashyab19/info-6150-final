const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedback = new Schema({
    email : String,
    name: String,
    phoneNumber: String,
    message: String
});
 
module.exports = mongoose.model("feedback", feedback);