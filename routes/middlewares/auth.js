// auth.js - middleware
var TokenService = require('../../service/TokenService'),
    log = require('../../service/LogService'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(req, res, next){

  var token;
  // Check token //
    // Header // - Bearer xxxxx.yyyyyy.zzzzz
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    // check hearder format
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
      return res.status(401).send({msg : 'Header\'s format should be Authorization: Bearer [token]'});
    }
    token = parts[1];
    delete req.headers.authorization;
  }

  if(!!token){
    // If token exist //
    TokenService
    .verifyToken(token)
    .then(function (result){
      log.warn(result)
      return User.findOne({_id : result.id});
    })
    .then(function (user){
      if (!user)
        return res.status(401).send({msg : 'No user find with this token.'});
      user.action(); // Record lastAction timestamps
      req.user = user;
      next();
    })
    .catch(function(err){
      res.status(401).send({msg : err.message.toString()});
    });
  } else {
    // No token provided
    res.status(401).send({msg : 'Unauthorized - No token provided.'});
  }
  return;
}