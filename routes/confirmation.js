var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
  res.render('confirmation', { title: 'Sky TV', section: 'Confirmation' });
});


module.exports = router;
