// api.js - api routes center
'use strict';
var express = require('express'),
    router  = express.Router(),
    path    = require('path'),
    Step    = require('step'),
    log     = require('../service/LogService'),
    fs      = require('fs'),
    apiPath = path.join(__dirname, "apis");

fs.readdirSync(apiPath)
.forEach(function(file){
  var fileName = file.replace('.js','');
  router.use('/'+fileName, require(path.join(apiPath, fileName)) );
  log.debug('[API Router] ' + fileName + ' is included.');
});

module.exports = router;
