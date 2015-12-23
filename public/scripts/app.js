(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Modules required for application
var Basket =  require('./modules/basket');
var skyBasket = new Basket();

// Application begins
// Author: Joseph Morrison
// Project: Sky Site
// Helper method - Get ID from query string
var getParameterByName  = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
// Grab the form elements
var form = document.querySelectorAll('.product-selection')[0];
var hiddenInput = document.querySelectorAll('input[type=hidden]')[0];
// grab current customer id
var customerID = getParameterByName('customerID');
// contact the catalogue service
var catalogueService = function (location) {
  ajax.post('/CatalogueService', { location : location }, function (data) {

    var response = JSON.parse(data);
    var successful = response.success;

    if (successful) {
      // Get the markup of available products
      var htmlFromString = function (string) {
        var el = document.createElement('div');
        // set inner html
        el.innerHTML = string;
        el.classList.add('layout__item', 'layout--item__block-left', 'u-2/3-lap-and-up', 'u-1/1-portable');
        return el;
      };
      // The basket
      var basket = form.querySelectorAll('.basket')[0];
      // Add our selection
      form.insertBefore(htmlFromString(response.availability), basket);
      // basket logic
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
              console.log('adding')
              skyBasket.addToBasket(product);
            }
          } else {
            // remove from our basket
            skyBasket.removeFromBasket(product);
          }
        });
      });
      // DOM heavy, keep out of basket class
      // prepopulate - incase of refresh, gives persistence to state
      var orders = window.localStorage.order;
      // if we have existing orders
      if (orders) {
        [].forEach.call(JSON.parse(orders), function (product) {
          // get the order box
          var checkbox = document.querySelectorAll('input[name="' + product + '"]')[0];
          console.log(checkbox)
          // check it - if checkbox exists / location hasn't changed
          if (checkbox) {
            // check any pre exisiting boxes
            checkbox.checked = true;
            // add to items stored to basket
            skyBasket.addToBasket(product);
          }
        });
      }

    } else {
      // fail event
      throw new Error('There has been a problem retrieving products');
    }
  });
};
// as per requirements set customerID to cookie
document.cookie = 'customerId=' + customerID;
if (hiddenInput) {
  // set the hidden input to customer ID
  hiddenInput.value = customerID;
}

// Logic for displaying customers choices
// Customer Location Service
if (customerID.length) {
  ajax.post('/CustomerLocationService', { customer : customerID }, function(data) {
    // response
    var response = JSON.parse(data);
    var availability = response.location
    // form successful
    if (availability) {
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
