const express = require('express');
const uploadImage = require('../middleware/uploadImage');
const { AdminToken } = require('../middleware/verifyToken');
const { getAllAdmins, updateAdmin , deleteAdmin, viewAdminProfile} = require('../controller/admin.controller');
const { registerManager, getAllManagers, updateManager, deleteManager } = require('../controller/manager.controller');
const { getAllEmployees, updateEmployee, deleteEmployee } = require('../controller/employee.controller');


const routes = express.Router();

routes.get("/",AdminToken, getAllAdmins) 
routes.get("/view-admin-profile",AdminToken, viewAdminProfile);
routes.put("/:id", AdminToken, uploadImage.single('profileImage'), updateAdmin);
routes.delete("/:id", AdminToken, deleteAdmin)

// Manager Routes
routes.post("/register-manager", uploadImage.single('profileImage'), registerManager);
routes.get("/view-manager",AdminToken, getAllManagers)
routes.put("/update-manager/:id", AdminToken, uploadImage.single('profileImage'), updateManager);
routes.delete("/delete-manager/:id", AdminToken, deleteManager)

// Employee Routes
routes.get("/view-employee",AdminToken, getAllEmployees)
routes.put("/update-employee/:id", AdminToken, uploadImage.single('profileImage'), updateEmployee);
routes.delete("/delete-employee/:id", AdminToken, deleteEmployee)


module.exports = routes;