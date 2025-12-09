const express = require('express');
const uploadImage = require('../middleware/uploadImage');
const { ManagerToken } = require('../middleware/verifyToken');
const { loginManager, viewManagerProfile, updateManager } = require('../controller/manager.controller');
const {registerEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require('../controller/employee.controller');

const routes = express.Router();

routes.post("/login-manager", loginManager);
routes.get("/view-manager-profile",ManagerToken, viewManagerProfile);
routes.put("/update-manager-profile/:id",ManagerToken,uploadImage.single('profileImage'), updateManager);


// Employee Routes

routes.post("/register-employee", uploadImage.single('profileImage'), registerEmployee);
routes.get("/view-employee",ManagerToken, getAllEmployees)
routes.put("/update-employee/:id", ManagerToken, uploadImage.single('profileImage'), updateEmployee);
routes.delete("/delete-employee/:id", ManagerToken, deleteEmployee)

module.exports = routes;