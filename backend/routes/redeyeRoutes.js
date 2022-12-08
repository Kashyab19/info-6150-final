const express = require("express");

const {
  addTrip,
  deleteTrip,
  getAllTrips,
} = require("../controller/RedEyeController");
 
const router = express.Router();
 
router.route("/addTrip").post(addTrip);
router.route("/deleteTrip").post(deleteTrip);
router.route("/getAllTrips").post(getAllTrips);
 
module.exports = router;