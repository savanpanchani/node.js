const express = require("express");
const { AddUser, AllUser , AddUserForm , EditUser, EditUserForm, DeleteUser} = require("../controllers/user.controller");
const uploadImg = require("../middleware/multer_user");
const userRrouter = express.Router();

userRrouter.get("/add-user", AddUserForm);
userRrouter.post("/add-user" ,uploadImg.single("image"), AddUser);
userRrouter.get("/all-user", AllUser);
userRrouter.post("/edit-user/:id",uploadImg.single("image"), EditUser)
userRrouter.get("/edit-user/:id", EditUserForm);
userRrouter.get("/delete-user/:id", DeleteUser);


module.exports = userRrouter;
