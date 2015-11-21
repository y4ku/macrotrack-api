// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Controllers
var ingredientController = require('./controllers/ingredient');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/macrotrack');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json({
    type: "application/json"
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
    res.json({ message: 'You are running dangerously low on beer!' });
});

// Create a new route with the prefix /beers
router.route('/ingredients')
    .get(ingredientController.getIngredients)
    .post(ingredientController.postIngredients);

// Create a new route with the /beers/:beer_id prefix
router.route('/ingredients/:ingredient_id')
    .get(ingredientController.getIngredient);


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);