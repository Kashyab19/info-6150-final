const express = require("express");

const {
  addCourse,
  deleteAllCourses,
  getAllCourses,
} = require("../controller/CourseController");
 
const router = express.Router();
 
router.route("/add-course").post(addCourse);
// router.route("/selected-course").post(createUser);
router.route("/delete-all").delete(deleteAllCourses);
router.route("/get-all-courses").get(getAllCourses);
 
module.exports = router;