const express = require('express');
const routes = express.Router();
const uploadImage = require('../middleware/uploadImage');

const { registerAdmin, loginAdmin } = require('../controller/admin.controller');

// Public Routes
routes.post("/register-admin", uploadImage.single('profileImage'), registerAdmin);
routes.post("/login-admin", loginAdmin);


// Admin Routes
routes.use("/admins",  require("./admin.routes"));

// Manager Routes
routes.use("/managers",  require("./manager.routes"));

// Manager Routes
routes.use("/employees",  require("./employee.routes"));

module.exports = routes;