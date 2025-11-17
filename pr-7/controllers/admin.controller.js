const AdminModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");


exports.addAdminPage = async (req, res) => {
  try {
    return res.render("admin/addAdmin");
  } catch (error) {
    console.log(error);
    return res.redirect("/dashboard");
  }
};


exports.viewAdminPage = async (req, res) => {
  try {
    let admins = await AdminModel.find();
    return res.render("admin/viewAdmin", { admins });
  } catch (error) {
    console.log(error);
    return res.redirect("/dashboard");
  }
};


exports.addAdmin = async (req, res) => {
  try {
    let imagepath = "";
    if (req.file) {
      imagepath = `/uploads/${req.file.filename}`;
    }
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let admin = await AdminModel.create({
      ...req.body,
      password: hashPassword,
      profileImage: imagepath,
    });
    if (admin) {
      console.log("Admin added");
      req.flash('success', 'Admin Added Success!!!');
      return res.redirect("/admin/add-admin");
    } else {
      console.log("Admin not added");
      req.flash('error', 'Admin not Added!!!');
      return res.redirect("/admin/add-admin");
    }
  } catch (error) {
    console.log(error);
     req.flash('error', 'Something Error');
    return res.redirect("/dashboard");
  }
};

exports.editAdmin = async (req, res) => {
  try {
    let admin = await AdminModel.findById(req.params.id);
    return res.render("admin/editAdmin", { admin });
  } catch (error) {
    console.log(error);
    return res.redirect("/dashboard");
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (!admin) return res.redirect("/admin/view-admin");

    admin.firstname = req.body.firstname;
    admin.lastname = req.body.lastname;
    admin.email = req.body.email;
    admin.gender = req.body.gender;
    admin.hobbies = Array.isArray(req.body.hobbies) ? req.body.hobbies : [req.body.hobbies];

    if (req.body.password) {
      admin.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file) {
      if (admin.profileImage) {
        const oldImage = path.join(__dirname, "..", admin.profileImage);
        if (fs.existsSync(oldImage)) fs.unlinkSync(oldImage);
      }
      admin.profileImage = `/uploads/${req.file.filename}`;
    }

    await admin.save();
    console.log("Admin updated successfully");
    return res.redirect("/admin/view-admin");
  } catch (error) {
    console.log(error);
    return res.redirect("/dashboard");
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    let admin = await AdminModel.findById(req.params.id);
    if (!admin) {
      console.log("Admin not Found");
      return res.redirect("/admin/view-admin");
    }

    if (admin.profileImage != "") {
      let imagepath = path.join(__dirname, "..", admin.profileImage);
      try {
        await fs.unlinkSync(imagepath);
      } catch (error) {
        console.log("File Missing");
      }
    }
    await AdminModel.findByIdAndDelete(req.params.id);
    console.log("Admin Delete Success");
    return res.redirect("/admin/view-admin");
  } catch (error) {
    console.log(error);
    return res.redirect("/dashboard");
  }
};