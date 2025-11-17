const AdminModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { sendEmail } = require("../middleware/sendEmail");

exports.loginPage = async (req, res) => {
    try {
        if(req.isAuthenticated()){
            return res.redirect("/dashboard");
        }else
            return res.render('login');
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}


exports.logoutUser = async (req, res) => {
    try {
        req.session.destroy((err, result)=> {
            if(err) console.log(err);
            else res.redirect("/")
        })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.dashboardpage = async (req, res) => {
    try {
        return res.render('dashboard');
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}


exports.loginUser = async (req, res) => {
    try {
        req.flash('success', 'Login Success');
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something Error');
        return res.redirect("/");
    }
}

exports.viewProfile = async (req, res) => {
    try {
        return res.render('profile');
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}




exports.changePasswordPage = async(req, res) => {
    try {
        if(req.cookies && req.cookies.admin && req.cookies.admin._id != undefined){
            let admin = req.cookies.admin;
            return res.render("changePassword", {admin});
        }
        else
        return res.redirect("/")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.changePassword = async(req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.forgotPasswordPage = async(req, res) => {
    try {
        return res.render('auth/forgotPassword')
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}
exports.verfiyOTPPage = async(req, res) => {
    try {
        return res.render('auth/verifyOTP')
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.sendOTP = async(req, res) => {
    try {
        let admin = await AdminModel.findOne({email: req.body.email});
        if(!admin){
            console.log('Admin not found');
            return res.redirect("/");
        }

        let otp = otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false});

        let message = {
            from: 'savanpanchani18@gmail.com',
            to: `${req.body.email}`,
          
            subject: "Forgot Password OTP",
            html: `
                <h2>Hello Users,</h2>
                <p>Your Otp is : ${otp} valid only 5 minutes.</p>
            `
        }
        sendEmail(message)
        res.cookie('otp', otp);
        res.cookie('email', req.body.email);
        return res.redirect("/verify-otp");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}


exports.verifyOTP = async(req, res) => {
    try {
        let otp = req.cookies.otp;
        if(otp == req.body.otp){
            res.clearCookie('otp');
            return res.redirect("/update-password")
        }else{
            console.log("OTP is mismatched")
            return res.redirect("/verify-otp");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updatePasswordPage = async(req, res) => {
    try {
        return res.render('auth/updatePassword')
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updatePassword = async(req, res) => {
    try {
        let email = req.cookies.email;
        let admin = await AdminModel.findOne({email});
        if(!admin){
            console.log('Admin not found');
            return res.redirect("/");
        }

        if(req.body.password == req.body.cpassword){
            let hashPassword = await bcrypt.hash(req.body.password, 10);
            await AdminModel.findByIdAndUpdate(admin._id, {password: hashPassword}, {new: true});
            res.clearCookie("email");
            return res.redirect("/");
        }else{
            return res.redirect("/update-password");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

function setAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); 
  }
  res.redirect('/');
}
