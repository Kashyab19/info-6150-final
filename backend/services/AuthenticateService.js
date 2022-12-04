const UserModelSchema = require("../models/UserDataSchema");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const UserDataSchema = require("../models/UserDataSchema");
const jwt = require('jsonwebtoken');
const redis = require('redis');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const client = redis.createClient()
client.connect();
const DEFAULT_EXPIRATION = 7200;

exports.signUp = async (user) => {
  let UUID = nanoid();
  user.UUID = UUID;
  let newUser = new UserModelSchema({ ...user });
  try {
    user = await (await newUser.save()).toObject();
    await this.sendVerificationEmail(user.email, user.firstName);
  }
  catch(err){
    console.log(err);
    return Promise.reject("SINGUP_FAILED_DUE_TO_SYSTEM_ERROR");
  }
  return user;
};

exports.login = async (user) => {
  try {
    let userExisting = await UserDataSchema.where("email")
      .equals(user.email)
      .findOne();
    if (userExisting === null) {
      return Promise.reject("EMAIL_ID_NOT_FOUND");
    } else {
      const result = await bcrypt.compare(user.password, userExisting.password);
      if (result && userExisting.isEnabled) {
        const accessToken = generateJWTToken(userExisting.email);
        const refreshToken = generateRefreshToken(userExisting.email);
        client.setEx(userExisting.email,DEFAULT_EXPIRATION, refreshToken);
        return {accessToken, refreshToken, date: AddMinutesToDate(new Date(), 5)};
      } else if(result){
        this.sendVerificationEmail(user.email,userExisting.firstName)
        return Promise.reject("PLEASE_VERIFY_EMAIL_TO_PROCEED");
      }else {
        return Promise.reject("PASSWORD_INCORRECT");
      }
    }
  } catch (err) {
    console.log(err);
    return Promise.reject("ERROR_FETCHING_DATA");
  }
};

const generateJWTToken = (email) => {
  const accessToken = jwt.sign({email},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '300s'});
  return accessToken;
}

const generateRefreshToken = (email) => {
  const accessToken = jwt.sign({email},process.env.REFRESH_TOKEN_SECRET);
  return accessToken;
}


exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token  = authHeader && authHeader.split(' ');
  if(token == null || token.length !=2 ){
    res.json({status: "FAILURE" ,message : "TOKEN_NOT_FOUND" });
    return res.sendStatus(401);
  } 
  try{
    const res = await jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET);
    req.email = res;
    return next();
  }catch(err){
    console.log(err);
    res.status(401).json({status: "FAILURE" ,message : "NOT_AUTORIZED" });
    return res.send();
  }  
}

exports.testFunction =  (req, res) => {
  res.status(200)
  res.json({status: "SUCCESS" ,message : "AUTHORIZED" });
  return res.send()
}

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

