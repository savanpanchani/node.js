const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AdminModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, cb) => {
    let admin = await AdminModel.findOne({ email: email });
    if (!admin) {
        return cb(null, false);
    }
    let matchpass = await bcrypt.compare(password, admin.password)
    if (!matchpass) {
        return cb(null, false);
    } else {
        return cb(null, admin)
    }
}));

passport.serializeUser((user, cb)=> {
    return cb(null, user.id);
})

passport.deserializeUser(async(id, cb)=> {
    let admin = await AdminModel.findById(id);
    if(admin){
        return cb(null, admin)
    }
})

passport.setAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        return res.redirect("/");
    }
}

passport.setValidateUser = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;