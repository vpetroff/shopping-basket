var expect = require('chai').expect;

var ShoppingBasketLine = require('../app/models/shoppingBasketLine');
var calculator = require('../app/services/total-calculator');

describe('Grand total calculator', function () {
  describe('Calculate shopping cart totals', function(){
    it('Should return 0 on empty cart', function () {
      var total = calculator.calculate([], 0);

      expect(total).to.equal(0);
    });

    it('Should aggregate all basket lines total to calculate grand total', function () {
      var cartLines = [
        new ShoppingBasketLine(1, 'test', 1, 1),
        new ShoppingBasketLine(1, 'test', 1, 2),
      ];
      var total = calculator.calculate(cartLines, 0);

      expect(total).to.equal(3);
    });

    it('Should subtract discount to calculate grand total', function () {
      var cartLines = [
        new ShoppingBasketLine(1, 'test', 1, 1),
        new ShoppingBasketLine(1, 'test', 1, 2)
      ];
      var total = calculator.calculate(cartLines, 1.5);

      expect(total).to.equal(1.5);
    });

    it('Should return 0 if discount is greater than total', function () {
      var cartLines = [
        new ShoppingBasketLine(1, 'test', 1, 1),
        new ShoppingBasketLine(1, 'test', 1, 2)
      ];
      var total = calculator.calculate(cartLines, 15);

      expect(total).to.equal(0);
    });
  });
});
