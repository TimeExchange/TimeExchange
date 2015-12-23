// user.js
'use strict';
var express       = require('express'),
    router        = express.Router(),
    isAuth        = require('../middlewares/auth'),
    log           = require('../../service/LogService'),
    TokenService  = require('../../service/TokenService'),
    mongoose      = require('mongoose'),
    User          = mongoose.model('User');


router.put('/link', isAuth, function(req,res) {
  if (!req.body) return res.status(400).send({msg : 'Missing request body.'});

});

router.put('/unlink', isAuth, function(req,res) {
  if (!req.body) return res.status(400).send({msg : 'Missing request body.'});

});

router.put('/', isAuth, function(req,res) {
  if (!req.body) return res.status(400).send({msg : 'Missing request body.'});

  var currentUser = req.user;

  if (!!req.body.email)
    currentUser.email = req.body.email;
  if (!!req.body.password)
    currentUser.password = currentUser.generateHash(req.body.password);

  currentUser.save(function(err, user){
    if (err)
      return res.status(405).send({msg : err.errmsg});
    log.info('User ' + req.user._id + ' update profile');
    res.status(200).send({msg : 'Update successfully.', user : user});
  });

});

module.exports = router;