var express   = require('express'),
    router    = express.Router(),
    isAuth    = require('../middlewares/auth'),
    log       = require('../../service/LogService'),
    mongoose  = require('mongoose');

router.get('/',function(req,res) {
  res.send('skills test')
});

router.post('/',isAuth, function(req,res) {
  var uid = req.user._id;


});

module.exports = router;