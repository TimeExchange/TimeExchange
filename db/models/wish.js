var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Schema = mongoose.Schema;


var WishSchema = new Schema({
  user_id       : {type:Schema.Types.ObjectId, ref: 'User', required: true},
  category      : String,  // ex : Music
  title         : String,
  descriptions  : String,
  timestamps    : {
    createAt  : {type: Date, default: Date.now},
    updateAt  : {type: Date, default: Date.now}
  }
});

// Insert wish_id into user object
WishSchema.post('save', function(result) {
  User
  .findOne({_id : this.user_id})
  .exec(function(err, user){
    if (err) return err;
    if (!!user){
      user.profile.wishes.push(result._id);
    }
    user.save();
  },this);
});

// Insert wish_id into user object
WishSchema.post('delete', function(result) {
  User
  .findOne({_id : this.user_id})
  .exec(function(err, user){
    if (err) return err;
    if (!!user){
      user.profile.wishes
    }
    user.save();
  },this);
});
module.exports = mongoose.model('Wish',WishSchema);
