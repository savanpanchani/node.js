const EmployeeModel = require('../model/employee.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require("../middleware/sendEmail");


exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await EmployeeModel.find({ isDeleted:false });
        return res.json({ message: "Employees fetched successfully", status: "200", result: employees });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}

exports.registerEmployee = async (req, res) => {
    try {
        let employee = await EmployeeModel.findOne({ email: req.body.email , isDeleted:false });

        if (employee) {
            return res.json({ message: "Employee Already Registered" });
        }

        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10);

        employee = await EmployeeModel.create({
            ...req.body,
            password: hashPassword,
            profileImage: imagepath
        });

        await sendEmail({
            from: process.env.EMAIL_USER_ADMIN,
            to: employee.email,
            subject: "Employee Registration Successful",
            text: `Dear ${employee.name},

                Your employee account has been successfully created.

                Login Email: ${employee.email}
                Password: ${req.body.password}

                Please keep your login credentials safe.

                Regards,
                Admin Team`
        });

        return res.json({ message: "Employee Register Success" });

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};

exports.loginEmployee = async (req, res) => {
    try {
        let employee = await EmployeeModel.findOne({ email: req.body.email, isDeleted:false });
        if (!employee || employee.isDeleted) {
            return res.json({ message: 'Employee not found' });
        }

        let matchpassword = await bcrypt.compare(req.body.password, employee.password);
        if (!matchpassword) {
            return res.json({ message: 'Invalid Credentials' });
        }

        let token = jwt.sign({ id: employee._id }, process.env.SECRET_KEY_EMPLOYEE);
        return res.json({ message: 'Login Success', token });

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};


exports.updateEmployee = async (req, res) => {
    try {
        let employee = await EmployeeModel.findById(req.params.id);
        if (!employee || employee.isDeleted) {
            return res.json({ message: 'Employee not Found' });
        }
        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        } else {
            imagepath = employee.profileImage
        }
        employee = await EmployeeModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
            profileImage: imagepath
        }, { new: true });
        return res.json({ message: "Employee Updated", result: employee });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}


exports.deleteEmployee = async (req, res) => {
    try {
        let employee = await EmployeeModel.findById(req.params.id);
        if (!employee || employee.isDeleted) {
            return res.json({ message: 'Employee not Found' });
        }

        if (employee.isDeleted === true) {
            return res.status(400).json({ message: "User is already deleted" });
        }

        employee.isDeleted = true;
        await employee.save();

        return res.json({ message: "Employee Delete Success", result: employee });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};

exports.viewEmployeeProfile = async (req, res) => {
    try {
        let employee = req.employee;
        return res.json({ message: "Employee Profile Fetched", result: employee });

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};



exports.updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        let updateData = req.body;

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateData.password = hashedPassword;
        }

        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`;
        }

        let employee = await EmployeeModel.findById(employeeId);
        if (!employee || employee.isDeleted) {
            return res.json({ message: "Employee not found", status: 404 });
        }

        employee = await EmployeeModel.findByIdAndUpdate(
            employeeId,
            updateData,
            { new: true }
        );

        return res.json({
            message: "Employee profile updated successfully",
            result: employee
        });

    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error", status: 500 });
    }
};
