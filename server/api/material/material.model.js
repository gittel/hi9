'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MaterialSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  start: Date,
  lagerplatz: String,
  bezeichnung: String,
  bestand: Number,
  status: Number

});

module.exports = mongoose.model('Material', MaterialSchema);
