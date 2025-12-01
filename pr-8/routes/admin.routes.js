const express = require('express');
const { 
  addAdminPage, 
  viewAdminPage, 
  addAdmin, 
  deleteAdmin, 
  editAdmin, 
  updateAdmin 
} = require('../controllers/admin.controller');

const uploadImage = require('../middleware/uploadImage');
const passport = require('passport');

const routes = express.Router();

function setAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

// ================== Admin Routes ==================

// Pages
routes.get("/add-admin", setAuthenticated, addAdminPage);
routes.get("/view-admin", setAuthenticated, viewAdminPage);
routes.get("/edit-admin/:id", setAuthenticated, editAdmin);
routes.get("/delete-admin/:id", setAuthenticated, deleteAdmin);

// Form submissions
routes.post("/add-admin", uploadImage.single('profileImage'), addAdmin);
routes.post("/update-admin/:id", uploadImage.single('profileImage'), updateAdmin);

module.exports = routes;
