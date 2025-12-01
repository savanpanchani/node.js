const express = require('express');
const { addSubCategoryPage, addSubCategory, viewSubCategory, deleteSubCategory, editSubCategoryPage, updateSubCategory } = require('../controllers/subCategory.controller');
const routes = express.Router();

routes.get("/add-subcategory", addSubCategoryPage);
routes.post("/add-subcategory", addSubCategory);

routes.get("/view-subCategory", viewSubCategory);

routes.get("/delete-subcategory/:id", deleteSubCategory);
routes.get("/edit-subcategory/:id", editSubCategoryPage);
routes.post("/update-subcategory/:id", updateSubCategory);


module.exports = routes;