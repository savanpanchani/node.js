const userModel = require('../models/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  try {
    console.log(req.body.email);
    
    let user = await userModel.findOne({ email: req.body.email, isDeleted: false });
    console.log(user);
     
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ status: 400, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
    );

    return res.json({
      status: 200, 
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.RegisterUser = async(req, res) => {
    try {
      console.log(req.body);
       let user = await userModel.findOne({email: req.body.email, isDeleted: false})
       if(user){
        return res.json({status: 400, message: "User Already Exist"});
       }
       let hashPassword = await bcrypt.hash(req.body.password, 10);
       user = await userModel.create({
        ...req.body,
        password: hashPassword
       });
       return res.json({status: 201, message: "New User Register"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error'})
    }
}


