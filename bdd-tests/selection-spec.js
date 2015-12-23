var assert = require('assert');

describe('As a user from London, I can use Sky Selection', function () {
    before(function() {
      // incase of laggy env
      this.timeout(30000);
      browser.url('http://localhost:3000/?customerID=1')
    });
    // check we have a form
    it('checks selection form is present', function(done) {
      browser
        .waitForExist(".product-selection")
        .then(function(value) {
          assert.equal(value, true);
        })
        .call(done);
    });
    // check we can check an input
    it('checks checkable input is present', function(done) {
      // incase of laggy env
      this.timeout(40000)
      browser
        .waitForExist("input")
        .pause(500)
        .click('input')
        .pause(500)
        .waitForSelected('input')
        .then(function(value) {
          console.log(value);
          assert.equal(value, true);
        })
        .call(done);
    });
    // check we can check an input
    it('checks baskets can update', function(done) {
      // incase of laggy env
      this.timeout(40000)
      browser
        .pause(600)
        .waitForExist(".selected-products li")
        .pause(600)
        .isExisting('.selected-products li')
        .pause(600)
        .then(function(value) {
          assert.equal(value, true);
        })
        .call(done);
    });
});
