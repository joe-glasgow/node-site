// Add a new basket
var Basket =  require('./modules/basket');
var skyBasket = new Basket();

// Elements which controll the basket
var selections = document.querySelectorAll('input[type=checkbox]');
// For each elements in the basket, toggle its status there
[].forEach.call(selections, function (el) {
  // current item
  el.addEventListener('change', function() {
    // selected product
    var product = this.name;
    // if we have checked add it
    if (this.checked) {
      // if basket doesn't contain it
      if (skyBasket.basketContainsItem(product) === false) {
        // add the item
        skyBasket.addToBasket(product);
      }
    } else {
      // remove from our basket
      skyBasket.removeFromBasket(product);
    }
  });
});
// Customer Location Service
// Get ID from query string
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// grab the form elements
var form = document.querySelectorAll('.product-selection')[0];
var hiddenInput = document.querySelectorAll('input[type=hidden]')[0];
// grab current customer id
var customerID = getParameterByName('customerID');
// set the hidden input to customer ID
hiddenInput.value = customerID;
// contact the catalogue service
var catalogueService = function (location) {
  ajax.post('/CatalogueService', { location : location }, function (data) {

  });
};
// logic for displaying customers choices
if (customerID.length) {
  ajax.post('/CustomerLocationService', { customer : customerID }, function(data) {
    // response
    var response = JSON.parse(data);
    var successful = response.success;
    // form successful

    if (successful) {
      catalogueService(response.location);
      // contact location service with location
      form.setAttribute('data-location', response.location);

    } else {
      catalogueService('undetermined');
      form.setAttribute('data-location', 'undetermined');
    }
  })
}
