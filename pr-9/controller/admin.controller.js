const AdminModel = require('../model/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.find({isDeleted:false});
        return res.json({ message: "Admins fetched successfully", status: "200", result: admins });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}

exports.registerAdmin = async (req, res) => {
    try {
        let admin = await AdminModel.findOne({ email: req.body.email , isDeleted:false })
        if (admin) {
            return res.json({ message: "Admin Already Registered" });
        }
        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        admin = await AdminModel.create({
            ...req.body,
            password: hashPassword,
            profileImage: imagepath
        });
        return res.json({ message: "Admin Register Success" });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}



exports.loginAdmin = async (req, res) => {
    try {
        let admin = await AdminModel.findOne({ email: req.body.email , isDeleted:false });
        console.log(req.body.email)
        if (!admin || admin.isDeleted) {
            return res.json({ message: 'admin not found' });
        }
        let matchpassword = await bcrypt.compare(req.body.password, admin.password);
        console.log(req.body.password, admin.password);
        if (!matchpassword) {
            return res.json({ message: 'Invalid Credentials' });
        }
        let token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY_ADMIN)
        return res.json({ message: 'Login Success', token });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}

exports.viewAdminProfile = async (req, res) => {
    try {
        let admin = req.admin;
        return res.json({ message: "Admin Profile Fetched", result: admin });

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};


exports.updateAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        let updateData = req.body;

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateData.password = hashedPassword;
        }

        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`;
        }

        let admin = await AdminModel.findById(adminId);
        if (!admin || admin.isDeleted) {
            return res.json({ message: "Admin not found", status: 404 });
        }

        admin = await AdminModel.findByIdAndUpdate(
            adminId,
            updateData,
            { new: true }
        );

        return res.json({
            message: "Admin profile updated successfully",
            result: admin
        });

    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error", status: 500 });
    }
};


exports.deleteAdmin = async (req, res) => {
    try {
        let admin = await AdminModel.findById(req.params.id);
        if (!admin || admin.isDeleted) {
            return res.json({ message: 'Admin not Found' });
        }

        if (admin.isDeleted === true) {
            return res.status(400).json({ message: "User is already deleted" });
        }

        admin.isDeleted = true;
        await admin.save();

        return res.json({ message: "Admin Delete Success", result: admin });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}