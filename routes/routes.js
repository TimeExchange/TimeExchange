var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/htmlTest',function(req,res) {
  res.sendFile('views/test.html', {root : __dirname});
});
module.exports = router;
