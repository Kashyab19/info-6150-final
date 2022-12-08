const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const multer  = require('multer')
const selectedCourseSchema = new Schema({
    Contact: String,
    CourseID : String,
    CourseName: String,
    Location: String,
    MeetingTime: String,
    Professor: String,
    Program: String,
    Email: String,
});

const model = mongoose.model("SelectedCourses", selectedCourseSchema);

model.createIndexes();

module.exports = model;