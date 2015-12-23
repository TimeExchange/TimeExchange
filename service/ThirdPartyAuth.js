// login.js
'use strict';
var express = require('express'),
    router  = express.Router(),
    mongoose = require('mongoose'),
    log = require('./LogService'),
    ThirdPartyAuth = require('./ThirdPartyAuth'),
    TokenService = require('./TokenService'),
    config = require('../config'),
    Q = require('q'),
    FB = require('fb'),
    User = mongoose.model("User");
FB.setAccessToken(config.facebook.clientID + '|' + config.facebook.clientSecret);

module.exports = {
    facebook : function(token, callback){
      function checkInputToken(){
        var deferred = Q.defer();

        FB.api('/debug_token', { input_token : token }, function (result){
          if (result.error || (result.data && result.data.error)){
            var msg = result.data?  result.data.error.message : result.error.message;
            deferred.reject(msg);
          }
          deferred.resolve(result.data);
        });
        return deferred.promise;
      };

      function extendAccessToken(info){
        var deferred = Q.defer();

        FB.api('oauth/access_token', {
          client_id: config.facebook.clientID,
          client_secret: config.facebook.clientSecret,
          grant_type: 'fb_exchange_token',
          fb_exchange_token: token
        }, function (result) {
          if(!result || result.error)
            deferred.reject(!result ? 'Error occurred when extending access token.' : result.error);

          info.token     = result.access_token;
          info.expires_at = result.expires;

          deferred.resolve(info);
        });
        return deferred.promise;
      };

      function getUserProfile(result){
        var deferred = Q.defer();
        var date = new Date(result.expires_at*1000 + Date.now());
        var info = {
          id          : result.user_id,
          name        : '',
          email       : '',
          accessToken : result.token,
          expires_at  : date.toString(),
          scopes      : result.scopes
        }

        var fields = ['id','name','email'];

        FB.api(info.id, {fields}, function(data){
          // log.debug('FB api : ' + JSON.stringify(data) );
          info.name  = data.name;
          info.email = data.email;
          deferred.resolve(info);
        });
        return deferred.promise;
      };

      function checkExistence(info){
        var deferred = Q.defer();

        User
        .findOne({
          $or : [{'facebook.id' : info.id}, {'email' : info.email}]
        })
        .exec(function(err, user){
          if (err) deferred.reject(err);
          if (user) {
            deferred.resolve([user, info]);
          } else {
            deferred.resolve([null, info]);
          }
        })
        return deferred.promise;
      };

      function updateOrCreate (chunck){
        var deferred = Q.defer();
        var user = chunck[0],
            info = chunck[1],
            lists = ['id','name','email','accessToken','expires_at','scopes'];
        log.debug(user)
        if (!!user){
          // If user exists
          for (var i = 0; i < lists.length; i++) {
            var field = lists[i];
            if (info[field] !== undefined) {
              user.facebook[field] = info[field];
            }
          };
          user.save(function(err, count){
            if (err) deferred.reject(err);
            deferred.resolve(user);
          })
        } else {
          // If not exist - create a new one
          var newUser = new User();

          // We only check fb.id and email uniqueness; because we don't know what username 3-party want.
          newUser.username = newUser.generateUsername(); // Temp username later maybe they'll merge account.
          newUser.email    = info.email;
          for (var i = 0; i < lists.length; i++) {
            var field = lists[i];
            if (info[field] !== undefined) {
              newUser.facebook[field] = info[field];
            }
          };
          newUser.save(function(err, count){
            if (err)
              deferred.reject(err);
            deferred.resolve(newUser);
          })
        }
        return deferred.promise;
      }

      Q.fcall(checkInputToken)
      .then(extendAccessToken)
      .then(getUserProfile)
      .then(checkExistence)
      .then(updateOrCreate)
      .then(function(user){
        return callback(null, user)
      })
      .catch(function(err){
        return callback(err);
      });
    } // End facebook auth
}