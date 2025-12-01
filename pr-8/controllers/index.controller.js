const AdminModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { sendEmail } = require("../middleware/sendEmail");


exports.loginPage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect("/dashboard");
        } else {
            return res.render('login');
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};

exports.loginUser = async (req, res) => {
    try {
        req.flash('success', 'Login Success');
        res.cookie("admin", req.user);
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong');
        return res.redirect("/");
    }
};

exports.logoutUser = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) console.log(err);
            else res.redirect("/");
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};

exports.dashboardpage = async (req, res) => {
    try {
        return res.render('dashboard');
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};


exports.changePasswordPage = async (req, res) => {
    try {
        if (req.cookies && req.cookies.admin && req.cookies.admin._id != undefined) {
            return res.render("changePassword", { admin: req.cookies.admin });
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/dashboard");
    }
};

exports.changePassword = async (req, res) => {
    try {
        if (req.cookies && req.cookies.admin && req.cookies.admin._id != undefined) {
            let admin = await AdminModel.findById(req.cookies.admin._id);
            if (!admin) {
                console.log("Admin not found");
                return res.redirect("/");
            }

            let isMatch = await bcrypt.compare(req.body.oldpassword, admin.password);
            if (!isMatch) {
                req.flash('error', 'Old password is incorrect');
                return res.redirect("/changePassword");
            }

            if (req.body.newpassword !== req.body.cpassword) {
                req.flash('error', 'Passwords do not match');
                return res.redirect("/changePassword");
            }

            let hashPassword = await bcrypt.hash(req.body.newpassword, 10);
            await AdminModel.findByIdAndUpdate(admin._id, { password: hashPassword });

            req.flash('success', 'Password changed successfully');
            return res.redirect("/dashboard");
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};


exports.forgotPasswordPage = async (req, res) => {
    try {
        return res.render('auth/forgotPassword');
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};

exports.sendOTP = async (req, res) => {
    try {
        let admin = await AdminModel.findOne({ email: req.body.email });
        if (!admin) {
            console.log('Admin not found');
            return res.redirect("/");
        }

        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        let message = {
            from: 'pruthvirajsolanki125@gmail.com',
            to: `${req.body.email}`,
            subject: "Forgot Password OTP",
            html: `
                <h2>Hello User,</h2>
                <p>Your OTP is: <b>${otp}</b> (valid for 5 minutes).</p>
            `
        };

        sendEmail(message);
        res.cookie('otp', otp);
        res.cookie('email', req.body.email);
        return res.redirect("/verify-otp");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};

exports.verifyOTPPage = async (req, res) => {
    try {
        return res.render('auth/verifyOTP');
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        let otp = req.cookies.otp;
        if (otp == req.body.otp) {
            res.clearCookie('otp');
            return res.redirect("/update-password");
        } else {
            console.log("OTP mismatch");
            req.flash('error', 'Invalid OTP');
            return res.redirect("/verify-otp");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};

exports.updatePasswordPage = async (req, res) => {
    try {
        return res.render('auth/updatePassword');
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};

exports.updatePassword = async (req, res) => {
    try {
        let email = req.cookies.email;
        let admin = await AdminModel.findOne({ email });
        if (!admin) {
            console.log('Admin not found');
            return res.redirect("/");
        }

        if (req.body.password === req.body.cpassword) {
            let hashPassword = await bcrypt.hash(req.body.password, 10);
            await AdminModel.findByIdAndUpdate(admin._id, { password: hashPassword });
            res.clearCookie("email");
            req.flash('success', 'Password updated successfully');
            return res.redirect("/dashboard");
        } else {
            console.log("Passwords do not match");
            req.flash('error', 'Passwords do not match');
            return res.redirect("/update-password");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
};

exports.profilePage = async (req, res) => {
    try {
        const adminData = req.cookies.admin;

        if (!adminData || !adminData._id) {
            return res.redirect('/');
        }
        const user = await AdminModel.findById(adminData._id);

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/dashboard');
        }

        const imagePath = user.profileImage
            ? `/uploads/${user.profileImage}`
            : '/assets/images/users/1.jpg';

        return res.render('profile', { user, imagePath });
    } catch (error) {
        console.log('Profile Error:', error);
        return res.redirect('/dashboard');
    }
};
