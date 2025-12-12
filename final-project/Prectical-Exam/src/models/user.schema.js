const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  contactNo: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
 role: {
  type: String,
  enum: ["Admin", "User"],
  default: "User"
},
  isDeleted: {
    type: Boolean,
    default: false
  }
});


let userModel = mongoose.model('User', userSchema);

module.exports = userModel;