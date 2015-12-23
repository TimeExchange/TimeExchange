var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;
//     User      = mongoose.model('User');

var ReviewSchema = new Schema({
    type  : {type: String, required: true},
    stars  : {type: Number, required: true, default: 0},
    title  : {type: String, required: false},
    content  : {type: String, required: false},
    from  : {type:Number, ref: 'User'},
    to    : {type:Number, ref: 'User'},
    markByStaff  : {type: Boolean, required: true, default: false},
    timestamps : {
      createAt  : {type: Date, default: Date.now},
      updateAt  : {type: Date, default: Date.now}
    }
});

mongoose.model('Review',ReviewSchema);

module.exports = mongoose.model('Review');
