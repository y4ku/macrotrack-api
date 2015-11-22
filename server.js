// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

//Controllers
var ingredientController = require('./controllers/ingredient');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var recipeController = require('./controllers/recipe');

// Connect to the macrotrack MongoDB
mongoose.connect('mongodb://localhost:27017/macrotrack');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json({
    type: "application/json"
}));

// Use the passport package in our application
app.use(passport.initialize());

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
    res.json({ message: 'You are running dangerously low on macros!' });
});

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/ingredients')
    .get(authController.isAuthenticated, ingredientController.getIngredients)
    .post(authController.isAuthenticated, ingredientController.postIngredients);

router.route('/ingredients/:ingredient_id')
    .get(authController.isAuthenticated, ingredientController.getIngredient);

router.route('/recipes')
    .get(authController.isAuthenticated, recipeController.getRecipes)
    .post(authController.isAuthenticated, recipeController.postRecipes);

router.route('/recipes/:recipe_id')
    .get(authController.isAuthenticated, recipeController.getRecipe)
    .delete(authController.isAuthenticated, recipeController.deleteRecipe);


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert macros on port ' + port);