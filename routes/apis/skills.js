var express = require('express'),
    router  = express.Router(),
    mongoose = require('mongoose');

router.get('/',function(req,res) {
  res.send('skills test')
});

module.exports = router;