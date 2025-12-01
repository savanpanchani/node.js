const CategoryModel = require('../models/category.model');
const SubCategory = require("../models/subCategory.model");
const ExtraCategory = require("../models/extraCategory.model");

// Add Category Page
exports.addCategoryPage = async (req, res) => {
    try {
        res.render("category/addCategory", { user: req.user || null });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

// View Category Page
exports.viewCategoryPage = async (req, res) => {
    try {
        let categories = await CategoryModel.find();
        res.render("category/viewCategory", { categories, user: req.user || null });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

// Add New Category
exports.addNewCategory = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        await CategoryModel.create({
            categoryName: req.body.categoryName,
            categoryImage: imagePath
        });

        req.flash("success", "Category Added");
        res.redirect("/category/add-category");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

// Edit Category Page
exports.editCategoryPage = async (req, res) => {
    try {
        let category = await CategoryModel.findById(req.params.id);
        return res.render("category/editCategory", { category });
    } catch (error) {
        console.log(error);
        return res.redirect("/category/view-category");
    }
};

exports.updateCategory = async (req, res) => {
    try {
        let updateData = {
            categoryName: req.body.categoryName
        };

        if (req.file) {
            updateData.categoryImage = `/uploads/${req.file.filename}`;
        }

        await CategoryModel.findByIdAndUpdate(req.params.id, updateData);

        req.flash("success", "Category Updated");
        return res.redirect("/category/view-category");

    } catch (error) {
        console.log(error);
        return res.redirect("/category/view-category");
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        await CategoryModel.findByIdAndDelete(id);

        const subCats = await SubCategory.find({ category: id });
        const subCatIds = subCats.map(s => s._id);
        await SubCategory.deleteMany({ category: id });

        await ExtraCategory.deleteMany({
            $or: [
                { categoryId: id },
                { subCategoryId: { $in: subCatIds } }
            ]
        });

        return res.redirect("/category/view-category");

    } catch (error) {
        console.log(error);
        return res.redirect("/category/view-category");
    }
};

