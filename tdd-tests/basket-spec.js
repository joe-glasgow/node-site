// Criteria:

// 1. Show we are able to create a basket

// 2. Show we are able to add to a basket

// 3. Show we are able to remove from a basket

// 4. Show we can save a basket - BDD [Selenium]

jest.dontMock('../public/scripts/modules/basket.js');

// describe the test
describe('Grab a basket and confirm that ', () => {
  beforeEach(() => {
    var Basket = require('../public/scripts/modules/basket');
    var skyBasket = new Basket();
  });
  // 1.
  it('can be initialised', () => {
    var Basket = require('../public/scripts/modules/basket');
    var skyBasket = new Basket();
    // expet to have a basket with 0 items
    expect(skyBasket.items.length).toBe(0);
  });
  // 2.
  it('can have items added', () => {
    var Basket = require('../public/scripts/modules/basket');
    var skyBasket = new Basket();
    // expect
    skyBasket.addToBasket('Arsenal TV');
    expect(skyBasket.items[0]).toBe('Arsenal TV');
  });
  // 3.
  it('can have items removed', () => {
    var Basket = require('../public/scripts/modules/basket');
    var skyBasket = new Basket();
    skyBasket.addToBasket('Arsenal TV');
    skyBasket.addToBasket('Chelsea TV');
    skyBasket.addToBasket('Liverpool TV');
    // remove the first
    skyBasket.removeFromBasket('Arsenal TV');
    // Test it worked
    expect(skyBasket.items[0]).toBe('Chelsea TV');
  });
})
