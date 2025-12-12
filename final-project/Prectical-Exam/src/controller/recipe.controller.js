const recipeSchema = require("../models/recipe.schema.js");

exports.addRecipe = async (req, res) => {
  try {
    console.log(req.body);
    const { title, ingredients, instructions } = req.body;
    const category = req.body.category; 

    if (!title || !ingredients || !instructions || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newRecipe = await recipeSchema.create({
      title,
      ingredients,
        instructions,
        category,
    });
    res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });
  }
    catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.editRecipe = async (req, res) => {
  try {
    const { id, title, ingredients, instructions, category } = req.body;
    const recipe = await recipeSchema.findOne(id);
    console.log(recipe);

    if (!recipe || recipe.isdelete) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (title) recipe.title = title;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;
    if (category) recipe.category = category;
    await recipe.save();
    res.json({ message: "Recipe updated successfully", recipe });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params; 
    const recipe = await recipeSchema.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.isDelete === true) {
      return res.status(400).json({ message: "Recipe is already deleted" });
    }

    recipe.isDelete = true;
    await recipe.save();

    return res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getAllRecipes = async (req, res) => {
  const recipes = await recipeSchema.find({ isdelete: false });
  res.json(recipes);
};

