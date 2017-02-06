var Product = require('../models/product');

module.exports.getProducts = function(){
  return [
    new Product('Apple', 0.25),
    new Product('Orange', 0.30),
    new Product('Garlic', 0.15),
    new Product('Papaya', 0.50),
  ];
};
