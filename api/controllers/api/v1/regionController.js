var mongoose = require('mongoose');
var Region = require('../../../models/regionModel');

exports.index = function(req, res) {
    Region.find({}, function(err, region) {
        if (err)
            res.send(err);    
        res.json(region);
    });
};

exports.create = function(req, res) {
    var new_user = new Region(req.body);
    new_user.save(function(err, region) {
        if (err)
            res.send(err);
        res.json(region);
    });
};

exports.read = function(req, res) {
    Region.findById(req.params.userId, function(err, region) {
        if (err)
            res.send(err);
        res.json(region);
    });
};

exports.delete = function(req, res) {
    Region.remove({
        _id: req.params.userId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: "Succesfully deleted" });
    });
};