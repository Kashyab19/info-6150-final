const authenicateService = require("../services/AuthenticateService");

exports.login = async (req, res) => {
  authenicateService
    .login(req.body)
    .then((data) => {
      res.status(200);
      res.json({
        status: "SUCCESS",
        message: "LOGGED_IN_SUCCESSFULLY",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({ status: "FAILURE", message: err });
    });
};

exports.signup = async (req, res) => {
  authenicateService
    .signUp(req.body)
    .then((data) => {
      res.status(200);
      console.log(data);
      res.json({
        status: "SUCCESS",
        message: "ACCOUNT_CREATED_SUCCESSFULLY",
        data:  {
            ...data,
            verificationCode: false,
            passwordResetDate: null,
            isEnabled: null,
            password: null,
          },
      });
      return res.send();
    })
    .catch((err) => {
      res.json({ status: "FAILURE", message: err });
      return res.send();
    });
};

exports.testFUnction = (req, res) => {
  return authenicateService.testFunction(req, res);
};

exports.sessionCheck = (req, res, next) => {
  return authenicateService.authenticateToken(req, res, next);
};

exports.refreshToken = (req, res) => {
  return authenicateService.refreshToken(req, res);
};

exports.verifyCode = (req, res) => {
  return authenicateService.verifyCode({email : req.body.email, codeS: req.body.code}, res);
};

exports.forgotPassword = (req, res) => {
  return authenicateService.forgotPassword(req.query.email, res);
};

exports.passwordReset = (req, res) => {
  return authenicateService.passwordReset({...req.body}, res);
};

