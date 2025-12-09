const ExtraCategory = require("../models/extraCategory.model");
const CategoryModel = require("../models/category.model");
const SubCategoryModel = require("../models/subCategory.model");
const mongoose = require("mongoose");

exports.getAllSubCategories = async (req, res) => {
    try {
        let subCategories = await SubCategoryModel.find({ category: req.params.categoryId });
        return res.json({ message: 'Fetch All Sub Categories', subCategories });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' });
    }
}

exports.addExtraCategoryPage = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        const subCategories = await SubCategoryModel.find();

        return res.render("extracategory/addExtraCategory", {
            categories,
            subCategories,
            user: req.user || null
        });

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

// ADD EXTRA CATEGORY
exports.extraCategory = async (req, res) => {
    try {
        const { category, subCategory, extracategory } = req.body;

        await ExtraCategory.create({
            categoryId: category,
            subCategoryId: subCategory,
            extraCategory: extracategory
        });

        res.redirect("/extracategory/view-extracategory");
    } catch (error) {
        console.log(error);
        res.redirect("/extracategory/add-extracategory");
    }
};

exports.viewExtraCategory = async (req, res) => {
    try {
        let extraCategories = await ExtraCategory.find()
            .populate("categoryId")
            .populate("subCategoryId");

        return res.render("extracategory/viewExtracategory", {
            extraCategories,
            user: req.user || null
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.deleteExtraCategory = async (req, res) => {
    try {
        const id = req.params.id;

        // invalid ID protection
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.redirect("/extracategory/view-extracategory");
        }

        await ExtraCategory.findByIdAndDelete(id);

        return res.redirect("/extracategory/view-extracategory");

    } catch (error) {
        console.log(error);
        return res.redirect("/extracategory/view-extracategory");
    }
};

exports.editExtraCategoryPage = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.redirect("/extracategory/view-extracategory");
        }

        const extraCat = await ExtraCategory.findById(id);

        const categories = await CategoryModel.find();
        const subcategories = await SubCategoryModel.find();

        return res.render("extracategory/editExtracategory", {
            extraCat,
            categories,
            subcategories,
            user: req.user || null
        });

    } catch (error) {
        console.log(error);
        return res.redirect("/extracategory/view-extracategory");
    }
};

exports.updateExtraCategory = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.redirect("/extracategory/view-extracategory");
        }

        await ExtraCategory.findByIdAndUpdate(id, {
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId,
            extraCategory: req.body.extraCategory
        });

        return res.redirect("/extracategory/view-extracategory");

    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};

