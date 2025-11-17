const express = require('express');
const { dashboardpage, loginPage, loginUser, logoutUser, changePasswordPage, changePassword, forgotPasswordPage, sendOTP, verfiyOTPPage, updatePasswordPage, verifyOTP, updatePassword, viewProfile } = require('../controllers/index.controller');
const passport = require('passport');

const routes = express.Router();

routes.get("/", loginPage);
routes.get("/dashboard", dashboardpage);
routes.post("/login", passport.authenticate('local', {failureRedirect:'/'}),loginUser);
routes.get("/logout", logoutUser);
routes.get("/change-password", changePasswordPage);
routes.post("/change-password", changePassword);
routes.get("/profile",viewProfile);


// Forgot Password
routes.get("/forgotPassword", forgotPasswordPage);
routes.post("/send-otp", sendOTP);
routes.get("/verify-otp", verfiyOTPPage);
routes.post("/verify-otp", verifyOTP);
routes.get("/update-password", updatePasswordPage);
routes.post("/update-password", updatePassword);

routes.use("/admin", require('./admin.routes'));
routes.use("/blog", require('./blog.routes')); 


module.exports = routes;