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

exports.editUser = async (courseID, body) => {
  return await CourseModelSchema.findOneAndUpdate({courseID: courseID}, body);
}

exports.getAllCourses = async() => {
  console.log("Inside get");
  return await CourseModelSchema.find();
}

exports.saveSelectedCourses = async(courseDet) => {
  console.log("Data saved");
  return await CourseModelSchema.create(courseDet);
}