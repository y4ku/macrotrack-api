// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var IngredientSchema   = new mongoose.Schema({
    name: String,
    weight: Number,
    unit: Number,
    macros: {
        protein: Number,
        carbs: Number,
        fats: Number
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Ingredient', IngredientSchema);