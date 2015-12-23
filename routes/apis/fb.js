// fb.js
'use strict';
var express = require('express'),
    router  = express.Router(),
    mongoose = require('mongoose'),
    fs  = require('fs'),
    path = require('path'),
    log = require('../../service/LogService'),
    ThirdPartyAuth = require('../../service/ThirdPartyAuth'),
    TokenService = require('../../service/TokenService'),
    config = require('../../config'),
    Q = require('q'),
    FB = require('fb'),
    User = mongoose.model("User");

FB.setAccessToken(config.facebook.clientID + '|' + config.facebook.clientSecret);

router.post('/post',function(req,res) {
  var text = (req.body)? req.body.text || 'GG ler~~~' : 'Meow meow meow';
  var token = (req.body)? req.body.token : '';
  FB.setAccessToken(token);

  // privacy : enum{'EVERYONE', 'ALL_FRIENDS', 'FRIENDS_OF_FRIENDS', 'CUSTOM', 'SELF'}
  FB.api('me/feed', 'post', { message: text, privacy: {value:'FRIENDS_OF_FRIENDS'} }, function (result) {
    if(!result || result.error) {
      console.log(!result ? 'error occurred' : result.error);
      return;
    }
    var url = 'https://www.facebook.com/' + result.id.split(_)[0] + '/posts/' + result.id.split(_)[1];
    console.log('Post Id: ' + result.id);
    console.log('Post URL: ' + url);
    result.url = url;
    res.send(result)
  });
  FB.setAccessToken(config.facebook.clientID + '|' + config.facebook.clientSecret);
});

router.post('/read',function(req,res) {
  var text = (req.body)? req.body.text || 'GG ler~~~' : 'Meow meow meow';
  var token = (req.body)? req.body.token : '';
  FB.setAccessToken(token);

  FB.api('me/feed', 'get', function (result) {
    if(!result || result.error) {
      console.log(!result ? 'error occurred' : result.error);
      return;
    }
    console.log('Post Id: ' + result.id);
    res.send(result)
  });

  FB.setAccessToken(config.facebook.clientID + '|' + config.facebook.clientSecret);
});

router.post('/photo',function(req,res) {
  console.log(req.body);
  var token = (req.body)? req.body.token : '';
  // var file = (req.body) ? req.body.file : __dirname + '/../../uploads/5679f7441195f9fb94053d3a-Octocat.png';
  FB.setAccessToken(token);
  // log.info(file)
  var FormData = require('form-data'); //Pretty multipart form maker.
  var form = new FormData();
  // console.log(path.join(file));
  form.append('file',fs.createReadStream(__dirname + '/../../uploads/5679f7441195f9fb94053d3a-Octocat.png'));
  form.append('message', "Meow Meowssss!!!! octocat!!!")

  FB.api('me/photos','post',form, function(result){
    console.log(result);
  })
  FB.setAccessToken(config.facebook.clientID + '|' + config.facebook.clientSecret);

});

module.exports = router;