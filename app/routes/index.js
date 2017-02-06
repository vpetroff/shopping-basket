var express = require('express');
var router = express.Router();
var inventory = require('../db/inventory');
var calculator = require('../services/shopping-cart-calculator');

router.get('/', function(req, res, next) {
  res.render('shop/index', { title: 'Shopping Cart Calculator', products: inventory.getProducts() });
});

router.post('/', function(req, res, next) {
  var cart = calculator.calculate(req.body);

  res.render('shop/index', {
    title: 'Shopping Cart Calculator',
    products: inventory.getProducts(),
    selectedProducts: req.body,
    cart: cart,
  });
});

module.exports = router;
