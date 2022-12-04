const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userDataSchema = new Schema({
  UUID: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regex = /^[A-Za-z]{1,}$/;
        return v.match(regex);
      },
      message: (props) => `${props.value} is not a valid first_name`,
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regex = /^[A-Za-z]{1,}$/;
        return v.match(regex);
      },
      message: (props) => `${props.value} is not a valid last_name`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return v.match(regex);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  nuId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["S", "P", "A"],
    required: true,
  },
  profilePic: String,
  isEnabled: {
    type : Boolean,
    default : false
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const re = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        return v.match(re);
      },
      message: (props) =>
        `Password is not valid, your password must have a number, special character and upper case alphabet`,
    },
  },
  failedAtempts: {
    type : Number,
    default : 0
  },
  passwordResetDate: {
    type : Date,
    default : Date.now
  },
  studentDetails: {
    college: {
      type: String,
      enum: ["COE", "CPS", "KCS"],
    },
    degree: {
      type: String,
      enum: ["UG", "GR", "PHD"],
    },
    major: {
      type: String,
      enum: ["MIS", "CS", "MEM", "SES", "DA", "DS", "AN"],
    },
  },
});

userDataSchema.pre("save", async function (next) {
  try {
    if (
      this.role === "S" &&
      (this.studentDetails.college === undefined || this.studentDetails.major === undefined || this.studentDetails.degree === undefined)
    ) {
      throw new Error("STUDENT_DETAILS_REQUIRED_FOR_STUDENTS");
    }
    const hashPass = await bcrypt.hash(this.password,10);
    this.password = hashPass;
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model("USER_DATA", userDataSchema);
