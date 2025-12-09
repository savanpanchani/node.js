const jwt = require('jsonwebtoken');
const AdminModel = require("../model/admin.model");
const ManagerModel = require("../model/manager.model");
const EmployeeModel = require("../model/employee.model");


exports.AdminToken = async (req, res, next) => {
    let authorization = req.headers.authorization;
    if (!authorization) {
        return res.json({ message: "not Authorized" });
    }
    let token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ message: "Token Missing" });
    }

    let { id } = jwt.verify(token, process.env.SECRET_KEY_ADMIN)
    let admin = await AdminModel.findById(id);
    if (!admin) {
        return res.json({ message: "Invalid Token" });
    } else {
        req.admin = admin;
        next();
    }

}   

exports.ManagerToken = async (req, res, next) => {
    let authorization = req.headers.authorization;
    if (!authorization) {
        return res.json({ message: "not Authorized" });
    }
    let token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ message: "Token Missing" });
    }

    let { id } = jwt.verify(token, process.env.SECRET_KEY_MANAGER)
    let manager = await ManagerModel.findById(id);
    if (!manager) {
        return res.json({ message: "Invalid Token" });
    } else {
        req.manager = manager;
        next();
    }

}   

    exports.EmployeeToken = async (req, res, next) => {
        let authorization = req.headers.authorization;
        if (!authorization) {
            return res.json({ message: "not Authorized" });
        }
        let token = authorization.split(" ")[1];
        if (!token) {
            return res.json({ message: "Token Missing" });
        }

        let { id } = jwt.verify(token, process.env.SECRET_KEY_EMPLOYEE)
        let employee = await EmployeeModel.findById(id);
        if (!employee) {
            return res.json({ message: "Invalid Token" });
        } else {
            req.employee = employee;
            next();
        }

    }   