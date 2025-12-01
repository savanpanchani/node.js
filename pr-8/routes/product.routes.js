const express = require('express');
const router = express.Router();
const Product = require("../models/product.model");
const controller = require("../controllers/product.controller");

router.get("/add-product", controller.addProductPage);
router.post("/add-product", Product.uploadImage, controller.addNewProduct);

router.get("/view-product", controller.getAllProducts);
router.get("/single-product/:id", controller.getProduct);
router.get("/delete-product/:id", controller.deleteProduct);
router.get("/edit-product/:id", controller.editProductPage);
router.post("/edit-product/:id", Product.uploadImage, controller.updateProduct);

router.get("/get-subcategories/:id", controller.getSubCategories);
router.get("/get-extra/:id", controller.getExtraCategory);

module.exports = router;
