//const e = require("express");
const CourseModelSchema = require("../models/CourseSchema");
const SelectedCourseModelSchema = require("../models/selectedCourseSchema");
 
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

exports.selectedCourses = async(courseDet) => {
  console.log("Data saved for selected courses");
  return await SelectedCourseModelSchema.create(courseDet);
}

exports.getSelectedCourses = async() => {
  console.log("Inside get Selected Courses");
  return await SelectedCourseModelSchema.find();
}

exports.deleteAllSavedCourses = async() => {
  return await SelectedCourseModelSchema.deleteMany();
}

exports.deleteAcourse = async (courseID) => {
  return await SelectedCourseModelSchema.findOneAndDelete({CourseID:courseID});
};