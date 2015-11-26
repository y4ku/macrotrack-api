// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

//Config
var config = require('./config');

//Middleware
var morgan = require('morgan');

//Controllers
var ingredientController = require('./controllers/ingredient');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var recipeController = require('./controllers/recipe');
var macroController = require('./controllers/macro');

// Connect to the macrotrack MongoDB
mongoose.connect(config.url);

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json({
    type: "application/json"
}));

// use morgan to log requests to the console
app.use(morgan('dev'));

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
router.route('/signup')
    .post(userController.postUsers);

router.route('/login')
    .post(userController.loginUser)

router.route('/macros/:date')
    .get(authController.isAuthenticated, macroController.getMacrosByDate);

router.route('/macros')
    .get(authController.isAuthenticated, macroController.getMacros)
    .post(authController.isAuthenticated, macroController.setMacrosByDate);

router.route('/ingredients')
    .get(authController.isAuthenticated, ingredientController.getIngredients)
    .post(authController.isAuthenticated, ingredientController.postIngredients);

router.route('/searchIngredient/:ingredient_string')
    .get(authController.isAuthenticated, ingredientController.searchIngredients);

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

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens'
var token = jwt.sign({
    username: "kuba",
    permissions: "admin"
}, config.secret, {
    expiresIn: 1440, // expires in 24 hours
    issuer: config.issuer
});
