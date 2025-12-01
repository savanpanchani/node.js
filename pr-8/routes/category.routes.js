const express = require('express');
const routes = express.Router();

const {
    addCategoryPage,
    viewCategoryPage,
    editCategoryPage,
    updateCategory,
    addNewCategory,
    deleteCategory
} = require('../controllers/category.controller');

const uploadImage = require('../middleware/uploadImage');

routes.get("/add-category", addCategoryPage);
routes.get("/view-category", viewCategoryPage);

routes.get("/edit-category/:id", editCategoryPage);

routes.post(
  "/update-category/:id",
  uploadImage.single("categoryImage"),
  updateCategory
);

routes.post("/add-category", uploadImage.single("categoryImage"), addNewCategory);

routes.get("/delete-category/:id", deleteCategory);

module.exports = routes;
