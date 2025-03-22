import mongoose from "mongoose";
const SignupSchema = new mongoose.Schema(
  {
    firstname: {
      firstname: { type: String, required: true },
      lastname: { type: String },
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "length must be atleast 6 character"],
    },
    confirmPassword: {
      type: String,
      required: [true, "length must be atleast 6 character"],
    },
  },
  { timestamps: true }
);

const signupModel = mongoose.model("Signup", SignupSchema);
Module.exports = signupModel;

// const userSchema = new mongoose.Schema(
//   {
//     fullname: {
//       firstname: { type: String, required: true },
//       lastname: { type: String },
//     },
//     password: {
//       type: String,
//       required: [true, "length must be atleast 6 character"],
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     phoneNo: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["Team Leader", "Member"],
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
