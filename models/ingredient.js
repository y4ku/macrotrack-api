// Load required packages
var mongoose = require('mongoose');

var IngredientSchema   = new mongoose.Schema({
    name: String,
    weight: Number,
    unit: String,
    macros: {
        protein: Number,
        carbs: Number,
        fats: Number
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Ingredient', IngredientSchema);