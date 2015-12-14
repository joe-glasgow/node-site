var assert = require('assert');

describe('As a user from London, I can use Sky Selection', function () {
    before(function() {
      this.timeout(30000);
      browser.url('http://localhost:3000/?customerID=1')
    });
    // check we have a form
    it('checks selection form is present', function(done) {
      browser
        .pause(1500)
        .isExisting('.product-selection')
        .pause(1500)
        .then(function(value) {
          assert.equal(value, true);
        })
        .call(done);
    });
    //
    it('checks selection form is present', function(done) {
      browser
        .pause(1500)
        .click("input[type='checkbox']:first")
        .pause(1500)
        .then(function(value) {
          assert.equal(value, true);
        })
        .call(done);
    });
});
