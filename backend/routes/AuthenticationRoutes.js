const express = require("express");

const { signup,login,testFUnction,sessionCheck,refreshToken,verifyCode,forgotPassword,passwordReset, updateProfile,getProfile } = require("../controller/AuthenticationController");

const router = express.Router();

router.route("/login").post(login);

router.route("/signup").post(signup);

router.route("/refreshToken").post(refreshToken);

router.route("/verifyCode").post(verifyCode);

router.route("/forgotPassword").get(forgotPassword);

router.route("/passwordReset").post(passwordReset);

router.post("/updateProfile",updateProfile);

router.get("/profile",getProfile);



router.get('/test',sessionCheck,testFUnction);
// router.route("/logout").post(logout);

module.exports = router;
