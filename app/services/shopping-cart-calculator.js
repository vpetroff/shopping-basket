var inventory = require('./../db/inventory');
var offers = require('./../db/offers');
var ShoppingBasketLine = require('../models/shoppingBasketLine');
var ShoppingBasket = require('../models/shoppingBasket');
var discountCalculator = require('./discount-calculator');
var totalCalculator = require('./total-calculator');

module.exports.calculate = function (selectedProducts) {
  var lines = inventory.getProducts()
    .map(function(product, index){
      var quantity = Number(selectedProducts[index]);
      return new ShoppingBasketLine(quantity, product.name, product.price, Number(product.price * quantity));
    })
    .filter(function (lineItem) {
      if (lineItem.quantity > 0)
        return lineItem;
    });

  var discount = discountCalculator.calculate(lines, offers.getOffers());
  var total = totalCalculator.calculate(lines, discount);
  return new ShoppingBasket(lines, total, discount);
};
