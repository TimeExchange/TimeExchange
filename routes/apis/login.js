// login.js
'use strict';
var express = require('express'),
    router  = express.Router(),
    mongoose = require('mongoose'),
    fs  = require('fs'),
    log = require('../../service/LogService'),
    ThirdPartyAuth = require('../../service/ThirdPartyAuth'),
    TokenService = require('../../service/TokenService'),
    config = require('../../config'),
    Q = require('q'),
    FB = require('fb'),
    User = mongoose.model("User");

FB.setAccessToken(config.facebook.clientID + '|' + config.facebook.clientSecret);

router.get('/',function(req,res) {
  res.send('This is login page, please POST /api/login with username and password.');
});

router.get('/setup',function(req,res) {
  var newUser = new User();

  newUser.username = 'lulalachen';
  newUser.email = 'lulalachen@gmail.com';
  newUser.password = newUser.generateHash('meow');
  newUser.status = 'applying';
  log.info(newUser.status)
  newUser
  .save(function(err,user){
    if (err){
      log.debug(err)
      return res.status(401).send({
        msg : err.errmsg
      })
    }
    res.status(200).send({msg : 'Setup successfully.'});
  })
});

router.post('/',function(req,res) {
  if (!req.body) return res.status(400).send({msg :'Missing request body.'});
  if (!req.body.username) return res.status(400).send({msg :'Missing username.'});
  if (!req.body.password) return res.status(400).send({msg :'Missing password.'});

  var username  = req.body.username.toLowerCase(),
      password  = req.body.password;

  User
  .findOne({
    username : username
  })
  .exec(function(err, user){
    if (err) return res.status(401).send({msg : 'Database query failed.'})
    if (!user) return res.status(401).send({msg :'No user named ' + username + ' found.'});
    if (!!user){
      if ( !user.verifyPassword(password) )
        return res.status(401).send({msg :'Wrong password.'});
      else {
        user.login(); // Record login timestamps
        log.info('User ' + user._id + ' - local login.')
        return res.status(200).send({
          msg :'Success',
          token: TokenService.issueToken({id : user._id})
        });
      }
    }
  })

});

router.post('/thirdParty',function(req,res) {
  if (!req.body) return res.status(400).send('Missing request body.');
  if (!req.body.token) return res.status(400).send('Missing token.');
  if (!req.body.provider) return res.status(400).send('Missing provider.');

  var token     = req.body.token,
      provider  = req.body.provider;

  if (!ThirdPartyAuth[provider])
    return res.status(401).send({msg : 'Sorry we do not support ' + provider + ' yet.'});

  ThirdPartyAuth[provider](token, function(err, user){
    if (err){
      return res.status(401).send({msg : err});
    }
    user.login(); // Record login timestamps
    log.info('User ' + user._id + ' - thirdParty login.')
    res.status(200).send({
      user : user,
      token : TokenService.issueToken({id : user._id})
    });
  });

});

module.exports = router;