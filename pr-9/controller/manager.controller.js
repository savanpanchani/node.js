const ManagerModel = require('../model/manager.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require("../middleware/sendEmail");

exports.getAllManagers = async (req, res) => {
    try {
        const managers = await ManagerModel.find({isDeleted:false});
        return res.json({ message: "Managers fetched successfully", status: 200, result: managers });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};


exports.registerManager = async (req, res) => {
    try {
        let manager = await ManagerModel.findOne({ email: req.body.email, isDeleted:false });

        if (manager) {
            return res.json({ message: "Manager Already Registered" });
        }

        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10);

        manager = await ManagerModel.create({
            ...req.body,
            password: hashPassword,
            profileImage: imagepath
        });

        await sendEmail({
            from: process.env.EMAIL_USER_ADMIN,
            to: manager.email,
            subject: "Manager Registration Successful",
            text: `Dear ${manager.name},

                Your manager account has been successfully created.

                Login Email: ${manager.email}
                Password: ${req.body.password}

                Please keep your login credentials safe.

                Regards,
                Admin Team`
        });

        return res.json({ message: "Manager Register Success" });

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};


exports.loginManager = async (req, res) => {
    try {
        let manager = await ManagerModel.findOne({ email: req.body.email, isDeleted:false });
        if (!manager || manager.isDeleted) {
            return res.json({ message: 'Manager not found' });
        }

        let matchpassword = await bcrypt.compare(req.body.password, manager.password);
        if (!matchpassword) {
            return res.json({ message: 'Invalid Credentials' });
        }

        let token = jwt.sign({ id: manager._id }, process.env.SECRET_KEY_MANAGER);
        return res.json({ message: 'Login Success', token });

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};


exports.updateManager = async (req, res) => {
    try {
        let manager = await ManagerModel.findById(req.params.id);
        if (!manager || manager.isDeleted) {
            return res.json({ message: 'Manager not Found' });
        }
        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        } else {
            imagepath = manager.profileImage
        }
        manager = await ManagerModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
            profileImage: imagepath
        }, { new: true });
        return res.json({ message: "Manager Updated", result: manager });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}



exports.deleteManager = async (req, res) => {
    try {
        let manager = await ManagerModel.findById(req.params.id);
        if (!manager || manager.isDeleted) {
            return res.json({ message: 'Manager not Found' });
        }

        if (manager.isDeleted === true) {
            return res.status(400).json({ message: "User is already deleted" });
        }

        manager.isDeleted = true;
        await manager.save();

        return res.json({ message: "Manager Delete Success", result: manager });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};

exports.viewManagerProfile = async (req, res) => {
    try {
        let manager = req.manager;  
        return res.json({ message: "Manager Profile Fetched", result: manager });

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};

