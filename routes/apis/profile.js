var express = require('express'),
    router  = express.Router();
var pg = require('pg');

router.get('/',function(req,res) {
  res.send('profile test')
});


module.exports = router;