var Ingredient = require('../models/ingredient');

exports.postIngredients = function(req, res) {
    // Create a new instance of the Beer model
    var ingredient = new Ingredient();

    // Set the beer properties that came from the POST data
    ingredient.name = req.body.name;
    ingredient.weight = req.body.weight;
    ingredient.unit = req.body.unit;
    ingredient.macros = {
        protein: req.body.actual.protein,
        carbs: req.body.actual.carbs,
        fats: req.body.actual.fats
    };

    // Save the beer and check for errors
    ingredient.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Ingredient added to the db!', data: ingredient});
    });
};

exports.getIngredients = function(req, res) {
    Ingredient.find(function(err, ingredients) {
        if(err)
            res.send(err);

        res.json(ingredients);
    })
};

exports.getIngredient = function(req, res) {
    // Use the Beer model to find a specific beer
    Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
        if (err)
            res.send(err);

        res.json(ingredient);
    });
};