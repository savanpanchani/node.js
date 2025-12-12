const express = require("express");
const { verifyToken } = require("../middleware/verifyToken.js");
const { getAllUsers, deleteUser, createUser, updateUser,} = require("../controller/admin.controller.js");
const { verifyRole } = require("../middleware/verifyToken.js");
// const { getEmployeeById } = require("../controller/manager.controller.js");
const { getMyProfile, updateMyProfile, getAllusers } = require("../controller/user.controller.js");
const { addRecipe,editRecipe,deleteRecipe } = require("../controller/recipe.controller.js");

const adminRouter = express.Router();


adminRouter.get("/viewSelf", verifyToken, verifyRole("Admin"),getMyProfile);
adminRouter.put("/editSelf", verifyToken, verifyRole("Admin"),updateMyProfile);
adminRouter.get("/all", verifyToken, verifyRole("Admin"), getAllusers);
adminRouter.post("/add", verifyToken, verifyRole("Admin"), createUser);
adminRouter.put("/editUser/:id", verifyToken, verifyRole("Admin"), updateUser);
adminRouter.delete("/:id", verifyToken, verifyRole("Admin"), deleteUser);
adminRouter.post("/addRecipe", verifyToken, verifyRole("Admin"), addRecipe);
adminRouter.put("/editRecipe/:id", verifyToken, verifyRole("Admin"), editRecipe);
adminRouter.delete("/deleteRecipe/:id", verifyToken, verifyRole("Admin"), deleteRecipe);


module.exports = adminRouter;
