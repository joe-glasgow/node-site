// # SKY TV - [Module] : Basket
/*
 *
 * #### @class Basket
 * #### @constructor none
 */
var Basket = function () {
  return {
    // store current selected items
    items : [],
    /*
     * Add to basket method:
     * adds items to basket
     *
     * @method addToBasket
     *
     * @param {String} item must be an String
     *
     *  String representation of item to add to basket
     *
     */
    addToBasket : function (item) {
      // if array does not contain item
      if (this.basketContainsItem(item) === false) {
        // add item
        this.items.push(item);
        // save to basket
        this.saveBasket();
      }
    },
    /*
     * Remove from basket method:
     * removes items from basket
     *
     * @method addToBasket
     *
     * @param {String} item must be an String
     *
     *  String representation of item to remove from basket
     *
     */
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
    /*
     * Save basket method:
     * Saves items to basket
     *
     * @method saveBasket
     *
     */
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
    /*
     * Basket contains items:
     * checks if basket contains a matching item
     *
     * @method basketContainsItem
     *
     * @param {String} item must be an String
     *
     *  String representation of item to search in basket
     *
     */
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
