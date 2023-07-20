const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
    fullname: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
    },
    isProfileInfoSet: {
      type: Boolean,
      required: false,
      default: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
