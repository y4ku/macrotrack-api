// Load required packages
var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', weight: Number, unit: String}],
    macros: {
        protein: Number,
        carbs: Number,
        fats: Number
    },
    userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Recipe', RecipeSchema);