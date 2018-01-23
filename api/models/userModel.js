'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: {
    type: String,
    required: 'Enter username'
  },
  birth_date: {
    type: Date,
    default: Date.now
  },
  level: {
    type: [{
      type: String,
      enum: ['planner', 'executor']
    }],
    default: ['executor']
  }
});

module.exports = mongoose.model('User', UserSchema);