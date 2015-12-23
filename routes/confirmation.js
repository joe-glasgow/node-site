var express = require('express');
var router = express.Router();

/* Confirmation. */
router.all('/', function(req, res, next) {
  // order
  var order;
  var summary = [];
  var customerID;
  // send order to template
  if (req.method === 'POST') {
    // order is the keys of inputs sent from form
    order = Object.keys(req.body);
    // remove the customer ID from order and show it instead
    order.pop();
    customerID = req.body["customerID"];
    // send a summary of the order
    [].forEach.call(order, function (item) {
      summary.push({ item : item });
    });
  } else {
    // fall back incase page is encountered with no order
    customerID = 'None provided.'
    summary = [{item : "No items in your basket. Please go back"}];
  }
  // render the template
  res.render('confirmation', { title: 'Sky TV', section: 'Confirmation', summary : summary, customerID : customerID });
});


module.exports = router;
