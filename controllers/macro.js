var Macro = require('../models/macro')

exports.getMacros = function (req, res) {
    Macro.find({userId: req.user._id}, function (err, macro) {
        if (err) {
            res.send(err);
        } else {
            res.json(macro);
        }
    });
};

exports.getMacrosByDate = function (req, res) {
    Macro.findOne({date: req.params.date, userId: req.user._id}, function (err, macro) {
        if (err) {
            res.send(err);
        } else {
            res.json(macro);
        }
    });
};

exports.setMacrosByDate = function (req, res) {
    var query = {date: req.body.date, userId: req.user._id};
    var updatedMacro = {
        protein: req.body.protein,
        carbs: req.body.carbs,
        fats: req.body.fats,
        userId: req.user._id
    };
    Macro.findOneAndUpdate(query, updatedMacro, {upsert: true, 'new': true}, function (err, macro) {
        if (err) {
            return res.send(err);
        } else {
            res.json({
                success: true,
                macro: macro
            })
        }
    });
};
