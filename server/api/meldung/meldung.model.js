'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeldungSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  start: Date,
  status: Number

});

module.exports = mongoose.model('Meldung', MeldungSchema);
