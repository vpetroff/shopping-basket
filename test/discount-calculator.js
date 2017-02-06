var expect = require('chai').expect;

var ShoppingBasketLine = require('../app/models/shoppingBasketLine');
var Offer = require('../app/models/offer');
var calculator = require('../app/services/discount-calculator');

describe('Discount calculator', function () {
  describe('Calculate shopping cart total discount amount', function(){
    it('Should return 0 on empty cart', function () {
      var totalDiscount = calculator.calculate([], []);

      expect(totalDiscount).to.equal(0);
    });
    it('Should return 0 if no offer', function () {
      var cartLines = [
        new ShoppingBasketLine(1, 'test', 1, 1)
      ];
      var totalDiscount = calculator.calculate(cartLines, []);

      expect(totalDiscount).to.equal(0);
    });
    it('Should return offer value for matching basket lines', function () {
      var cartLines = [
        new ShoppingBasketLine(1, 'test', 1, 1)
      ];
      var offers = [
        new Offer('test', function (line) {
          if (line.name === 'test')
            return 15;
          return 0;
        })
      ];

      var totalDiscount = calculator.calculate(cartLines, offers);

      expect(totalDiscount).to.equal(15);
    });
    it('Should aggregate offer values for matching basket lines', function () {
      var cartLines = [
        new ShoppingBasketLine(1, 'test', 1, 1),
        new ShoppingBasketLine(1, 'test', 1, 1),
        new ShoppingBasketLine(1, 'test', 1, 1)
      ];
      var offers = [
        new Offer('test', function (line) {
          if (line.name === 'test')
            return 15;
          return 0;
        })
      ];

      var totalDiscount = calculator.calculate(cartLines, offers);

      expect(totalDiscount).to.equal(45);
    });
    it('Should not take into account offers without matching basket lines', function () {
      var cartLines = [
        new ShoppingBasketLine(1, 'test1', 1, 1),
        new ShoppingBasketLine(1, 'test2', 1, 1),
        new ShoppingBasketLine(1, 'test3', 1, 1)
      ];
      var offers = [
        new Offer('test', function (line) {
          if (line.name === 'test')
            return 15;
          return 0;
        })
      ];

      var totalDiscount = calculator.calculate(cartLines, offers);

      expect(totalDiscount).to.equal(0);
    });
  });
});
