const express = require('express');
const { addAdminPage, viewAdminPage, addAdmin, deleteAdmin, editAdmin, updateAdmin } = require('../controllers/admin.controller');
const uploadImage = require('../middleware/uploadImage');

const routes = express.Router();


routes.get("/add-admin", addAdminPage);
routes.get("/view-admin", viewAdminPage);
routes.get("/edit-admin/:id", editAdmin);
routes.get("/delete-admin/:id", deleteAdmin);
routes.post("/add-admin", uploadImage.single('profileImage'), addAdmin);
routes.post("/update-admin/:id", uploadImage.single('profileImage'), updateAdmin);

module.exports = routes;
