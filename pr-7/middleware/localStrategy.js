const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AdminModel = require('../models/UserModel');
const bcrypt = require('bcrypt');


passport.use("local", new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return done(null, false, { message: 'Invalid email' });
        }

        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return done(null, false, { message: 'Invalid password' });
        }

        return done(null, admin);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser(async (id, cb) => {
    try {
        const admin = await AdminModel.findById(id);
        if (admin) return cb(null, admin);
        return cb(null, false);
    } catch (err) {
        return cb(err);
    }
});

// Custom middlewares
passport.setAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/");
};

passport.setValidateUser = (req, res, next) => {
    if (req.isAuthenticated()) res.locals.user = req.user;
    next();
};

module.exports = passport;
