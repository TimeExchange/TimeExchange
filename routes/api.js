var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendStatus().send('This is api test');
});

module.exports = router;
