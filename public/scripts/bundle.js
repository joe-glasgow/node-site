(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./modules/basket":2}],2:[function(require,module,exports){
// create a basket
var Basket = function () {
  return {
    // store current selected items
    items : [],
    // add an item to the basket
    addToBasket : function (item) {
      // if array does not contain item
      if (this.basketContainsItem(item) === false) {
        // add item
        this.items.push(item);
        // save to basket
        this.saveBasket();
      }
    },
    // remove from basket
    removeFromBasket : function (item) {
      console.log(item)
      // remove from array
      this.items = this.items.filter(function (currentItem) {
        // if items in the array, remove it and return
        // a clean array.
        return currentItem !== item;
      });
      // save to basket
      this.saveBasket();
    },
    // save basket for persistence
    saveBasket : function () {
      // grab basket element
      var basketEl = document.querySelectorAll('.selected-products')[0];
      // if basket exists on page - thrown up in tdd
      if (basketEl) {
        // reset the basket on every change
        basketEl.innerHTML = '';
        // if we have items in our basket
        if (this.items.length) {
          this.items.map(function(item) {
            var basketItem = document.createElement('li');
            basketItem.innerHTML = item;
            basketEl.appendChild(basketItem);
          });
        }
        // save basket to cookie
        if (window.localStorage) {
          localStorage["order"] = JSON.stringify(this.items);
        }
      }
    },
    // utility for checking basket contains
    basketContainsItem : function (item) {
      // if items doesn't contain item
      if(this.items.indexOf(item) === -1) {
        return false;
      } else {
        return true;
      }
    }
  }
}

module.exports = Basket;

},{}]},{},[1]);
