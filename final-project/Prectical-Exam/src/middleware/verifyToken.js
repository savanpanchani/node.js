const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.schema");

const  verifyToken = async (req, res, next) => {
  try {
    
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized: Authorization header missing" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(userId);

    if (!user || user.isDeleted) {
      return res.status(401).json({ message: "Invalid user token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden: Access denied for your role" });
    }
  };
};

module.exports = {
   verifyToken,
   verifyRole
}