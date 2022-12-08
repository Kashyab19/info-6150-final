const express = require("express");

const {
  addCourse,
  deleteAllCourses,
  editUser,
  getAllCourses,
  selectedCourses,
  getSelectedCourses,
  deleteAllSavedCourses,
  deleteAcourse,
} = require("../controller/CourseController");
 
const router = express.Router();
 
router.route("/add-course").post(addCourse);
// router.route("/selected-course").post(createUser);
router.route("/delete-all").delete(deleteAllCourses);
router.route("/edit").put(editUser);
router.route("/get-all-courses").get(getAllCourses);
router.route("/selected-courses").post(selectedCourses);
router.route("/saved-courses").get(getSelectedCourses);
router.route("/deleted-all-saved").delete(deleteAllSavedCourses);
router.route("/delete-selection").delete(deleteAcourse);
 
module.exports = router;