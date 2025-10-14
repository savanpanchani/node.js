const Blog = require("../models/blog.model");
const User = require("../models/user.model");

exports.dashboard = async (req, res) => {
  try {
    if (!req.cookies.admin || !req.cookies.admin._id) {
      return res.redirect("/");
    }
    let user = await User.findById(req.cookies.admin._id);
    return res.render("dashboard", { user });
  } catch (error) {
    console.log("page not Found");
    res.redirect("/");
  }
};

exports.loginpage = (req, res) => {
  res.render("Auth/login_page");
};

exports.loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && user.password === req.body.password) {
    res.cookie("admin", user);
    return res.redirect("/dashboard");
  } else {
    return res.redirect("/");
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("admin", { path: "/" });
    return res.redirect("/");
  } catch (error) {
    console.log("something error", error);
    res.redirect("/dashboard");
  }
};

exports.profile = async (req, res) => {
  try {
    let user = await User.findById(req.cookies.admin._id);
    res.render("profile", { user });
  } catch (error) {
    console.log("something error", error);
    res.redirect("/dashboard");
  }
};

exports.passwordChangeForm = async (req, res) => {
  try {
    if (!req.cookies.admin || !req.cookies.admin._id) {
      return res.redirect("/");
    }
    let user = await User.findById(req.cookies.admin._id);
    return res.render("changePassword", { user });
  } catch (error) {
    console.log("page not Found");
    res.redirect("/dashboard");
  }
};

exports.passwordChange = async (req, res) => {
  try {
    const { oldPassword, newPassword, conformPassword } = req.body;
    let user = await User.findById(req.cookies.admin._id);

    if (!user) {
      console.log("User not found");
      return res.redirect("/dashboard");
    }

    if (oldPassword === newPassword) {
      console.log("oldPassword and newPassword cannot be the same");
      return res.redirect("/dashboard");
    }

    if (newPassword === conformPassword) {
      await User.findByIdAndUpdate(user._id, { password: newPassword }, { new: true });
      console.log("Password changed successfully");
      return res.redirect("/dashboard");
    } else {
      console.log("newPassword and confirmPassword Not match");
      return res.redirect("/dashboard");
    }
  } catch (error) {
    console.log("page not Found", error);
    res.redirect("/dashboard");
  }
};