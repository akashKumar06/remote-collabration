import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: { type: String, required: true },
      lastname: { type: String },
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Team Leader", "Member"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
