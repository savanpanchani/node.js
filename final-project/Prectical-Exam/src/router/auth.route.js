const express = require('express');
const { loginUser, RegisterUser} = require('../controller/auth.controller');
// const upload = require('../middleware/multerImage');
const authRouter = express.Router();

authRouter.post('/loginUser', loginUser);
authRouter.post('/registerUser', RegisterUser);


module.exports = authRouter;