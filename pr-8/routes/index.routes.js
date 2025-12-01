const express = require('express');
const passport = require('passport');

const {
  dashboardpage,
  loginPage,
  loginUser,
  logoutUser,
  changePasswordPage,
  changePassword,
  profilePage,
  forgotPasswordPage,
  sendOTP,
  verifyOTPPage,
  updatePasswordPage,
  verifyOTP,
  updatePassword
} = require('../controllers/index.controller');

const routes = express.Router();

function setAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

// ================= ROUTES =================

// Login
routes.get('/', loginPage);
routes.post('/login', passport.authenticate('local', { failureRedirect: '/' }), loginUser);

// Dashboard
routes.get('/dashboard', setAuthenticated, dashboardpage);

// Logout
routes.get('/logout', logoutUser);

// Change Password
routes.get('/changePassword', setAuthenticated, changePasswordPage);
routes.post('/changePassword', setAuthenticated, changePassword);
routes.get("/profile",setAuthenticated,  profilePage);

// Forgot Password Flow
routes.get('/forgotPassword', forgotPasswordPage);
routes.post('/send-otp', sendOTP);
routes.get('/verify-otp', verifyOTPPage);
routes.post('/verify-otp', verifyOTP);
routes.get('/update-password', updatePasswordPage);
routes.post('/update-password', updatePassword);

// Other routes
routes.use('/admin', require('./admin.routes'));
// routes.use('/blog', require('./blog.routes'));
routes.use("/category",  require('./category.routes'));
routes.use("/subcategory", require('./subcategory.routes'));
routes.use("/extracategory", require("./extraCategory.routes"));
routes.use("/product", require('./product.routes'))

module.exports = routes;
