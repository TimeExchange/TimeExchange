// user.js
'use strict';
var express       = require('express'),
    router        = express.Router(),
    isAuth        = require('../middlewares/auth'),
    log           = require('../../service/LogService'),
    TokenService  = require('../../service/TokenService'),
    mongoose      = require('mongoose'),
    User          = mongoose.model('User');

router.get('/',function(req,res) {
  res.send('Render you singup page');
});

router.post('/',function(req,res) {
  if (!req.body) return res.status(400).send({msg :'Missing request body.'});
  if (!req.body.email) return res.status(400).send({msg :'Missing email.'});
  if (!req.body.username) return res.status(400).send({msg :'Missing username.'});
  if (!req.body.password) return res.status(400).send({msg :'Missing password.'});

  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!emailRegex.test(req.body.email))
      return res.status(400).send({msg : 'Wrong email format. Should be like aaaa@bbbb.ccc.'});

  var username  = req.body.username,
      email     = req.body.email,
      password  = req.body.password;

  User.findOne({
    $or : [{username : username},{email : email}]
  })
  .exec(function(err, user){
    if (err) return res.status(500).send({msg : 'Database query failed.'});
    if (!!user) return res.status(401).send({msg : 'Username/email already registered, please login instead.'});
    if (!user) {
      var newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      newUser.save(function(err, count){
        if (err) return res.status(500).send({msg : 'Database save failed.'});
        res.status(200).send({
          msg   : 'Success',
          token : TokenService.issueToken({id : newUser._id})
        })
      })
    }
  })
});

router.post('/isAvailable', function(req,res) {
  if (!req.body) return res.status(400).send({msg : 'Missing request body.'});
  if (!req.body.username) return res.status(400).send({msg : 'Missing email.'});
  if (!req.body.email) return res.status(400).send({msg : 'Missing email.'});

  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!emailRegex.test(req.body.email))
      return res.status(400).send({msg : 'Wrong email format. Should be like aaaa@bbbb.ccc.'});

  User
  .findOne({
    $or : [{username : req.body.username},{email : req.body.email}]
  })
  .exec(function(err, user){
    if (err) return res.status(500).send({msg : 'Database query failed.'})
    if (!!user) {
      var result = [];
      if (user.username === req.body.username)
        result.push('username');
      if (user.email === req.body.email)
        result.push('email');
      return res.status(200).send({msg : false, result : result});
    }
    res.status(200).send({msg : true, result : []});
  });
});

module.exports = router;