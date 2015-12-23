var express = require('express');
var router = express.Router();
var mustache = require('mustache');
// default channels
var sky = [{ channel : 'Sky News' }, { channel : 'Sky Sports News'}];
// markup templates - switch out, line too long
var template = "{{ #availableChannels }} <ul class='layout--item__block-left u-1\/2-lap-and-up u-1\/1-portable'><li class='h2'> {{ category.name }} </li> {{#category.channels}} <li><input name='{{ channel }}' type='checkbox'/> {{ channel }}</li> {{/category.channels}}</ul> {{/availableChannels}}";
// handle post
router.post('/', function (req, res, next) {
  // Send correct response
  res.writeHead(200, {"Content-Type": "application/json"});
  // if we have a location
  if (req.body.location) {
    var obj;
    var region;
    var html;
    var location = req.body.location;
    // logic - move to switch
    if (location === 'london') {
      region = [{ channel : 'Arsenal TV'}, { channel :'Chelsea TV'}];
      obj = { location: 'london', availableChannels : [
          { "category" : { name : 'Sport', channels : region } },
          { "category" : { name : 'News', channels : sky } }
        ]
      };

    } else if (location === 'liverpool') {
      region = [{ channel : 'Liverpool TV'}];
      // send response
      obj = { location: 'liverpool', availableChannels : [
          { "category" : { name : 'Sport', channels : region } },
          { "category" : { name : 'News', channels : sky } }
        ]
      };
    } else {
      // send response
      obj = { location: 'undetermined', availableChannels : [
          { "category" : { name : 'News', channels : sky } }
        ]
      };
    };
    // set the html to send back
    html = mustache.render(template, obj);
    // send response
    res.end(JSON.stringify({ success : true, availability : html }));
  } else {
    // failure response
    res.end(JSON.stringify({ success : false, location : 'Failure Exception'}));
  }
});

router.get('/', function (req, res, next) {
  res.end(JSON.stringify({ success : false, location : 'Method not supported'}));
});

module.exports = router;
