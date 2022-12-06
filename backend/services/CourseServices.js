//const e = require("express");
const CourseModelSchema = require("../models/CourseSchema");
 
exports.addCourse = async (creds) => {
  console.log("Added courses");
  return await CourseModelSchema.create(creds);
};

exports.deleteAllCourses = async() => {
  console.log("Deleted All records");
  return await CourseModelSchema.deleteMany();
}

exports.getAllCourses = async() => {
  console.log("Inside get");
  return await CourseModelSchema.find();
}