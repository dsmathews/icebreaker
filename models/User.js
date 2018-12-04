const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required"
  },
  email: {
    type: String,
    trim: true,
    required: "Email is Required"
  },
  name: {
    type: String,
    trim: true,
    required: "Name is Required"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;