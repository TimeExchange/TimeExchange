var express     = require('express'),
    router      = express.Router(),
    mongoose    = require('mongoose'),
    isAuth      = require('../middlewares/auth'),
    log         = require('../../service/LogService'),
    Wish        = mongoose.model('Wish');


// Wish wall
router.get('/',function(req,res) {
  Wish
  .find()
  .exec(function(err, wishes){
    if (err) return res.status(405).send({msg : err.errmsg});
    res.send(wishes);
  });
});

router.post('/', isAuth, function(req,res) {
  var uid = req.user._id;
  var newWish = new Wish();
  newWish.user_id = uid;

  var lists = ['category', 'descriptions']; // Update list
  for (var i = 0; i < lists.length; i++) {
    var field = lists[i];
    if (req.body[field] !== undefined) {
      newWish[field] = req.body[field];
    }
  };
  newWish.save(function(err, count){
    if (err) return res.status(405).send({msg : err.errmsg});
    res.status(200).send({msg: 'Success', wish: newWish});
  })
});


// Check individual wish
router.get('/:wish_id',function(req,res) {
  if (!req.params) return res.status(400).send({msg : 'Missing params.'});
  if (!req.params.wish_id) return res.status(400).send({msg : 'Missgin wish_id.'});

  var wid = req.params.wish_id;
  Wish
  .findOne({_id : wid})
  .exec(function(err, wish){
    if (err) return res.status(500).send({msg : err.errmsg});
    res.status(200).send(wish);
  });
});

router.delete('/',function(req,res) {
  res.send('Wish test')
});

module.exports = router;