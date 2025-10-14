const express = require("express");
const { dashboard, loginpage, loginUser, logOut, profile, passwordChangeForm, passwordChange } = require("../controllers/index.controller");
const userRrouter = require("./user.route");
const blogRrouter = require("./blog.route");
const router = express.Router();

router.get("/dashboard", dashboard);
router.get("/", loginpage);
router.post("/login-user", loginUser);
router.get("/user-logOut", logOut);
router.get("/user-profile", profile);
router.get("/user-passwordChange", passwordChangeForm);
router.post("/passwordChange", passwordChange);

router.use("/users", userRrouter);
router.use("/blogs", blogRrouter);

module.exports = router;