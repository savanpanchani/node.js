const router = require("express").Router();
const ExtraCategory = require("../controllers/extraCategory.controller");

router.get("/subcategory/:categoryId", ExtraCategory.getAllSubCategories);

router.get("/add-extracategory", ExtraCategory.addExtraCategoryPage);
router.post("/add-extracategory", ExtraCategory.extraCategory);

router.get("/view-extracategory", ExtraCategory.viewExtraCategory);

router.get("/delete-extracategory/:id", ExtraCategory.deleteExtraCategory);

router.get("/edit-extracategory/:id", ExtraCategory.editExtraCategoryPage);
router.post("/update-extracategory/:id", ExtraCategory.updateExtraCategory);

module.exports = router;
