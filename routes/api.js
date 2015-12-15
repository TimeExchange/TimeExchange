var express = require('express');
var router = express.Router();

// List of apis entries
var profile = require('./apis/profile'),
    skills  = require('./apis/skills');

router.use('/profile',profile);
router.use('/skills',skills);

module.exports = router;