exports.refreshToken = async (req,res) => {
  const body = req.body;
  if(body.refreshToken === undefined){
    res.status(401).json({status: "FAILURE" ,message : "LOGIN_EXPIRED_PLEASE_LOGIN_AGAIN" });
    return res.send();
  }
  try{
    const tokenRes = await jwt.verify(body.refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const token = await client.get(tokenRes.email);
    if(token === body.refreshToken){
      const accessToken = generateJWTToken(tokenRes.email);
      const refreshToken = generateRefreshToken(tokenRes.email);
      client.setEx(tokenRes.email,DEFAULT_EXPIRATION, refreshToken);
      res.status(200).json({accessToken, refreshToken, date: AddMinutesToDate(new Date(), 5)});
      return res.send();
    }else{
      res.status(401).json({status: "FAILURE" ,message : "LOGIN_EXPIRED_PLEASE_LOGIN_AGAIN" });
      return res.send();
    }
  }catch(err){
    console.log(err)
    res.status(401).json({status: "FAILURE" ,message : "LOGIN_EXPIRED_PLEASE_LOGIN_AGAIN" });
    return res.send();
  }
}

exports.sendVerificationEmail = (email,name) => {
  let code = Math.floor(100000 + Math.random() * 900000);;

  const msg = {
    to: email, // Change to your recipient
    from: 'nksr.1996@gmail.com', // Change to your verified sender
    templateId : "d-2ad4a1839d684bc58b362136d12047e2",
    dynamicTemplateData : {
      name, code
    }
  }
  console.log(msg);
  sgMail
    .send(msg)
    .then(() => {
      client.setEx(email+"v",300, "" + code);
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

exports.sendPasswordResetEmail = (email) => {
  let code = Math.floor(100000 + Math.random() * 900000);;
  const msg = {
    to: email, // Change to your recipient
    from: 'nksr.1996@gmail.com', // Change to your verified sender
    templateId : "d-3012dd2ec0b24815ad406f724401cff5",
    dynamicTemplateData : {
       code
    }
  }
  try{
    const mail  = sgMail.send(msg);
    client.setEx(email+"v",300, "" + code);
    return "SUCCESS";    
  }
  catch(err){
    console.error(err);
    return "FAILURE";    
  }
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     client.setEx(email+"v",300, "" + code);
  //     return "SUCCESS";
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.status(500).json({status: "FAILURE", message : "INTERNAL_SERVER_ERROR"});
  //     return res.send();      
  //   })
}

exports.verifyCode = async ({email,codeS},res) => {
  try {
    let userExisting = await UserDataSchema.where("email")
      .equals(email)
      .findOne();
    if (userExisting === null) {
      res.status(200).json({status: "FAILURE" ,message : "EMAIL_ID_NOT_FOUND" });
      return res.send();
    } else {
      const code = await client.get(email + "v");
      if(code === null || code === undefined){
        this.sendVerificationEmail(email,userExisting.firstName);
        res.status(200).json({status: "FAILURE" ,message : "VERIFICATION_CODE_EXPIRED_SENDING_NEW_ONE"});
        return res.send();
      }else if(code == codeS){
        const accessToken = generateJWTToken(userExisting.email);
        const refreshToken = generateRefreshToken(userExisting.email);
        client.setEx(userExisting.email,DEFAULT_EXPIRATION, refreshToken);
        await UserDataSchema.updateOne({email},{ $set : {isEnabled : true} })
        res.status(200).json({status: "SUCCESS", data: {accessToken, refreshToken, date: AddMinutesToDate(new Date(), 5)}});
        return res.send();
      }else{
        res.status(200).json({status: "FAILURE", message: "INVALID_ACCESS_TOKEN_TRY_AGAIN"});
        return res.send();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({status: "FAILURE", message: "INTERNAL_SERVER_ERROR"});
    return res.send();
  }
}


exports.forgotPassword =  async (email,res) => {
  const passRes =  this.sendPasswordResetEmail(email);
  console.log(passRes);
  if(passRes === "SUCCESS"){
    res.status(200).json({status: "SUCCESS"});
    return res.send();
  }else{
    res.status(500).json({status: "FAILURE", message : "INTERNAL_SERVER_ERROR"});
    return res.send();
  }
}

exports.passwordReset =  async ({email, code, newPassword},res) => {
  try{
    const codeS = await client.get(email + "v");
    if(codeS === null || codeS === undefined){
      this.sendPasswordResetEmail(email);
      res.status(200).json({status: "FAILURE" ,message : "VERIFICATION_CODE_EXPIRED_SENDING_NEW_ONE"});
      return res.send();
    }else if(code == codeS){
      client.del(email+"v");
      client.del(email);
      const hashPass = await bcrypt.hash(newPassword,10);
      await UserDataSchema.updateOne({email},{ $set : {password : hashPass} })
      res.status(200).json({status: "SUCCESS", message : "PASSWORD_RESET_SUCCESSFUL_LOGIN_TO_CONTINUE"});
      return res.send();
    }else{
      res.status(200).json({status: "FAILURE", message: "INVALID_ACCESS_TOKEN_TRY_AGAIN"});
      return res.send();
    }
  }catch(err){
    console.log(err);
    res.status(500).json({status: "FAILURE", message: "INTERNAL_SERVER_ERROR"});
    return res.send();
  }
}



