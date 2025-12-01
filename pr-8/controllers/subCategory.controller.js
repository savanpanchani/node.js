const mongoose = require('mongoose');
const Category = require('../models/category.model');
const SubCategory = require('../models/subCategory.model');
const ExtraCategory = require('../models/extraCategory.model');

// Render Add page
exports.addSubCategoryPage = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.render('subcategory/addSubcategory', {
      categories,
      user: req.user || null
    });
  } catch (err) {
    console.error(err);
    req.flash && req.flash('error', 'Something went wrong');
    return res.redirect('back');
  }
};

// Create new subcategory
exports.addSubCategory = async (req, res) => {
  try {
    const payload = {
      category: req.body.category,
      subCategoryName: req.body.subCategoryName
    };

    await SubCategory.create(payload);
    req.flash && req.flash('success', 'Sub Category Added');
    return res.redirect('/subcategory/add-subcategory');
  } catch (err) {
    console.error(err);
    req.flash && req.flash('error', 'Could not add subcategory');
    return res.redirect('/subcategory/add-subcategory');
  }
};

// View all subcategories
exports.viewSubCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate('category', 'categoryName categoryImage')
      .lean();

    return res.render('subcategory/view_subcategory', {
      subCategories,
      user: req.user || null
    });
  } catch (err) {
    console.error(err);
    req.flash && req.flash('error', 'Something went wrong');
    return res.redirect('back');
  }
};

// Delete subcategory
exports.deleteSubCategory = async (req, res) => {
  try {
    let id = req.params.id;
    await ExtraCategory.deleteMany({ subCategoryId: id });
    await SubCategory.findByIdAndDelete(id);
    req.flash("success", "Sub Category Deleted Successfully!");

    return res.redirect("/subcategory/view-subcategory");

  } catch (error) {
    console.log(error);
    req.flash("error", "Error deleting Sub Category!");
    return res.redirect("/subcategory/view-subcategory");
  }
};

exports.editSubCategoryPage = async (req, res) => {
  try {
    const id = req.params.id;

    const subCategory = await SubCategory.findById(id).populate("category");
    const categories = await Category.find();

    return res.render("subcategory/edit_subCategory", {
      subCategory,
      categories,
      user: req.user || null
    });

  } catch (error) {
    console.log(error);
    return res.redirect("/subCategory/view-subcategory");
  }
};

// Update handler
exports.updateSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash && req.flash('error', 'Invalid id');
      return res.redirect('/subcategory/view-subcategory');
    }

    const updates = {
      category: req.body.category,
      subCategoryName: req.body.subCategoryName
    };

    const updated = await SubCategory.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      req.flash && req.flash('error', 'SubCategory not found');
      return res.redirect('/subcategory/view-subcategory');
    }

    req.flash && req.flash('success', 'SubCategory updated');
    return res.redirect('/subcategory/view-subcategory');
  } catch (err) {
    console.error(err);
    req.flash && req.flash('error', 'Something went wrong');
    return res.redirect('/subcategory/view-subcategory');
  }
};