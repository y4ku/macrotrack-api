// Load required packages
var Recipe = require('../models/recipe');

// Create endpoint /api/recipes for POST
exports.postRecipes = function (req, res) {
    // Create a new instance of the Recipe model
    var recipe = new Recipe();

    // Set the recipe properties that came from the POST data
    recipe.name = req.body.name;
    recipe.ingredients = req.body.ingredients;
    recipe.macros = {
        protein: req.body.protein,
        carbs: req.body.carbs,
        fats: req.body.fats
    };
    recipe.userId = req.user._id;

    // Save the recipe and check for errors
    recipe.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Recipe added to the locker!', data: recipe});
    });
};

// Create endpoint /api/recipes for GET
exports.getRecipes = function (req, res) {
    // Use the Recipe model to find all recipe
    Recipe.find({userId: req.user._id}, function (err, recipes) {
        if (err)
            res.send(err);

        res.json(recipes);
    });
};

// Create endpoint /api/recipes/:recipe_id for GET
exports.getRecipe = function (req, res) {
    // Use the Recipe model to find a specific recipe
    Recipe.find({userId: req.user._id, _id: req.params.recipe_id}, function (err, recipe) {
        if (err)
            res.send(err);

        res.json(recipe);
    });
};

// Create endpoint /api/recipes/:recipe_id for DELETE
exports.deleteRecipe = function (req, res) {
    // Use the Recipe model to find a specific recipe and remove it
    Recipe.remove({userId: req.user._id, _id: req.params.recipe_id}, function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Recipe removed!'});
    });
};