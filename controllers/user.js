// Load required packages
var User = require('../models/user');
var Recipe = require('./recipe');

// Config
var config = require('../config');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Create endpoint /api/users for POST
exports.postUsers = function (req, res) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    user.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            var token = jwt.sign({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }, config.secret, {
                expiresIn: "1d", // expires in 24 hours
                issuer: config.issuer
            });

            res.json({
                token: token,
                message: 'New user added to the macro tracker!'
            });
        }
    });
};

exports.loginUser = function (req, res) {
    // find the user
    User.findOne({
        email: req.body.email
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {
            // check if password matches
            user.verifyPassword(req.body.password, function (err, isMatch) {
                if (err) {
                    throw err;
                } else {
                    // Password did not match
                    if (!isMatch) {
                        res.json({success: false, message: 'Authentication failed. Wrong password.'});
                    } else {
                        // Success
                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign({
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }, config.secret, {
                            expiresIn: "1d", // expires in 24 hours
                            issuer: config.issuer
                        });
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                }
            });
        }

    });
};