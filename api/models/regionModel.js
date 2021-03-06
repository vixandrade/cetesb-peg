'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RegionSchema = new Schema({
  _id: {
    type: String
  },
  macro: {
    type: String
  },
  micro: {
    type: String
  },
  beach: {
    type: String
  },
  local: {
    type: String
  },
  quality: {
    type: String
  }
})

module.exports = mongoose.model('Region', RegionSchema)
