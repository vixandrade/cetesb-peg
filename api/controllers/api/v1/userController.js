var mongoose = require('mongoose');
var User = require('../../../models/userModel');

exports.index = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);    
        res.json(user);
    });
};

exports.create = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.read = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete = function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: "Succesfully deleted" });
    });
};