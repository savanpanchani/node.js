const User = require("../models/user.model");
const path = require("path");
const fs = require("fs");


exports.AddUserForm = async (req, res) => {
    try {
       if(req.cookies.admin == undefined|| req.cookies.admin._id == undefined){
          return res.redirect("/")
       }
       else{
        let user =  await User.findById(req.cookies.admin._id )
         return res.render("adduser", {user})
       }
       
    } catch (error) {
       console.log("page not Found");
       res.redirect("/")
    }
 };



exports.AllUser = async (req, res) => {
    try {
       if(req.cookies.admin == undefined|| req.cookies.admin._id == undefined){
          return res.redirect("/")
       }
       else{
        const users = await User.find();
        let user =  await User.findById(req.cookies.admin._id )
         return res.render("users_data", {users, user})
       }
       
    } catch (error) {
       console.log("page not Found");
       res.redirect("/")
    }
 };

exports.AddUser = async (req, res) => {
    try {
        const image = req.file ? '/uploads/' + req.file.filename : "";
        await User.create({ ...req.body, image });
        res.redirect("/users/all-user");
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

exports.EditUserForm = async (req, res) => {
    try {
        const userinfo = await User.findById(req.params.id);
        let user =  await User.findById(req.cookies.admin._id)
        res.render("edituser", { users: userinfo, user });
    } catch (error) {
        console.error("Error loading edit form:", error);
    }
};

exports.EditUser = async (req, res) => {
    try {
        const id = req.params.id;
        let user = await User.findById(id);
        if (!user) {
            return res.redirect("back");
        }

        let imagePath = user.image;
        if (req.file) {
            const oldImagePath = path.join(__dirname, "..", user.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            imagePath = `/uploads/${req.file.filename}`;
        }

        await User.findByIdAndUpdate(id, { ...req.body, image: imagePath }, { new: true });
        res.redirect("/users/all-user");
    } catch (error) {
        console.error("Error editing user:", error);
    }
};

exports.DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await User.findById(id);
        if (record?.image) {
            const imagePath = path.join(__dirname, "..", record.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await User.findByIdAndDelete(id);
        res.redirect("/users/all-user");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
