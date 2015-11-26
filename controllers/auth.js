// Load required packages
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../models/user');

// Config
var config = require('../config');

var opts = {};
opts.secretOrKey = config.secret;
opts.issuer = "macrotrack.fabricate.tech";

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({email: jwt_payload.email}, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));

/*
passport.use(new BasicStrategy(
 function (email, password, callback) {
 User.findOne({email: email}, function (err, user) {
            if (err) {
                return callback(err);
            }

            // No user found with that username
            if (!user) {
                return callback(null, false);
            }

            // Make sure the password is correct
            user.verifyPassword(password, function (err, isMatch) {
                if (err) {
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {
                    return callback(null, false);
                }

                // Success
                return callback(null, user);
            });
        });
    }
));
 */

exports.isAuthenticated = passport.authenticate('jwt', {session: false});