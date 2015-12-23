// user.js - user model
var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt-nodejs');
var Schema    = mongoose.Schema;
var uuid = require('node-uuid');

var UserSchema = new Schema({
  username  : {type: String, unique: true}, // Used as login account
  email     : {type: String, unique: true},
  password  : {type: String},
  role      : {type: String, required: true, default: 'applicant'}, // applicant, member, admin, banned, .....
  facebook  : {
    id            : String,
    name          : String,
    email         : String,
    accessToken   : String,
    scopes        : [{type: String}],
    expires_at    : String
  },
  github    : {
    accessToken   : String,
    email         : String
  },
  profile   : {
    name          : String,
    photo         : String,
    bios          : String,
    skills        : [{type:Schema.Types.ObjectId, ref: 'Skill'}],
    reviews       : [{type:Schema.Types.ObjectId, ref: 'Review'}],
    endorsement   : [{type:Schema.Types.ObjectId, ref: 'Endorsement'}]
  },
  timestamps : {
    lastLoginAt   : {type: String, default: new Date(Date.now()).toString()},
    lastActionAt  : {type: String, default: new Date(Date.now()).toString()},
    createAt      : {type: String, default: new Date(Date.now()).toString()},
    updateAt      : {type: String, default: new Date(Date.now()).toString()}
  }
});

UserSchema.post('save', function(result) {
  this.update({'$set' : {
      'timestamps.updateAt': new Date(Date.now()).toString(),
      'timestamps.lastActionAt': new Date(Date.now()).toString()
  }}, function(err, raw){
    return;
  });
});

UserSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'The e-mail field cannot be empty.')

UserSchema.methods.action = function(){
  this.update({'$set' : {
    'timestamps.lastActionAt': new Date(Date.now()).toString()
  }}, function(err, raw){
    return;
  });
}

UserSchema.methods.login = function(){
  this.update({'$set' : {
    'timestamps.lastLoginAt': new Date(Date.now()).toString(),
    'timestamps.lastActionAt': new Date(Date.now()).toString()
  }}, function(err, raw){
    return;
  });
}

UserSchema.methods.generateUsername = function(){
  return uuidv1();
}

UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.verifyPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

mongoose.model('User',UserSchema);
