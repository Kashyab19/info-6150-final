const express = require("express");

const { signup,login,testFUnction,sessionCheck,refreshToken,verifyCode,forgotPassword,passwordReset, updateProfile,getProfile,deleteToken,saveFeedBack } = require("../controller/AuthenticationController");

const router = express.Router();

router.route("/login").post(login);

router.route("/signup").post(signup);

router.route("/refreshToken").get(refreshToken);

router.route("/deleteToken").get(deleteToken);

router.route("/verifyCode").post(verifyCode);

router.route("/forgotPassword").get(forgotPassword);

router.route("/passwordReset").post(passwordReset);

router.post("/updateProfile",sessionCheck,updateProfile);

router.get("/profile",sessionCheck,getProfile);

router.post("/saveFeedback", saveFeedBack)



router.get('/test',sessionCheck,testFUnction);
// router.route("/logout").post(logout);

module.exports = router;
