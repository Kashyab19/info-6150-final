const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const multer  = require('multer')
const courseSchema = new Schema({
    program: String,
    courseID : String,
    courseName: String,
    term: String,
    description: String,
    professor: String,
    meetingTime: String,
    location: String,
    credits: String,
    contact: String,
    seats: Number
});

const model = mongoose.model("Courses", courseSchema);

model.createIndexes();

module.exports = model;