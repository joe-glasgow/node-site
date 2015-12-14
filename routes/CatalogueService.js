var express = require('express');
var router = express.Router();
// default channels
var sky = ['Sky News', 'Sky Sports News'];

router.post('/', function (req, res, next) {
  // if we have a location
  if (req.body.location) {
    res.writeHead(200, {"Content-Type": "application/json"});
    // send data based on location
    switch (req.body.location) {
      case 'london':
        var london = ['Arsenal TV', 'Chelsea TV'];
        // send response
        res.end(JSON.stringify({ channels : {news : sky, sports : london} }));
      case 'liverpool':
        var liverpool = ['Liverpool TV'];
        // send response
        res.end(JSON.stringify({ channels : { news : sky, sports : liverpool }}));
      default:
        // send response
        res.end(JSON.stringify({ channels: sky , sports : [] }));
    }
  } else {
    // failure response
    res.end(JSON.stringify({ success : false, location : 'Failure Exception'}));
  }
});

router.get('/', function (req, res, next) {
  res.end(JSON.stringify({ success : false, location : 'Method not supported'}));
});

module.exports = router;
