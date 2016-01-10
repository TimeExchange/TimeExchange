// connection.js - DB setup
'use strict';
var database = ('local' === 'local') ? process.env.DATABASE_LOCAL : process.env.DATABASE_CLOUD;
var log      = require('../service/LogService');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var fs       = require('fs');
var path     = require('path');

fs.readdirSync(path.join(__dirname,'/models/'))
.forEach(function(file){
  require(path.join(__dirname,'/models/',file));
  log.debug('[Model] ' + file.replace('.js','') + ' is included');
})

mongoose.connect(database, function(){
  log.info('DB connected @ ' + database);
});