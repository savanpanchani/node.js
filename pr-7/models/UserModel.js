const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  gender: String,
  hobbies: [String],
  profileImage: String, // must match what you use in controller
});

const User = mongoose.model("User", userSchema);
module.exports = User;
