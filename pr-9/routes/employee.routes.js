const express = require('express');
const uploadImage = require('../middleware/uploadImage');
const { EmployeeToken } = require('../middleware/verifyToken');
const { loginEmployee, updateEmployee, viewEmployeeProfile } = require('../controller/employee.controller');

const routes = express.Router();

routes.post("/login-employee", loginEmployee);
routes.get("/view-employee-profile",EmployeeToken, viewEmployeeProfile);
routes.put("/update-employee-profile/:id",EmployeeToken, uploadImage.single('profileImage'), updateEmployee);

module.exports = routes;