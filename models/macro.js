/**
 * Created by y4ku on 11/24/15a.
 */
var mongoose = require('mongoose');

// Define our user schema
var MacroSchema = new mongoose.Schema({
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fats: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: String
});

module.exports = mongoose.model('Macro', MacroSchema);