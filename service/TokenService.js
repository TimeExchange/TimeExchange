// TokenService.js
'use strict'

var Promise = require('bluebird');
var jwt = Promise.promisifyAll(require('jsonwebtoken'));
var config = require('../config');

module.exports = {
  // return token
  issueToken: function(payload) {
    return jwt.sign(payload, config.token_secret, {
        expiresIn: config.token_exp
      });
  },
  // return a Promise which will decode the token
  verifyToken: function(token) {
    return jwt.verifyAsync(token, config.token_secret)
  }
}