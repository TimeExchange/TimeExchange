// endorsement.js - endorsement model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var EndorsementSchema = new Schema({
    from  : {type: String, required: true},
    to  : {type: String, required: true},

    timestamps : {
      createAt  : {type: Date, default: Date.now},
      updateAt  : {type: Date, default: Date.now}
    }
});

module.exports = EndorsementSchema;
