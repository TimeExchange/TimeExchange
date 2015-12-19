var express = require('express'),
    router  = express.Router(),
    pg = require('pg');

router.get('/',function(req,res) {
  res.send('skills test')
});

module.exports = router;