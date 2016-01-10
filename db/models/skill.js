var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    category = require('../static/category');

var skillSchema = new Schema({
  name  : {type: String, required: true},
  category : String,


  timestamps : {
    createAt  : {type: Date, default: Date.now},
    updateAt  : {type: Date, default: Date.now}
  }
});

module.exports = mongoose.model('skill',skillSchema);
