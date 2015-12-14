var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  if (req.body.customer) {
    res.writeHead(200, {"Content-Type": "application/json"});
    switch (parseInt(req.body.customer)) {
      case 1:
        res.end(JSON.stringify({ success : true, location : 'london' }));
      case 2:
        res.end(JSON.stringify({ success : true, location : 'liverpool' }));
      default:
        res.end(JSON.stringify({ success : false, location : 'Failure Exception'}));
    }
  } else {
    res.end(JSON.stringify({ success : false, location : 'Failure Exception'}));
  }
});

router.get('/', function (req, res, next) {
  res.end(JSON.stringify({ success : false, location : 'Method not supported'}));
});

module.exports = router;
