var express = require('express');
var router = express.Router();
/*
**  Routing Basics
**
**  Simple route : (ex: localhost:3000/aboutus)
**    <code>
**      router.get('/aboutus', function(req, res){
**        res.render('aboutus');
**      })
**    <p.s.>
**      Put the file in 'views' folder, with name ended as '.ejs'.
**
**  Html route : (ex: localhost:3000/aboutus.html)
**    <code>
**      Don't have to specify in this file,
**      just add 'aboutus.html' in view directory.
*/
// <--------- Add Routing Code Below This Line -----------> //

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
