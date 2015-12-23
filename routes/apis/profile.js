// profile.js - api routes
'use strict';
var express       = require('express'),
    router        = express.Router(),
    multer        = require('multer'),
    fs            = require('fs-extra'),
    Step          = require('step'),
    isAuth        = require('../middlewares/auth'),
    log           = require('../../service/LogService');

var upload        = multer({dest : '../../uploads/'});

router.get('/', isAuth, function(req,res) {
  log.info('User ' + req.user._id + ' check profile');
  req.user.login(); // Record login timestamps
  res.status(200).send({
    user  : req.user,
    msg   : 'Successfully login.'
  });
});

router.post('/', isAuth, upload.array('photo',1), function(req,res) {
  Step(
      function checkFileUpload(){
        var currentUser = req.user;
        if (req.files !== undefined){
          req.files.forEach(function(file){
            fs.copy(file.path, 'uploads/' + currentUser._id + '-' + file.originalname , function(err){
              if (err) {
                log.warn(err);
                res.status(500).send({ msg : 'Photo upload failed.'});
              }
              currentUser.profile.photo = 'uploads/' + currentUser._id + '-' + file.originalname;
              log.info('Photo created in "uploads/' + currentUser._id + '-' + file.originalname + '"');
              currentUser.save();
            })
          })
        }
        return currentUser;
      }, function checkTextUpdate(err, currentUser){
        if (!req.body) return res.status(400).send({ msg : 'Nothing in request body.'});

        var lists = ['bios','name'];
        for (var i = 0; i < lists.length; i++) {
          var field = lists[i];
          if (req.body[field] !== undefined) {
            currentUser.profile[field] = req.body[field];
          }
        };

        currentUser.save(function(err, user){
          if (err)
            return res.status(500).send({msg : err.errmsg});
          log.info('User ' + req.user._id + ' update profile');
          res.status(200).send({msg : 'Update successfully.', user : currentUser});
        });
      }
  );
});


module.exports = router;